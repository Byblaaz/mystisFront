import React from 'react';
import Phaser from 'phaser';
import SceneHome from "../scenes/SceneHome";
import LoadingScreen from "../scenes/Preloader";
import SceneMint from "../scenes/SceneMint";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

function Game() {
    const game = new Phaser.Game({
        width: window.innerWidth,
        height: window.innerHeight,
        type: Phaser.AUTO,
        scale: {
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        },
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            ]
        },
        scene: [
            LoadingScreen,
            SceneHome,
            SceneMint
        ],
        parent: 'game-content',
    });

    return  <div id="game-content" />

};

export default Game;
