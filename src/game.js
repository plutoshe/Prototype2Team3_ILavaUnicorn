import {startScene} from "./scenes/startScene.js"
import {levelScene} from "./scenes/levelScene.js"

var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,
    title: "ABC",
    physics: {
        default: 'arcade',
        arcade: {    
            debug: false
        }
    },
    scene: [startScene, levelScene],
};

var digdug = new Phaser.Game(config);


