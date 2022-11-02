import Phaser from 'phaser'

export default class SceneTest extends Phaser.Scene

{
	constructor(){
		super('Scenetest')
	}

	preload(){
        this.load.image('backgroundHome', 'assets/background.jpeg');

        this.load.setPath('assets/spine/');

        this.load.spine('set1', 'demo.json', [ 'atlas1.atlas' ], true);
    }

    create(){
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundHome');

        var boy = this.add.spine(400, 600, 'set1.spineboy', 'idle', true);

        console.log(boy.getBounds());
    }

    update(){


    }
}

