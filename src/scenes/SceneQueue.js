import Phaser from 'phaser';
import BaseScene from '../plugins/BaseScene';

import { Tabs, ScrollablePanel, FixWidthSizer, OverlapSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_PRIMARY = 0x4e342e;
const COLOR_DARK = 0x260e04;
const COLOR_RED = 0xC70039;
const COLOR_GREEN = 0x20B638;
const COLOR_BLUE = 0x1C82FF;
const COLOR_YELLOW = 0xFFC300;
let scene;
let selectedFigthter
let animationCircle = false

const baseApiImage = "https://mytis-api.vercel.app/api/images/";

export default class SceneQueue extends BaseScene
{
    constructor(){
        super('SceneQueue')
    }


   async preload() {
        scene = this
        await this.LoadImageNftToScene(this)

        this.load.on('complete', function () {
            console.log('complete');
            scene.mainFunction()
        });
    }

    async mainFunction () {
        this.background = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0xEAEAEA)

        this.buttonHome = this.add.sprite(this.cameras.main.width / 50, this.cameras.main.height / 20, 'homeButton').setScale(0.1).setInteractive();


        this.infoNFT = this.add.rectangle(this.cameras.main.width / 4.5, this.cameras.main.height / 4 , 500, 300, 0x190000)
        this.textDetailName = this.add.text(100, 105, "name", { fontSize: 20 })
        this.detailsImage = this.add.image(170, 210, '')

        this.textAttack = this.add.text(270, 115, "Attack", { fontSize: 13 })
        this.attack = this.displayStat(75, 0, 100, 400, 140, COLOR_RED, 300)

        this.textDefense = this.add.text(270, 160, "Defense", { fontSize: 13 })
        this.defense = this.displayStat(15, 0, 100, 400, 185, COLOR_BLUE, 300)

        this.textSpeed = this.add.text(270, 205, "Speed", { fontSize: 13 })
        this.speed = this.displayStat(21, 0, 100, 400, 230, COLOR_YELLOW, 300)

        this.textCriticalHit = this.add.text(270, 250, "Critical hit", { fontSize: 13 })
        this.criticalHit = this.displayStat(21, 0, 100, 400, 275, COLOR_GREEN, 300)


        this.infoMatchmaking = this.add.rectangle(this.cameras.main.width / 1.43, this.cameras.main.height / 6.45 , 770, 150, 0xC6D8B1)
        this.textinfoMatch = this.add.text(620, 60, "MATCHMAKING", { fontSize: 20 })

        this.buttonQueue = this.add.sprite(1000, 750, "buttonStart" ).setScale(0.15).setInteractive()
        this.buttonCancelQueue = this.add.sprite(1000, 750, "buttonConnect" ).setScale(0.15).setInteractive()
        this.buttonCancelQueue.visible = false


        this.sizerLeft1 = new FixWidthSizer(this, {
            space: {
                left: 5,
                right: 5,
                bottom: 10,
                item: 10,
                line: 10
            }
        }).layout();

        await this.player.playerInfo.idsNft.forEach((item, index) => {
            this.sizerLeft1.add(
                this.rexUI.add.label({
                    background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
                    text: this.add.text(0, 0,"Edition "+item, { fontSize: 17 }),
                    icon: this.add.image(0, 0, item).setScale(0.08),
                    iconSize: 60,
                    space: {
                        left: 10, right: 50, top: 10, bottom: 10, icon: 10
                    }
                }).setInteractive()
                    .setDepth(10)
                    .on('pointerdown', function () {
                        scene.setImageData(item);
                        scene.displayStatistics(item)

                    })

            );


            if (index == 0) {
                this.setImageData(item)
                this.displayStatistics(item)
                selectedFigthter = item
            }
        })
        this.add.existing(this.sizerLeft1);

        this.panelBox1 = new ScrollablePanel(this, {
            x: 66,
            y: 355,
            width: 500,
            height: 400,
            scrollMode: 0,
            background: this.add.rectangle(0, 0, 500, 400, 0x999000, 0.9),
            panel: {
                child: this.sizerLeft1
            },
            space: {
                left: 5,
                right: 5,
                top: 2,
                bottom: 2,
            },
            slider: {
                track: this.add.rexRoundRectangle(0, 0, 10, this.cameras.main.height * 0.745, 4.5, 0x000000, 0.9).setStrokeStyle(0.5, 0xffffff, 0.8),
                thumb: this.add.rexRoundRectangle(0, 0, 10, 10, 4.5, 0xffffff, 0.8).setAlpha(0.5),
                input: 'drag',
                position: 'right',
            },
        }).setOrigin(0).layout();
        this.add.existing(this.panelBox1);


        const buttons = [
            this.buttonHome,
            this.buttonQueue
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
        })

        this.buttonQueue.on('pointerdown', async () => {
            this.enterQueue()
        })

        this.buttonCancelQueue.on('pointerdown', async () => {
            this.cancelQueue()
        })



    }

    setImageData = (item) => {
        this.textDetailName.setText("Edition "+item)
        this.detailsImage.setTexture(`${item}`).setScale(0.3)//.setData(item);
        //this.displayName.setText(item.name);
    }

    displayStatistics = async (id) => {
        let statistics = []

        let data = await this.getMetaData(id)

        statistics = (data.attributes.filter(a => isInt(a.value)));

        this.attack.setValue(statistics[0].value, 0, 100)
        this.defense.setValue(statistics[1].value, 0, 100)
        this.speed.setValue(statistics[2].value, 0, 100)
        this.criticalHit.setValue(statistics[3].value, 0, 100)

        function isInt(value) {
            return !isNaN(value) && (function (x) {
                return (x | 0) === x;
            })(parseFloat(value))
        }
    }

    enterQueue() {
        this.buttonQueue.visible = false
        this.buttonCancelQueue.visible = true
        this.loading = this.add.image(1000, 650, "loading").setScale(0.05)
        animationCircle = true
        setTimeout(function () {
            if (animationCircle)
            console.log('Hello world')
        }, 3000)

    }

    cancelQueue() {
        this.buttonQueue.visible = true
        this.buttonCancelQueue.visible = false
        animationCircle = false
        this.loading.destroy()

    }


    create() {
    }


    update() {
        if (animationCircle) {
            this.loading.rotation += 0.04;
        }
    }
}




