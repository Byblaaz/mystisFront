import Phaser from 'phaser';

class LoadingScreen extends Phaser.Scene {


    preload(){
        // Chargement des images avant le lancement de l'application
        this.load.image('backgroundHome', 'assets/background.jpeg');
        this.load.image('buttonMint', 'assets/brown.png');
        this.load.image('homeButton', 'assets/home.png');
        this.load.image('imageNFT', 'assets/imageNFT.png');


        // Audio
        this.load.audio('hoverEffect', ['./audio/hover_button.mp3']);


    }

    create(){
        // Changement de scene une fois le chargement terminé
        this.scene.start("SceneHome");
    }
}

export default LoadingScreen;
