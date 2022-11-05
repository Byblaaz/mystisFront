import Phaser from 'phaser';
import BaseScene from '../plugins/BaseScene';

class TutorialScreen extends BaseScene {
    constructor(){
        super('TutorialScreen')
    }

     preload () {
         this.load.html('nameform', 'assets/text/loginform.html');
    }

    create(){

        this.buttonMint = this.addSpriteToScene(this.cameras.main.width / 1.2, this.cameras.main.height / 1.2, 'buttonMint', 0.1);

        var element = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2,).createFromCache('nameform');
        element.addListener('click');
        element.on('click', function (event) {

            console.log(event.target)
            if (event.target.name === 'EnterButton')
            {
                var inputUsername = this.getChildByName('username');

                //  Have they entered anything?
                if (inputUsername.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the username form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 1000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                        }});

                    // TODO enregistrement en base
                    console.log(inputUsername.value)
                }
                else
                {
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

    update(){
    }
}

export default TutorialScreen;
