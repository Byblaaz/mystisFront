import 'regenerator-runtime/runtime'
import Phaser from 'phaser';


const COLOR_LIGHT = 0x7b5e57;
const COLOR_PRIMARY = 0x4e342e;
const COLOR_DARK = 0x260e04;
const COLOR_RED = 0xC70039;
const COLOR_GREEN = 0x20B638;
const COLOR_BLUE = 0x1C82FF;
const COLOR_YELLOW = 0xFFC300;

const baseUrlApi = "https://mytis-api.vercel.app/api/"
//const baseUrlApi = "http://localhost:3000/api/"
const pathJson = "json/"
const pathImages = "images/"

class BaseScene extends Phaser.Scene {

    addImageToScene( x, y, nameImage, scaleBase) {
        let image
        if (scaleBase !== 0) {
            image = this.add.image(x, y, nameImage).setScale(scaleBase)
            let scaleX = this.cameras.main.width / image.width
            let scaleY = this.cameras.main.height / image.height
            let scale = Math.max(scaleX, scaleY)
            image.setScale(scale / (scaleBase*100) ).setScrollFactor(0)
        }
        else {
            image = this.add.image(x, y, nameImage)
        }

        return image

    }

    addSpriteToScene( x, y, nameImage, scaleBase) {
        let image
        if (scaleBase !== 0) {
            image = this.add.sprite(x, y, nameImage).setScale(scaleBase).setInteractive();
            let scaleX = this.cameras.main.width / image.width
            let scaleY = this.cameras.main.height / image.height
            let scale = Math.max(scaleX, scaleY)
            image.setScale(scale / (scaleBase*100) ).setScrollFactor(0)
        }
        else {
            image = this.add.image(x, y, nameImage).setInteractive();
        }

        return image

    }

    ModalTxSuccess(message) {

        const COLOR_GREEN = 0x32a852;
         return this.rexUI.add.toast({
            x: this.cameras.main.width - 120,
            y: 50,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_GREEN),
            text: this.add.text(0, 0, '', {
                fontSize: '15px'
            }),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },

            duration: {
                in: 250,
                hold: 8000,
                out: 250,
            },
        })
            .showMessage(message)
            .setInteractive()


    }

    ModalTxError(message) {

        const COLOR_RED = 0xE50000;
        this.rexUI.add.toast({
            x: this.cameras.main.width - 120,
            y: 50,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_RED),
            text: this.add.text(0, 0, '', {
                fontSize: '15px'
            }),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },

            duration: {
                in: 250,
                hold: 3000,
                out: 250,
            },
        })
            .showMessage(message)
    }

    // Load all json files and images
    async LoadNftToScene (scene) {
        let metadatas = []
        if (this.player.playerInfo.nftMetadata === undefined) {
            metadatas = await this.player.getAllMetaData()
        }
        else {
            metadatas = this.player.playerInfo.nftMetadata
        }

        await metadatas.forEach((item, index) => {
            //Check if image is already load
            if (!scene.textures.exists(item.edition)) {
                scene.load.image(item.edition, baseUrlApi + pathImages + item.edition);
            }
        })

        await scene.load.start()
    }

    // Load only images
    async LoadImageNftToScene (scene) {

        await this.player.playerInfo.idsNft.forEach((item, index) => {
            //Check if image is already load
            if (!scene.textures.exists(item)) {
                scene.load.image(item, baseUrlApi + pathImages + item);
            }
        })

        await scene.load.start()
    }

    displayStat = (value, min, max, x , y, color, width) => {
        let numberBar = this.rexUI.add.numberBar({
            x: x,
            y: y,
            width: width, // Fixed width

            slider: {
                // width: 120, // Fixed width
                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
                indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, color),
                input: -1,
            },

            text: this.add.text(0, 0, '').setFixedSize(35, 0),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                icon: 10,
                slider: 10,
            },

            valuechangeCallback: function (value, oldValue, numberBar) {
                numberBar.text = Math.round(Phaser.Math.Linear(0, max, value));
            },
        })
            .setDepth(10)
            .layout();

        numberBar.setValue(value, min, max);

        return numberBar;
    }

    getMetaData = async (id) => {
        let metadataJson = []

        await fetch(baseUrlApi+pathJson+id)
            .then(response => response.json())
            .then(json => metadataJson = json);

        return metadataJson
    }

}

export default BaseScene;
