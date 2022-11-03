import React from 'react';
import Phaser from 'phaser';
import SceneHome from "../scenes/SceneHome";
import LoadingScreen from "../scenes/Preloader";
import SceneMint from "../scenes/SceneMint";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import SceneLogin from "../scenes/SceneLogin";
import Player from '../plugins/PlayerState';
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin";
import TextTypingPlugin from "phaser3-rex-plugins/plugins/texttyping-plugin";
import SceneTest from "../scenes/SceneTest";
import 'phaser/plugins/spine/dist/SpinePlugin.min.js'


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
                { key: 'rexTextTyping', plugin: TextTypingPlugin, start: true }
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

    function preload(){
        console.log(window)
        this.load.setPath('assets/brigand/');
        this.load.spine('player', 'brigand.json', 'brigand.atlas', true);

    }

    function create(){

        console.log("erreur 3")
        //var boy = this.add.spine(600, 600, 'player', 'idle', true).ToScale(0.5);

        let boy1 = this.make.spine({
            x: 512, y: 550, key: 'player',
            scale: 0.5,
            skinName: 'default',
            animationName: 'idle', loop: true,
            slotName: 'tete', attachmentName: 'tete'
        });
        console.log(boy1.getBounds());



    }


    return  <div id="game-content" />

};

export default Game;
