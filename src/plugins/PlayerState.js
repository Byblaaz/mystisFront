import Phaser from 'phaser';
import { ethers } from "ethers";
import { connect } from "@argent/get-starknet"

import mystisabi from "../abi/mystisabi.json"
const MystisAddress = "0x97A570127a51a5b9d24D76404c8B140238891bdF"

class Player extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);


        //Global States
        this.playerInfo = {
            name: '',
            address: null,
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

            console.log(windowStarknet.chai)
            if (windowStarknet.selectedAddress) {
                if (windowStarknet.chainId === "SN_GOERLI") {

                    this.playerInfo.address = windowStarknet.selectedAddress
                    console.log("address starknet "+windowStarknet.selectedAddress)
                    await this.getNft();

                } else {
                    alert("Invalid network, switch to Goerli and try again");

                }
            }
        } catch (e) {
            console.log(e.message);
            window.alert('Unable to connect to your Argent X wallet. Please try again later');
        }
    }

    getNft = async () => {

        let blockchainNFT = [];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(MystisAddress, mystisabi, provider);

        try {

            let nbNFTMint = Number(await contract.balanceOf(String(this.playerInfo.address), 21));
            console.log(nbNFTMint)
        }
        catch (e) {
            console.log(e.message);
        }

        return blockchainNFT;
    }

}

export default Player;
