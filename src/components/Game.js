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


function Game() {
    const game = new Phaser.Game({
        width: 1600,
        height: 900,
        type: Phaser.AUTO,
        scale: {
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        },
        plugins: {
            global: [
                { key: 'Player', plugin: Player, start: false, mapping: 'player'},
                { key: 'rexRoundRectanglePlugin',plugin: RoundRectanglePlugin,start: true },
                { key: 'rexTextTyping', plugin: TextTypingPlugin, start: true }
            ],
            scene: [
                { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI'}
                ]
        },
        scene: [
            LoadingScreen,
            SceneLogin,
            SceneHome,
            SceneMint
        ],
        parent: 'game-content',
    });

    return  <div id="game-content" />

};

export default Game;
