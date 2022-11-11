import Phaser from 'phaser';
import { ethers } from "ethers";
import { connect } from "@argent/get-starknet"
import {Contract} from 'starknet';

// Firebase imports
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../config/firebase-config"

// Smart-Contract variables
import mystisabi from "../abi/mystisabi.json"
const MystisAddress = "0x018743ab8fd75ed0fcfe5581aca191bc166f0997cb9851710679adf8972faa35"

const starkscan = "https://testnet.starkscan.co/tx/"

class Player extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.db = getFirestore();

        this.users = collection(this.db, 'users');
        console.log(this.users);
        //Global States
        this.playerInfo = {
            name: '',
            address: null,
            lastLogin: new Date(),
            isFirstTime: true,
            dateJoined: null,
            countNFT: 0,
            nftMetadata: []
        }
        this.playerBlockchainData = {
            account: '',
        }

    }

    async loadWeb3() {
            await this.loadBlockchainData();
    }

    async isGoodNetwork() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const { chainId } = await provider.getNetwork();
            if (chainId == 5) {
                alert("GOOD NETWORK")
            } else {
                alert("Invalid network, switch to GOERLI and try again");
            }
        }
    }

    loadBlockchainData = async () => {
        // Load account
        try {
            const windowStarknet = await connect()
            await windowStarknet?.enable({ starknetVersion: "v4" })
            if (windowStarknet.selectedAddress) {
                if (windowStarknet.chainId === "SN_GOERLI") {
                    //Getting data from /users/${account[0]}
                    const userRef = doc(this.db, "users", windowStarknet.selectedAddress);
                    console.log(userRef)
                    const user = await getDoc(userRef);
                    console.log(user)


                    if (user.exists()) {
                        const { isFirstTime, name,lastLogin, dateJoined, } = user.data();
                        console.log("address starknet "+windowStarknet.selectedAddress)
                        this.playerBlockchainData.account = windowStarknet.account
                        this.setPlayerInfo(name, windowStarknet.selectedAddress, isFirstTime, lastLogin.toDate(), dateJoined.toDate());

                        await this.getNumberNfts(windowStarknet.selectedAddress);
                        //await this.getMetaDataNft()


                    }else{
                        this.playerInfo.address = windowStarknet.selectedAddress
                        this.playerBlockchainData.account = windowStarknet.account
                        this.playerInfo.isFirstTime = true

                    }
                } else {
                    alert("Invalid network, switch to Goerli and try again");

                }
            }
        } catch (e) {
            console.log(e);
            window.alert('Unable to connect to your Argent X wallet. Please try again later');
        }
    }
    setPlayerInfo(name, address,isFirstTime, account,lastLogin){
        this.playerInfo = {
            name,
            address,
            lastLogin,
            isFirstTime,
        }
        console.log('Player Info Set :',this.playerInfo);
    }

    mintNFT = async (scene) => {

        let blockchainNFT = false;
        const contract = new Contract(mystisabi, MystisAddress, this.playerBlockchainData.account);
        try {

            let nbNFTMint = await contract.mint();
            //let nbNFTMint = Number(await contract.balanceOf(address, 21));
            var modal = scene.ModalTxSuccess("current transaction \n tx : " + nbNFTMint.transaction_hash.match(/.{1,10}/g)[0]+ "...")
            blockchainNFT = true
            modal.on('pointerdown', async () => {
                openExternalLink(nbNFTMint.transaction_hash)
            })
        }
        catch (e) {
            scene.ModalTxError("canceled transaction")
        }
        return blockchainNFT;
    }

    getNumberNfts  = async(address) =>{
        let blockchainNfts = [];
        const contract = new Contract(mystisabi, MystisAddress, this.playerBlockchainData.account);

        try{
            let nbNFTMint = await contract.balanceOf(address);
            console.log("Nombre de nft dans le wallet")
            this.playerInfo.countNFT = nbNFTMint[0].low.words[0];




            /*for(const id of ids){

                let quantity = Number(await this.gameData.methods.balanceOf(address, id).call());
                if(quantity){
                    let tokenURI = await this.gameData.methods.uri(id).call();
                    const response = await fetch(tokenURI);
                    let data = await response.json();
                    data = {...data, quantity, id, fromBlockchain: true };

                    blockchainCards.push(data);
                }
            }*/
        }
        catch(e){
            console.log(e.message);
        }

        return blockchainNfts;
    }

    getMetaDataNft = async () => {
        //TODO pour les test en local
        const ids = [21, 22, 23, 24, 25];
        let metadataJson = []

        for (const id of ids) {
            fetch("assets/NftExy/"+id+".json")
                .then(response => response.json())
                .then(json => metadataJson.push(json));

        }
        this.playerInfo.nftMetadata = metadataJson
        console.log(this.playerInfo)
    }
}

function openExternalLink (hash)
{
    var url = starkscan + encodeURIComponent(hash);
    var s = window.open(url, '_blank');

    if (s && s.focus)
    {
        s.focus();
    }
}


export default Player;
