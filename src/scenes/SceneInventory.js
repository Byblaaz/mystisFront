import BaseScene from '../plugins/BaseScene';

const COLOR_LIGHT = 0x7b5e57;
export default class SceneInventory extends BaseScene
{

    constructor(){
        super('SceneInventory')
    }

    preload(){
        this.load.image('backgroundHome', 'assets/background.jpeg');
        this.load.image('buttonMint', 'assets/brown.png');
        this.load.image('homeButton', 'assets/home.png');
        this.load.image('imageNFT', 'assets/imageNFT.png');
    }

    create() {



        /*const summonCircle = this.add.sprite(
            detailsBox.x + detailsBox.displayWidth/2,
            detailsBox.y+ detailsBox.displayHeight/2 - paddingX,
            "buttonMint"
        ).setOrigin(0.5).setScale(0.9).setAlpha(0.7);*/


    }

    update() {

    }

}


