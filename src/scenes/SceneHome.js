import BaseScene from '../plugins/BaseScene';

export default class SceneHome extends BaseScene

{
    constructor(){
        super('SceneHome')
    }


    preload(){

    }

    create(){
        // Background changement taille en fonction de l'écran
        this.background = this.addImageToScene(window.innerWidth / 2, window.innerHeight / 2, 'backgroundHome', 0);
        this.buttonMint = this.addSpriteToScene(window.innerWidth / 1.2, window.innerHeight / 1.2, 'buttonMint', 0.1);


        // liste de buttons afin d'appliquer des effets collectifs
        const buttons = [
            this.buttonMint,
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
            console.log("coucou")
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

