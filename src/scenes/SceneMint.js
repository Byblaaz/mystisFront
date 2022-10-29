import BaseScene from '../plugins/BaseScene';

const COLOR_LIGHT = 0x7b5e57;
let nbMint = 1;
let scene;
export default class SceneMint extends BaseScene
{

    constructor(){
        super('SceneMint')
    }


    preload(){

    }

    create(){
        scene = this
        // Background changement taille en fonction de l'écran
        this.background = this.addImageToScene(window.innerWidth / 2, window.innerHeight / 2, 'backgroundHome', 0);
        this.buttonHome = this.addSpriteToScene(window.innerWidth / 50 , window.innerHeight / 20, 'homeButton', 0.3);
        this.imageNFT = this.addImageToScene(window.innerWidth / 4, window.innerHeight / 2, 'imageNFT', 0.08);


        // liste de buttons afin d'appliquer des effets collectifs
        const buttons = [
            this.buttonHome
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

        this.buttonHome.on('pointerdown', async () => {
            this.scene.start("SceneHome");
        });

        var selectNbMint = this.rexUI.add.buttons({
            x: window.innerWidth / 4, y: window.innerHeight / 1.2,
            width: 290,
            orientation: 'x',

            buttons: [
                createButton(this, '-', 70),
                createButton(this, nbMint, 150),
                createButton(this, '+', 70),
            ],
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 3
            },
        })
            .layout()

        selectNbMint.on('button.click', function (button, index) {
                if (index === 0 && nbMint > 1)
                    nbMint --
                if (index === 2 && nbMint < 10)
                    nbMint ++

                // récupère le bouton du milieu pour changer le texte
                var buttonNombre = selectNbMint.getButton(1);
                buttonNombre.text = nbMint

                if (index === 1 ) {
                    scene.ModalTxSuccess("transaction en cours \n tx : 0xokefoekf")

                }
            })

    }

    update() { }
}

var createButton = function (scene, text, width) {
    return scene.rexUI.add.label({
        width: width,
        height: 20,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 20,
            right: 20,
        },
        align: 'center'
    });

}


