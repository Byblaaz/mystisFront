import BaseScene from '../plugins/BaseScene';

import { Tabs, ScrollablePanel, FixWidthSizer, OverlapSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

const COLOR_LIGHT = 0x7b5e57;
let scene;

export default class SceneInventory extends BaseScene
{
    constructor(){
        super('SceneInventory')
    }


    async preload() {

        var scene = this
        var test = await this.player.getMetaDataNft()
        await test.forEach((item, index) => {
            //Check if image is already load
            console.log(this.textures.exists(item.edition))
            if (!this.textures.exists(item.edition))
                this.load.image(item.edition, 'assets/NftExy/images/'+ item.edition +'.png');
        })
        await this.load.start()
        //this.load.start()

        this.load.on('complete', function () {
            console.log('complete');
            scene.MainFunction()
        });

    }

    // Use custom function call after all textures is loaded
    async MainFunction () {
        scene = this
        const paddingX = 20

        // Background changement taille en fonction de l'écran
        this.background = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundHome', 0);
        this.buttonHome = this.add.sprite(this.cameras.main.width / 50, this.cameras.main.height / 20, 'homeButton').setScale(0.3).setInteractive();

        //this.canva = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 900, 600, 0x999999)
        this.tabLeft = this.add.rectangle(this.cameras.main.width / 3.3, this.cameras.main.height / 2, 300, 570, 0x799999)

        //Details Box
        const detailsBox = this.add.rectangle(500, 87, this.cameras.main.width/2 + paddingX, this.cameras.main.height*0.745, 0x190000, 0.9).setOrigin(0);

        console.log(detailsBox.x + detailsBox.displayWidth/2)
        console.log(detailsBox.y+ detailsBox.displayHeight - 1)

        this.detailsImage = this.add.sprite(
            detailsBox.x + detailsBox.displayWidth/4,
            400,
            `Alpha_alt`
        ).setOrigin(0.5,1).setInteractive();

        const messageDetailsBox = this.add.rectangle(
            detailsBox.x  + paddingX/2,
            detailsBox.y + detailsBox.displayHeight - paddingX/2 - 110 ,
            detailsBox.displayWidth - paddingX,
            110, 0x550000,1).setStrokeStyle(0.5, 0xffffff,1).setOrigin(0);

        this.detailsText = this.add.text(messageDetailsBox.x + 10, messageDetailsBox.y + 10,
            'Alpha is a beast Exoia ready to give a helping hand to any adventurer who summons him. He uses his arm-like tail to deal massive damage to his enemies. It is rummored that his eyes can locate hidden treasures and dungeons.',
            {fontFamily: 'Arial', align: 'justify'})
            .setOrigin(0)
            .setWordWrapWidth(messageDetailsBox.displayWidth-20, true);

        this.displayName = this.add.text(
            detailsBox.x + paddingX, detailsBox.y + paddingX,
            'Alpha',
            { fontFamily:'Arial', fontSize: 20, fontStyle: 'Bold Italic'}
        ).setOrigin(0);

        this.attribute = this.add.sprite(
            detailsBox.x + detailsBox.displayWidth - paddingX,
            this.displayName.y,
            'fire'
        ).setOrigin(1,0).setScale(0.35);


        this.sizerLeft = new FixWidthSizer(this, {
            space: {
                left: 5,
                right: 5,
                bottom: 10,
                item: 10,
                line: 10
            }
        }).layout();

        const COLOR_PRIMARY = 0x4e342e;
        await this.player.playerInfo.nftMetadata.forEach((item, index) => {
            this.sizerLeft.add(
                this.rexUI.add.label({
                    background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
                    text: this.add.text(0, 0, item.name, { fontSize: 17 }),
                    icon: this.add.image(0, 0, item.edition).setScale(0.05),
                    iconSize: 40,
                    space: {
                        left: 20, right: 20, top: 20, bottom: 20, icon: 10
                    }
                }).setInteractive()
                    .setDepth(10)
                .on('pointerdown', function () {
                    scene.setImageData(item);
                })

            );
            /*console.log(rectangle.displayHeight)
            console.log(rectangle.y)
            this.add.sprite(0, 0, item.edition).setScale(0.1).setOrigin(0).setDepth(10).setInteractive().setData(item)
                .on('pointerdown', () => {
                    this.setImageData(item);
                })*/
            if (index == 0) {
                this.setImageData(item)
            }
        })
        this.add.existing(this.sizerLeft);


        this.panelBox = new ScrollablePanel(this, {
            x: this.cameras.main.width / 4,
            y: this.cameras.main.height / 4,
            width: 300,
            height: 600,
            scrollMode: 0,
            background: this.add.rectangle(0, 0, this.cameras.main.width * 0.4, this.cameras.main.height * 0.745, 0x999000, 0.9),
            panel: {
                child: this.sizerLeft
            },
            space: {
                left: 10,
                right: 20,
                top: 10,
                bottom: 10,
            },
            slider: {
                track: this.add.rexRoundRectangle(0, 0, 10, this.cameras.main.height * 0.745, 4.5, 0x000000, 0.9).setStrokeStyle(0.5, 0xffffff, 0.8),
                thumb: this.add.rexRoundRectangle(0, 0, 10, 10, 4.5, 0xffffff, 0.8).setAlpha(0.5),
                input: 'drag',
                position: 'right',
            },
        }).setOrigin(0).layout();
        this.add.existing(this.panelBox);

        //Inventory Tabs
        let tabs = new Tabs(this, {
            x: 150,
            y: 50,
            width: 300,
            height: 600,
            panel: this.panelBox,
            topButtons: [
                this.add.rectangle(0, 0, paddingX * 4, paddingX * 2.1, 0x000000, 0.9).setOrigin(0.5, 1).setScale(0.8),
                this.add.rectangle(0, 0, paddingX * 4, paddingX * 2.1, 0x23140a, 0.9).setOrigin(0.5, 1).setScale(0.8),
                this.add.rectangle(0, 0, paddingX * 4, paddingX * 2.1, 0x23140a, 0.9).setOrigin(0.5, 1).setScale(0.8),
            ]
        }).setOrigin(0).layout();

        tabs.getElement('topButtons').forEach((tab, index) => {
            tab.setStrokeStyle(2, 0x000000, 1);
            if (index == 0) {
                this.cardIcon = this.add.sprite(tab.x, tab.y - tab.displayHeight / 2, 'cards_icon').setOrigin(0.5);
            } else if (index == 1) {
                this.backpackIcon = this.add.sprite(tab.x, tab.y - tab.displayHeight / 2, 'backpack_icon').setOrigin(0.5);
            } else {
                this.magicIcon = this.add.sprite(tab.x, tab.y - tab.displayHeight / 2, 'magic_icon').setOrigin(0.5);
            }

        });

        tabs.on('button.click', (button, groupName, index) => {
            let tabButtons = tabs.getElement('topButtons');

            tabButtons.forEach((button, indexButton) => {
                if (indexButton == index) {
                    button.fillColor = 0x000000;
                } else {
                    button.fillColor = 0x23140a;
                }
            })

            console.log("destroy ❌")
            this.sizerLeft.clear(true);

            if (index == 0) {
                console.log(this.player.playerInfo.nftMetadata)
                this.player.playerInfo.nftMetadata.forEach((item, index) => {
                    console.log(item)
                    console.log(index)
                    this.sizerLeft.add(
                        this.add.sprite(0, 0, item.edition).setScale(0.3).setOrigin(0).setDepth(10).setInteractive().setData(item)
                            .on('pointerdown', () => {
                                this.setImageData(item);
                            })
                    );
                })
            } else if (index == 1) {
                if (this.player.playerInfo.inventory.item.length >= 1) {
                    let itemsInInventory = this.player.getAllItems();

                    itemsInInventory.forEach(item => {
                        this.generateItemUI(item);
                    })
                } else {
                    this.sizerLeft.add(this.add.text(0, 0, 'No items acquired', {fontFamily: 'Arial'}));
                }
            } else {
                if (this.player.playerInfo.inventory.skill.length >= 1) {
                    let skillsInInventory = this.player.getAllSkills();

                    skillsInInventory.forEach(skill => {
                        this.generateItemUI(skill);
                    })
                } else {
                    this.sizerLeft.add(this.add.text(0, 0, 'No available skills to learn', {fontFamily: 'Arial'}));
                }
            }

            this.panelBox.layout();
        });

        this.add.existing(tabs);

        const buttons = [
            this.buttonHome,
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

    }

    setImageData = (item) => {
        this.detailsText.setText(item.dna);
        this.detailsImage.setTexture(`${item.edition}`).setScale(0.25).setData(item);
        this.displayName.setText(item.name);
        //this.rarity.setTexture(`rarity_${item.properties.rarity}`);
        //this.attribute.setTexture(item.properties.attribute);
    }

     async create() {
    }


    update() {
    }
}




