import BaseScene from '../plugins/BaseScene';
import { doc, setDoc,updateDoc } from "firebase/firestore";

export default class SceneLogin extends BaseScene
{

    constructor(){
        super('SceneLogin')


    }
    loadData = async () => {
        // Load Data from blockchain
        await this.player.loadWeb3()
    }


    preload(){
    }

    create(){
        // Background changement taille en fonction de l'écran
        this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundLogin').setScale(1)

        this.buttonConnect = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 1.4, 'buttonConnect').setScale(0.15).setInteractive();
        this.buttonStart = this.add.sprite(this.cameras.main.width / 2, window.innerHeight / 1.4, 'buttonStart').setScale(0.15).setInteractive();
        this.buttonStart.visible = false

        this.buttonConnect.on('pointerover', () => {
            this.buttonConnect.setScale(0.17);
        });

        this.buttonConnect.on('pointerout', () => {
            this.buttonConnect.setScale(0.15);
        });

        this.buttonConnect.on('pointerup', () => {
            this.buttonConnect.setAlpha(1);
        });


        //Start Button
        this.buttonConnect.on('pointerdown', async () => {
            if (this.player.playerInfo.address == null)
                await this.loadData();

            if (this.player.playerInfo.address != null) {
                this.buttonStart.visible = true
                this.buttonConnect.visible = false
                //this.scene.start("SceneHome");
            }

        });

        this.buttonStart.on('pointerover', () => {
            this.buttonStart.setScale(0.17)
        });

        this.buttonStart.on('pointerout', () => {
            this.buttonStart.setScale(0.15)
        });

        this.buttonStart.on('pointerup', () => {
            this.buttonStart.setAlpha(1)
        });

        this.buttonStart.on('pointerdown', async () => {
            //this.soundLogin.destroy();
            //game.cache.removeSound('wizball');
            this.sound.stopByKey('titleBgMusic');
            if(this.player.playerInfo.address && this.player.playerInfo.isFirstTime){
                console.log(this.player.playerInfo.address)
                this.player.playerInfo.dateJoined = new Date();
                // this.player.playerInfo.isFirstTime = false;
                // await setDoc(doc(this.player.users, this.player.playerInfo.address), this.player.playerInfo);
                this.scene.start("TutorialScreen"); // si isFristTime , on start tutorial
            }else{
                this.player.playerInfo.lastLogin = new Date();
                // this.player.users fais référence à la collection (this.users = collection(this.db, 'users');) dans notre plugin PlayerState
                await updateDoc(doc(this.player.users, this.player.playerInfo.address),{ lastLogin : this.player.playerInfo.lastLogin });
                this.scene.start("SceneHome");
            }
            
        });

    }


    update(){

    }
}

