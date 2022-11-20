import Phaser from 'phaser';

class LoadingScreen extends Phaser.Scene {


    preload(){

        const scene = this;

        // Chargement des images avant le lancement de l'application
        this.load.image('logo', 'assets/logoSansFond1.png');
        this.load.image('backgroundLogin', 'assets/backgroundLogin.png');
        this.load.image('backgroundHome', 'assets/home/backgroundHome.png');
        this.load.image('buttonMint', 'assets/brown.png');
        this.load.image('homeButton', 'assets/home.png');
        this.load.image('imageNFT', 'assets/imageNFT.png');
        this.load.image('buttonStart', 'assets/start.png');
        this.load.image('buttonConnect', 'assets/connect.png');
        this.load.image('avatar', 'assets/avatar.png');
        this.load.image('nuageShader', 'assets/nuage.png');
        this.load.image('overlay', 'assets/home/overlay.png')
        this.load.image('circleAvatar', 'assets/home/circleAvatar.png')
        this.load.image('teamButton', 'assets/home/team.png')
        this.load.image('loading', 'assets/circle.png')

        // Buttons Home
        this.load.image('home-btnArena', 'assets/home/arena.png');
        this.load.image('home-btnSummon', 'assets/home/summon.png');

        this.load.image('avatar', 'assets/avatar.png');

        // Buttons Home
        this.load.image('home-btnArena', 'assets/home/arena.png');
        this.load.image('home-btnSummon', 'assets/home/summon.png');


        // Buttons Home
        this.load.image('home-btnArena', 'assets/home/arena.png');
        this.load.image('home-btnSummon', 'assets/home/summon.png');


        // Audio
        this.load.audio('titleBgMusic', ['./audio/mythologymusic.mp3']);

        // Mint
        this.load.image('invocation', 'assets/mint/invocation.png')

        // Inventory


        //Tests
        this.load.image('cards_icon', 'assets/Icons/cards_icon.png');
        this.load.image('magic_icon', 'assets/Icons/bagpack_icon.png');
        this.load.image('backpack_icon', 'assets/Icons/magic_icon.png');
        this.load.image('stats_icon', 'assets/Icons/stats_icon.png');
        this.load.image('cart_icon', 'assets/Icons/cart_icon.png');
        this.load.image('eth', 'assets/Icons/eth_icon.png');


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
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo').setScale(0.3)
        this.buttonStart = this.add.text(this.cameras.main.width / 2.3, this.cameras.main.height / 1.4, 'Join the battle...').setScale(1.2).setInteractive();

        this.buttonStart.on('pointerup', () => {
            this.buttonStart.setAlpha(1);
        });

        this.buttonStart.on('pointerdown', async () => {
            this.soundLogin = this.sound.play('titleBgMusic', {loop: true, volume:0.2});
            this.scene.start("SceneLogin");
            //this.scene.start("SceneMint");
        });
    }
}

export default LoadingScreen;
