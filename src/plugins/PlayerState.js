import Phaser from 'phaser';
import { ethers } from "ethers";
import { connect } from "@argent/get-starknet"
import {Contract} from 'starknet';

// Firebase imports
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../config/firebase-config"

// Smart-Contract variables
import mystisabi from "../abi/mystisabi.json"
const mystisAddress = "0x018743ab8fd75ed0fcfe5581aca191bc166f0997cb9851710679adf8972faa35"

// baseLink starkscan
const starkscan = "https://testnet.starkscan.co/tx/"
const baseUrlApi = "https://mytis-api.vercel.app/api/"
//const baseUrlApi = "http://localhost:3000/api/"
const pathJson = "json/"


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
            nftMetadata: [],
            idsNft: []
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
                        const ids = [1,2, 3, 4, 5, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
                        this.setPlayerInfo(name, windowStarknet.selectedAddress, isFirstTime, lastLogin.toDate(), dateJoined.toDate(), ids);

                        // Call sc get info
                        await this.getCounterNft(windowStarknet.selectedAddress);

                    } else {
                        this.playerInfo.address = windowStarknet.selectedAddress
                        this.playerBlockchainData.account = windowStarknet.account
                        this.playerInfo.isFirstTime = true

                    }
                } else {
                    alert("Invalid network, switch to Goerli and try again");

                }
            }
        } catch (e) {
            console.log(e.message);
            window.alert('Unable to connect to your Argent X wallet. Please try again later');
        }
    }
    setPlayerInfo(name, address,isFirstTime, account,lastLogin, idsNft){
        this.playerInfo = {
            name,
            address,
            lastLogin,
            isFirstTime,
            idsNft
        }
        console.log('Player Info Set :',this.playerInfo);
    }

    mintNFT = async (scene) => {

        let blockchainNFT = false;
        const contract = new Contract(mystisabi, mystisAddress, this.playerBlockchainData.account);
        try {

            let tx = await contract.mint();
            const modal = scene.ModalTxSuccess("current transaction \n tx : " + tx.transaction_hash.match(/.{1,10}/g)[0]+ "...")
            blockchainNFT = true
            modal.on('pointerdown', async () => {
                openExternalLink(tx.transaction_hash)
            })
        }
        catch (e) {
            scene.ModalTxError("canceled transaction")
        }
        return blockchainNFT;
    }

    getCounterNft  = async(address) =>{
        let blockchainNfts = [];
        const contract = new Contract(mystisabi, mystisAddress, this.playerBlockchainData.account);

        try {
            let nbNFTMint = await contract.balanceOf(address);
            console.log("Nombre de nft dans le wallet")
            this.playerInfo.countNFT = nbNFTMint[0].low.words[0];

        }
        catch(e){
            console.log(e.message);
        }

        return blockchainNfts;
    }

    getAllMetaData = async () => {
        let metadataJson = []
        for await(const id of this.playerInfo.idsNft) {
            await fetch(baseUrlApi+pathJson+id)
                .then(response => response.json())
                .then(json => metadataJson.push(json));
        }

        this.playerInfo.nftMetadata = metadataJson
        return metadataJson
    }

}

function openExternalLink (hash)
{
    const url = starkscan + encodeURIComponent(hash);
    const link = window.open(url, '_blank');

    if (link && link.focus)
    {
        link.focus();
    }
}

export default Player;
