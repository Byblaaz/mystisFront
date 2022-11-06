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
        this.load.setPath('assets/brigand/');
        this.load.image('homeButton', 'assets/home.png');

        this.load.spine('player', 'brigand.json', 'brigand.atlas', true);

    }

    function create(){

        this.buttonHome = this.add.sprite(this.cameras.main.width / 50 , this.cameras.main.height / 20, 'homeButton').setScale(0.3).setInteractive();

        //var boy = this.add.spine(600, 600, 'player', 'idle', true).ToScale(0.5);

        let boy1 = this.make.spine({
            x: 512, y: 550, key: 'player',
            scale: 0.5,
            skinName: 'default',
            animationName: 'idle', loop: true,
            slotName: 'tete', attachmentName: 'tete_capuche',
            // tete {tete_1,tete2,}
        });

        const attachementsPantalon = ['jambe droite_', 'jambe gauche_', 'mollet droit_', 'mollet gauche_']



        const getAttachments = (spine) => {
            return spine.skeleton.skin.attachments
        }
        const setAttachment = (spine, slotName, attachmentName) => {
            spine.skeleton.setAttachment(slotName, attachmentName)
        }

        console.log(getAttachments(boy1));

        let listeChangeAttachement = [];
        console.log(listeChangeAttachement.length)
        if (listeChangeAttachement.length == 0) {
            const trait = "pantalon_blue"
            var attribut = trait.split("_")[1]
            console.log(attribut)
            for (const item in attachementsPantalon) {
                console.log(item)
                listeChangeAttachement.push(String(attachementsPantalon[item]+attribut))
                console.log(attachementsPantalon[item].slice(0, -1))
                setAttachment(boy1, String(attachementsPantalon[item].slice(0, -1)), String(attachementsPantalon[item]+attribut))
            }
            console.log(listeChangeAttachement)
            setAttachment(boy1, "tete", "tete")
            //setAttachment(boy1, "tete", "tete")

            //this.sound.play('hoverEffect', { loop: false });
        }

        this.buttonHome.on('pointerover', () => {


        });

    }


    return  <div id="game-content" />

};

export default Game;
