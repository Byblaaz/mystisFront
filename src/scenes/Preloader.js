import Phaser from 'phaser';

class LoadingScreen extends Phaser.Scene {


    preload(){

        const scene = this;

        // Chargement des images avant le lancement de l'application
        this.load.image('logo', 'assets/logoSansFond1.png');
        this.load.image('backgroundLogin', 'assets/backgroundLogin.png');
        this.load.image('backgroundHome', 'assets/background.jpeg');
        this.load.image('buttonMint', 'assets/brown.png');
        this.load.image('homeButton', 'assets/home.png');
        this.load.image('imageNFT', 'assets/imageNFT.png');
        this.load.image('buttonStart', 'assets/start.png');
        this.load.image('buttonConnect', 'assets/connect.png');

        // Audio
        this.load.audio('titleBgMusic', ['./audio/mythologymusic.mp3']);


       /* for (var i = 0; i < 150; i++) {
            this.load.image('test'+i, 'assets/imageNFT.png');
        }*/

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width, height, 320, 50);



        // Audio



        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width, height, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

    }


    create(){
        console.log(this.cameras.main.width)
        // Changement de scene une fois le chargement terminé
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo').setScale(0.3)
        this.buttonStart = this.add.text(this.cameras.main.width / 2.3, this.cameras.main.height / 1.4, 'Join the battle...').setScale(1.2).setInteractive();


        this.buttonStart.on('pointerup', () => {
            this.buttonStart.setAlpha(1);
        });

        this.buttonStart.on('pointerdown', async () => {
            this.soundLogin = this.sound.play('titleBgMusic', {loop: true, volume:0.2});
            this.scene.start("SceneLogin");
            //this.scene.start("SceneHome");
        });
        // ajouter bouton join the battle

    }
}

export default LoadingScreen;
