import {startScene} from "./scenes/startScene.js"
import {levelScene} from "./scenes/levelScene.js"
var config = {
    type: Phaser.AUTO,
    width: 560,
    height: 720,
    title: "ABC",
    physics: {
        default: 'arcade',
        arcade: {    
            debug: false
        }
    },
    scene: [startScene, new levelScene()],
};

var digdug = new Phaser.Game(config);
