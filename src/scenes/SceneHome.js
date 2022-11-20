import BaseScene from '../plugins/BaseScene';

export default class SceneHome extends BaseScene

{
    constructor(){
        super('SceneHome')
    }


    preload(){
        console.log("START SCENE")
    }


    create(){
       // Display images to scene
        this.background = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundHome', 0);
        this.buttonMint = this.add.sprite(this.cameras.main.width / 5, this.cameras.main.height / 1.6, 'home-btnSummon').setInteractive();
        this.buttonQueue = this.add.sprite(this.cameras.main.width / 1.45, this.cameras.main.height / 1.65, 'home-btnArena').setInteractive();
        this.shader = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'nuageShader', 0);
        this.overlay = this.add.image(130, 60, 'overlay').setScale(0.5)
        this.overlayCircle = this.add.image(55, 60, 'circleAvatar').setScale(0.5)


        this.team = this.add.sprite(1322, 730, 'teamButton').setScale(0.3).setInteractive();
        this.teamBadge = this.add.circle(1350, 690, 13, "0xFF5733").setInteractive();
        this.teamText = this.add.text(1346, 682, this.player.playerInfo.countNFT,{fontFamily: 'Arial', align: 'justify', fontSize: '16px'})
            .setTint(0xFFFFFF)


        // List of buttons to apply collective effects
        const buttons = [
            this.buttonMint,
            this.buttonQueue,
            this.team
        ];

        buttons.forEach(button => {
            let scaleBase = button.scale
            let scaleBaseTeam = this.teamBadge.scale
            button.on('pointerover', () => {
                button.setScale(scaleBase + 0.005);
                if(this.team == button) {
                    this.teamBadge.setScale(scaleBaseTeam + 0.05);
                }
            });

            button.on('pointerout', () => {
                button.setScale(scaleBase);
                if(this.team == button) {
                    this.teamBadge.setScale(scaleBaseTeam);
                }
            });

            button.on('pointerup', () => {
                button.setAlpha(1);
            });
        });


        this.buttonMint.on('pointerdown', async () => {
            this.scene.start("SceneMint");
        });

        this.team.on('pointerdown', async () => {
            this.scene.start("SceneInventory");
        });

        this.buttonQueue.on('pointerdown', async () => {
            this.scene.start("SceneQueue");
        });

        //const overlayPlayer = this.add.rectangle(215, 60, 300, 70, 0x999999, 0.9)
        //const circleAvatar = this.add.circle(60, 60, 50, 0x999999, 0.9)
        this.add.rexCircleMaskImage(55, 60, 'avatar').setScale(0.08);
        this.overlayPlayerName = this.add.text(100, 40,
            this.player.playerInfo.name.toUpperCase(),
            {fontFamily: 'Arial', align: 'justify', fontSize: '20px', fontStyle: 'bold'})

    }


    update(){

    }
}

