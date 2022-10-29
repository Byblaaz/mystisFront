import Phaser from 'phaser'

export default class SceneTest extends Phaser.Scene

{
	constructor(){
		super('scenetest')
	}

	preload(){
        this.load.image('sky', 'assets/sky.png');
    }

    create(){
        this.add.image(400, 300, 'sky');

        this.add.text(400,300, "TitleScreen").setScale(0.55);
    }

    update(){


    }
}

