import { LevelBackground } from "./sprite/level_background.js"
import { Player } from "./sprite/player.js"
import {collisionHandlers} from "./collisionHandlers.js"

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
    this.load.image("rock_static", "assets/rock_static.png")
    this.load.spritesheet('rock_shaking', 'assets/rock_shaking.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('rock_broken', 'assets/rock_broken.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    // 

    this.background = new LevelBackground();
    this.player = new Player()
}



function create ()
{
    this.anims.create({
        key: 'rock_shaking',
        // frames: [ { key: 'rock_shaking'} ],
        frames: this.anims.generateFrameNumbers('rock_shaking'),
        frameRate: 10,
        repeat: 1,
        // OnComplete: this.background.rockShakingDone,
    });

    this.anims.create({
        key: 'rock_broken',
        // frames: [ { key: 'rock_shaking'} ],
        frames: this.anims.generateFrameNumbers('rock_broken'),
        frameRate: 10,
        hideOnComplete: true,
        // OnComplete: this.background.rockShakingDone,
    });



    // background config
    let backgroundConfig = {
        scene: this, 
        leftTopX: 0, 
        leftTopY: 0, 
        width: this.game.config.width, 
        height: this.game.config.height, 
        blockWidth: 10, 
        blockHeight: 10, 
        blockTexture: ["empty", "full", "rock_static"], 
        levelMap:  [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,2,1,1,1,1,1,1,1],
            [1,1,0,2,1,2,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1]],

    }

    backgroundConfig.levelMap = backgroundConfig.levelMap[0].map(
        (col, i) => backgroundConfig.levelMap.map(row => row[i]));
    this.background.create(backgroundConfig);

    this.backgroundCellWidth = this.background.blockWidth;
    this.backgroundCellHeight = this.background.blockHeight;

    // player config

    let playerConfig = {
        scene: this,
        x: 0,
        y: 1,
        playerTexture: 'star',
        backgroundCellWidth: this.background.blockTextureWidth,
        backgroundCellHeight: this.background.blockTextureHeight,
    }
    this.player.create(playerConfig);    
    this.background.blocks["full"][this.player.bx][this.player.by].destroy();

    // key binding setting
    this.cursors = this.input.keyboard.addKeys({
        "up": Phaser.Input.Keyboard.KeyCodes.UP,
        "down": Phaser.Input.Keyboard.KeyCodes.DOWN,
        "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
        "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
        "space": Phaser.Input.Keyboard.KeyCodes.SPACE});

    // conllision setting
    // console.log(collisionHandlers["collision"]["player"]["rock"]);
    this.physics.add.overlap(
        this.player.sprite,
        this.background.blockGroups["rock_static"],
        collisionHandlers["collision"]["player"]["rock"]);

    // initialization
    this.background.initialization();
}


function update (){
    this.background.update();
    this.player.update();
}

