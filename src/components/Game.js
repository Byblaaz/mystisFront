import React from 'react';
import Phaser from 'phaser';
import SceneHome from "../scenes/SceneHome";
import LoadingScreen from "../scenes/Preloader";
import SceneMint from "../scenes/SceneMint";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import SceneLogin from "../scenes/SceneLogin";
import SceneInventory from "../scenes/SceneInventory";
import Player from '../plugins/PlayerState';
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin";
import TextTypingPlugin from "phaser3-rex-plugins/plugins/texttyping-plugin";
import SceneTest from "../scenes/SceneTest";
import 'phaser/plugins/spine/dist/SpinePlugin.min.js'
import CircleMaskImagePlugin from "phaser3-rex-plugins/plugins/circlemaskimage-plugin";


function Game() {
    const game = new Phaser.Game({
        width: 1422,
        height: 800,
        type: Phaser.WEBGL,
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        plugins: {
            global: [
                { key: 'Player', plugin: Player, start: true, mapping: 'player'},
                { key: 'rexRoundRectanglePlugin',plugin: RoundRectanglePlugin,start: true },
                { key: 'rexTextTyping', plugin: TextTypingPlugin, start: true },
                { key: 'rexCircleMaskImagePlugin', plugin: CircleMaskImagePlugin, start: true},
            ],
            scene: [
                { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI'},
                { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
            ],
        },
        scene: {
            preload: preload,
            create: create
        },
        parent: 'game-content',
    });

    game.scene.add("SceneInventory", SceneInventory);

    function preload(){
        this.load.image('backgroundHome', 'assets/background.jpeg');
        this.load.image('buttonMint', 'assets/brown.png');
        this.load.image('homeButton', 'assets/home.png');
        this.load.image('imageNFT', 'assets/imageNFT.png');
        this.load.image('avatar', 'assets/avatar.png');
    }

    function create(){

        // Background changement taille en fonction de l'écran
        this.background = this.add.image(this.cameras.main.width / 2 , this.cameras.main.height / 2, 'backgroundHome')


        //TODO Test
        //Details Box
        //this.cameras.main.width / 2
        const overlayPlayer = this.add.rectangle(215, 60, 300, 70, 0x999999, 0.9)
        const circle = this.add.circle(60, 60, 50, 0x999999, 0.9)
        this.add.rexCircleMaskImage(60, 60, 'avatar').setScale(0.1);
        this.detailsText = this.add.text(120, 60,
            'Byblaaz',
            {fontFamily: 'Arial', align: 'justify', fontSize: '20px'})
        this.eloText = this.add.text(120, 35,
            'Elo',
            {fontFamily: 'Arial', align: 'justify', fontSize: '20px'})
        this.eloValue = this.add.text(155, 35,
            '1025',
            {fontFamily: 'Arial', align: 'justify', fontSize: '20px'})

    }


    return  <div id="game-content" />


};

export default Game;
