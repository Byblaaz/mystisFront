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
                        await this.getNft(windowStarknet.selectedAddress);
                        this.playerBlockchainData.account = windowStarknet.account
                        this.setPlayerInfo(name, windowStarknet.selectedAddress, isFirstTime, lastLogin.toDate(), dateJoined.toDate());

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

    getNft = async (address) => {

        let blockchainNFT = [];
        const contract = new Contract(mystisabi, MystisAddress, this.playerBlockchainData.account);
        try {

            let nbNFTMint = await contract.balanceOf(address);
            //let nbNFTMint = Number(await contract.balanceOf(address, 21));
            console.log(nbNFTMint)
        }
        catch (e) {
            console.log(e.message);
        }

        return blockchainNFT;
    }

}

export default Player;
