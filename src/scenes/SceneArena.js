import Phaser from 'phaser';
import BaseScene from '../plugins/BaseScene';

import { Tabs, ScrollablePanel, FixWidthSizer, OverlapSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_PRIMARY = 0x4e342e;
const COLOR_DARK = 0x260e04;
const COLOR_RED = 0xC70039;
const COLOR_GREEN = 0x20B638;
const COLOR_BLUE = 0x1C82FF;
const COLOR_YELLOW = 0xFFC300;
let scene;
let selectedFigthter
let animationCircle = false

const baseApiImage = "https://mytis-api.vercel.app/api/images/";

export default class SceneArena extends BaseScene
{
    init(data){
        this.data = data;
        console.log(data)
    }

    constructor(){
        super('SceneArena')
    }



   async preload() {
        scene = this

    }

    async mainFunction () {





    }




    create() {
    }


    update() {

    }
}




