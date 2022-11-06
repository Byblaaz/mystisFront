import Phaser from 'phaser';
import BaseScene from '../plugins/BaseScene';
import { doc, setDoc } from "firebase/firestore";

class TutorialScreen extends BaseScene {
    constructor() {
        super('TutorialScreen')
    }

    preload() {
        this.load.html('nameform', 'assets/text/loginform.html');
        console.log(this.player.playerInfo)
    }

    create() {

        this.buttonMint = this.addSpriteToScene(this.cameras.main.width / 1.2, this.cameras.main.height / 1.2, 'buttonMint', 0.1);

        var element = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2,).createFromCache('nameform');
        element.addListener('click');
        element.on('click', async function (event) {
            console.log(this)
            console.log(event.target)
            if (event.target.name === 'EnterButton') {
                var inputUsername = this.getChildByName('username');

                //  TODO Add regex 
                if (inputUsername.value !== '' && inputUsername.value.length > 3 && inputUsername.value.length < 10) {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the username form out
                    this.scene.tweens.add({
                        targets: element.rotate3d, x: 1, w: 90, duration: 1000, ease: 'Power3',
                        onComplete: function () {
                            element.setVisible(false);
                        }
                    });
                    
                    // TODO enregistrement en base
                    this.scene.player.playerInfo.isFirstTime = false;
                    this.scene.player.playerInfo.name = inputUsername.value;
                    await setDoc(doc(this.scene.player.users, this.scene.player.playerInfo.address), this.scene.player.playerInfo);
                    this.scene.scene.start("SceneHome"); // si isFristTime , on start tutorial
                }
                else {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: element, alpha: 0.8, duration: 200, ease: 'Power3', yoyo: true });
                }
            }
        });

        // animatio to display modal Username
        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });



    }

    update() {
    }
}

export default TutorialScreen;
