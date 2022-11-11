import BaseScene from '../plugins/BaseScene';

import { Tabs, ScrollablePanel, FixWidthSizer, OverlapSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

const COLOR_LIGHT = 0x7b5e57;
let nbMint = 1;
let scene;
export default class SceneInventory extends BaseScene
{

    constructor(){
        super('SceneInventory')
    }
    mintNFT = async () => {
        // Load Data from blockchain
        return await this.player.mintNFT(this)
    }
    preload(){
    }

    create(){
        scene = this
        this.player.getMetaDataNft()
        // Background changement taille en fonction de l'écran
        this.background = this.addImageToScene(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundHome', 0);
        this.buttonHome = this.addSpriteToScene(this.cameras.main.width / 50 , this.cameras.main.height / 20, 'homeButton', 0.3);

        this.canva = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 900, 600,0x999999)
        this.tabLeft = this.add.rectangle(this.cameras.main.width / 3.3, this.cameras.main.height / 2, 300, 570,0x799999)

        // add nft list
        /*for (let i = 0; i < 5; i++) {
            this.add.rectangle(this.cameras.main.width / 3.3, this.cameras.main.height / 2, 270, 50,0x499999)
        }*/
        this.sizerLeft = new FixWidthSizer(this, {
            space: {
                left: 10,
                right: 10,
                bottom: 10,
                item: 10,
                line: 10
            }
        }).layout();
        this.add.existing(this.sizerLeft);

        this.panelBox = new ScrollablePanel(this, {
            x: this.cameras.main.width / 4,
            y: this.cameras.main.height / 4,
            width: 800,
            height: 600,
            scrollMode:0,
            background: this.add.rectangle(0,0, this.cameras.main.width * 0.4, this.cameras.main.height *0.745, 0x000000, 0.9),
            panel: {
                child: this.sizerLeft
            },
            space:{
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

        const paddingX = 20
        //Inventory Tabs
        let tabs = new Tabs(this, {
            x: 300,
            y: 50,
            width: 800,
            height: 600,
            panel: this.panelBox,
            topButtons: [
                this.add.rectangle(0, 0, paddingX*4, paddingX*2.1, 0x000000, 0.9 ).setOrigin(0.5,1).setScale(0.8),
                this.add.rectangle(0, 0, paddingX*4, paddingX*2.1, 0x23140a, 0.9 ).setOrigin(0.5,1).setScale(0.8),
                this.add.rectangle(0, 0, paddingX*4, paddingX*2.1, 0x23140a, 0.9 ).setOrigin(0.5,1).setScale(0.8),
            ]
        }).setOrigin(0).layout();

        tabs.getElement('topButtons').forEach((tab, index) => {
            tab.setStrokeStyle(2, 0x000000, 1);
            if(index == 0){
                this.cardIcon = this.add.sprite(tab.x, tab.y - tab.displayHeight/2 ,'cards_icon').setOrigin(0.5);
            }
            else if(index == 1){
                this.backpackIcon = this.add.sprite(tab.x, tab.y - tab.displayHeight/2,'backpack_icon').setOrigin(0.5);
            }
            else{
                this.magicIcon = this.add.sprite(tab.x, tab.y - tab.displayHeight/2 ,'magic_icon').setOrigin(0.5);
            }

        });

        tabs.on('button.click', (button, groupName, index) => {
            let tabButtons = tabs.getElement('topButtons');

            tabButtons.forEach((button,indexButton) => {
                if(indexButton == index){
                    button.fillColor = 0x000000 ;
                }
                else{
                    button.fillColor = 0x23140a;
                }
            })

            this.sizerLeft.clear(true);

            if(index == 0){
                console.log(index)
                this.player.playerInfo.nftMetadata.forEach((item, index) => {
                    console.log(item)
                    console.log(index)
                    this.sizerLeft.add(
                        this.add.sprite(0, 0, item.image).setScale(0.35).setOrigin(0).setDepth(10).setInteractive().setData(item)
                            .on('pointerdown', () => {
                                //this.setImageData(item);
                            })
                    );
                })
            }
            else if(index == 1){
                if(this.player.playerInfo.inventory.item.length >= 1){
                    let itemsInInventory = this.player.getAllItems();

                    itemsInInventory.forEach(item => {
                        this.generateItemUI(item);
                    })
                }
                else{
                    this.sizerLeft.add(this.add.text(0,0, 'No items acquired', {fontFamily: 'Arial'}));
                }
            }
            else{
                if(this.player.playerInfo.inventory.skill.length >= 1){
                    let skillsInInventory = this.player.getAllSkills();

                    skillsInInventory.forEach(skill => {
                        this.generateItemUI(skill);
                    })
                }
                else{
                    this.sizerLeft.add(this.add.text(0,0, 'No available skills to learn', {fontFamily: 'Arial'}));
                }
            }

            this.panelBox.layout();
        });

        this.add.existing(tabs);



        //TODO mettre en place la récupération des json avec app node
        const buttons = [
            this.buttonHome,
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




    }



    update() {



    }
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


