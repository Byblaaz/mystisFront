import 'regenerator-runtime/runtime'
import Phaser from 'phaser';


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


}

export default BaseScene;
