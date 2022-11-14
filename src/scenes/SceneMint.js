import BaseScene from '../plugins/BaseScene';

const COLOR_LIGHT = 0x7b5e57;
let nbMint = 1;
let scene;
export default class SceneMint extends BaseScene
{

    constructor(){
        super('SceneMint')
    }

    mintNFT = async () => {
        // Load Data from blockchain
        return await this.player.mintNFT(this)
    }

    preload(){

    }


    create(){

        this.background = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundHome', 0);
        this.buttonHome = this.addSpriteToScene(this.cameras.main.width / 50 , this.cameras.main.height / 20, 'homeButton', 0.3);

        this.buttonMint = this.add.rectangle(this.cameras.main.width / 2, 650, 170, 50,0x999999).setInteractive()
        this.textMint = this.add.text(this.cameras.main.width / 2 - 70, 640, "Mint your Heros", {fontFamily: 'Arial', align: 'justify', fontSize: '20px'})

        // List of buttons to apply collective effects
        const buttons = [
            this.buttonHome,
            this.buttonMint
        ];

        buttons.forEach(button => {
            var scaleBase = button.scale
            button.on('pointerover', () => {
                button.setScale(scaleBase + 0.005);
            });

            button.on('pointerout', () => {
                button.setScale(scaleBase);
            });

            button.on('pointerup', () => {
                button.setAlpha(1);
            });
        });

        this.buttonHome.on('pointerdown', async () => {
            this.scene.start("SceneHome");

        });

        this.buttonMint.on('pointerdown', async () => {
            var txMint = await this.mintNFT()
            if (txMint) {
                this.invocation =  this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'invocation').setScale(0.3)
            }
            else {
                this.invocationFalse =  this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'invocation').setScale(0.3).setAlpha(0.2)

                this.time.delayedCall(5000, this.destroyInvocationFalse, [], this);
            }
        });

    }


     destroyInvocationFalse () {
         this.invocationFalse.destroy();
    }


    update() {

        if (this.invocation != null) {
            this.invocation.rotation += 0.01
        }

    }
}
