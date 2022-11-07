import React from 'react';
import Phaser from 'phaser';
//Scenes import
import SceneHome from "../scenes/SceneHome";
import LoadingScreen from "../scenes/Preloader";
import SceneMint from "../scenes/SceneMint";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import SceneLogin from "../scenes/SceneLogin";
import TutorialScreen from '../scenes/Tutorial';
//Plugins
import Player from '../plugins/PlayerState';
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin";
import TextTypingPlugin from "phaser3-rex-plugins/plugins/texttyping-plugin";
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import CircleMaskImagePlugin from "phaser3-rex-plugins/plugins/circlemaskimage-plugin";


function Game() {
    const game = new Phaser.Game({
        width: 1422,
        height: 800,
        type: Phaser.AUTO,
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        plugins: {
            global: [
                { key: 'Player', plugin: Player, start: true, mapping: 'player'},
                { key: 'rexRoundRectanglePlugin',plugin: RoundRectanglePlugin,start: true },
                { key: 'rexTextTyping', plugin: TextTypingPlugin, start: true },
                { key: 'rexInputTextPlugin', plugin: InputTextPlugin, start: true },
                { key: 'rexCircleMaskImagePlugin', plugin: CircleMaskImagePlugin, start: true},

            ],
            scene: [
                { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI'}
            ]
        },
        scene: [
            LoadingScreen,
            SceneLogin,
            SceneHome,
            SceneMint,
            TutorialScreen
        ],
        parent: 'game-content',
        dom: {
            createContainer: true
        },
    });

    return  <div id="game-content" />

};

export default Game;
