import BaseScene from '../plugins/BaseScene';

export default class SceneHome extends BaseScene

{
    constructor(){
        super('SceneHome')
    }


    preload(){

    }

    create(){
       // Affichage des images
        this.background = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundHome', 0);
        this.buttonMint = this.add.sprite(this.cameras.main.width / 5, this.cameras.main.height / 1.6, 'home-btnSummon').setInteractive();
        this.buttonArena = this.add.sprite(this.cameras.main.width / 1.45, this.cameras.main.height / 1.65, 'home-btnArena').setInteractive();
        this.shader = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'nuageShader', 0);




        // liste de buttons afin d'appliquer des effets collectifs
        const buttons = [
            this.buttonMint,
            this.buttonArena
        ];

        buttons.forEach(button => {
            var scaleBase = button.scale
            button.on('pointerover', () => {
                button.setScale(scaleBase + 0.005);
                //this.sound.play('hoverEffect', { loop: false });
            });

            button.on('pointerout', () => {
                button.setScale(scaleBase);
            });

            button.on('pointerup', () => {
                button.setAlpha(1);
            });
        });


        this.buttonMint.on('pointerdown', async () => {
            this.scene.start("SceneMint");
        });





        // Stop scene testing
        // this.time.delayedCall(1200, function(){
        //     this.scene.stop();
        // }, [], this)


    }




    update(){

    }
}

