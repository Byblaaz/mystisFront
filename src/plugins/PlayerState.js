import Phaser from 'phaser';
import { ethers } from "ethers";
import { connect } from "@argent/get-starknet"
import {Contract} from 'starknet';

import mystisabi from "../abi/mystisabi.json"
const MystisAddress = "0x018743ab8fd75ed0fcfe5581aca191bc166f0997cb9851710679adf8972faa35"

class Player extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);


        //Global States
        this.playerInfo = {
            name: '',
            address: null,
            account: ''
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

                    console.log( windowStarknet.account)
                    this.playerInfo.account = windowStarknet.account
                    this.playerInfo.address = windowStarknet.selectedAddress
                    console.log("address starknet "+windowStarknet.selectedAddress)
                    await this.getNft(windowStarknet.selectedAddress);

                } else {
                    alert("Invalid network, switch to Goerli and try again");

                }
            }
        } catch (e) {
            console.log(e.message);
            window.alert('Unable to connect to your Argent X wallet. Please try again later');
        }
    }

    getNft = async (address) => {

        let blockchainNFT = [];
        const contract = new Contract(mystisabi, MystisAddress, this.playerInfo.account);
        console.log(contract)
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
