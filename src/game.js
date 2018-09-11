// var background = require("./background")
import { LevelBackground } from "./sprite/level_background.js"
import { Player } from "./sprite/player.js"
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    title: "ABC",
    physics: {
        default: 'arcade',
        arcade: {    
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var levelgame = new Phaser.Game(config);

function preload ()
{
    this.load.image('star', 'assets/star.png');
    this.load.image('full', 'assets/full.png');
    this.load.image('empty', 'assets/empty.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.background = new LevelBackground();
    this.player = new Player()
}



function create ()
{
    // console.log("!!!", this.game.config.width, this.scene.width);
    let backgroundConfig = {
        scene: this, 
        leftTopX: 0, 
        leftTopY: 0, 
        width: this.game.config.width, 
        height: this.game.config.height, 
        blockWidth: 10, 
        blockHeight: 10, 
        blockTexture: ["empty", "full", "rock"], 
        levelMap:  [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1]],

    }
    this.background.create(backgroundConfig);

    this.backgroundCellWidth = this.background.blockWidth;
    this.backgroundCellHeight = this.background.blockHeight;
    let playerConfig = {
        scene: this,
        x: 0,
        y: 0,
        playerTexture: 'star',
        backgroundCellWidth: this.background.blockTextureWidth,
        backgroundCellHeight: this.background.blockTextureHeight,
    }
    this.player.create(playerConfig);    
    console.log(this.player.bx, this.player.by);
    console.log(this.background.blocks);
    this.background.blocks["full"][this.player.bx][this.player.by].destroy();
    this.cursors = this.input.keyboard.addKeys({
        "up": Phaser.Input.Keyboard.KeyCodes.UP,
        "down": Phaser.Input.Keyboard.KeyCodes.DOWN,
        "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
        "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
        "space": Phaser.Input.Keyboard.KeyCodes.SPACE});
}


function update (){
    this.player.update();
}

