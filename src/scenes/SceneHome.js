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
        this.background = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundHome', 0);
        this.buttonMint = this.addSpriteToScene(this.cameras.main.width / 1.2, this.cameras.main.height / 1.2, 'buttonMint', 0.1);


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
            console.log(this.player)
            this.scene.start("SceneMint");
        });

        const overlayPlayer = this.add.rectangle(215, 60, 300, 70, 0x999999, 0.9)
        const circleAvatar = this.add.circle(60, 60, 50, 0x999999, 0.9)
        this.add.rexCircleMaskImage(60, 60, 'avatar').setScale(0.1);
        this.overlayPlayerName = this.add.text(120, 60,
            this.player.playerInfo.name,
            {fontFamily: 'Arial', align: 'justify', fontSize: '20px'})





        // Stop scene testing
        // this.time.delayedCall(1200, function(){
        //     this.scene.stop();
        // }, [], this)


    }




    update(){

    }
}

