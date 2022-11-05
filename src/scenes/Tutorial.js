import Phaser from 'phaser';
import BaseScene from '../plugins/BaseScene';

class TutorialScreen extends BaseScene {
    constructor(){
        super('TutorialScreen')
    }

    create(){
        this.buttonMint = this.addSpriteToScene(this.cameras.main.width / 1.2, this.cameras.main.height / 1.2, 'buttonMint', 0.1);

        this.inputName = '';
        this.inputText = this.add.rexInputText(
            this.cameras.main.width/2,
            this.cameras.main.height/1.4,
            300,
            40,
            { 
                type: "text",
                maxLength: 15,
                fontSize : "25px",
                minLength: 3,
                backgroundColor : "white",
                color: "white"
            }
        ).setOrigin(0,1)
        .on('textchange', inputText => {
            this.inputName = inputText.text;
        })

    }

    update(){
    }
}

export default TutorialScreen;