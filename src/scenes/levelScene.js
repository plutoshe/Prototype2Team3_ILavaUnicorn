import { LevelBackground } from "../sprites/levelBackground.js"
import { Player } from "../sprites/player.js"
import {collisionHandlers} from "../collisionHandlers.js"
import { Enemy } from "../enemy.js"
import { Lava } from "../lava.js"

export var levelScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: 
    function levelScene()
    {
        Phaser.Scene.call(this, { key: 'levelScene' });
    },
    preload: preload,
    create: create,
    update: update,
});

let blockTextures = {
    0 : {
        group: "empty",
        texture: "empty",
        createFunction: function(v) {
            return true;
        }
    },
    1 : {
        group: "full",
        texture: "full_default",
        createFunction: function(v) {
            if (v.group == "rock" || v.group == "full") {
                if (v.group == "full" && v.texture != "full_default") {
                    return false;
                }
                return true;
            }
            else return false;
        }
    },
    2 : {
        group: "full",
        texture: "full_red",//full_red
        createFunction: function(v) {
            if (v.texture == "full_red") 
                return true;
            else return false;
        }
    },
    3 : {
        group: "full",
        texture: "full_orange",
        createFunction: function(v) {
            if (v.texture == "full_orange") 
                return true;
            else return false;
        }
    },
    4 : {
        group: "full",
        texture: "full_pink",
        createFunction: function(v) {
            if (v.texture == "full_pink") 
                return true;
            else return false;
        }
    },
    5: {
        group: "lava",
        texture: "lava",
        createFunction: function(v) {
            if (v.texture == "lava") 
                return true;
            else return false;
        }
    }
}

let entityTextures = [
    {
        group: "rock",
        texture: "rock_static",
        backgroundBlockGroup: "full",
        pos: [[4, 5], [10, 11], [3, 13], [6, 19], [7, 19], [2, 22]],
    },
    {
        group: "knight",
        texture: "knight",
        animation: "knight",
        backgroundBlockGroup: "full",
        pos: [[1, 9], [12, 9], [0, 15], [11, 18], [3, 26], [12, 26]],
    },
]


let backgroundConfig = { 
    leftTopX: 0, 
    leftTopY: 0,  
    displayBlockWidth: 14, 
    displayBlockHeight: 18, 
    blockWidth: 14,
    blockHeight: 29,
    levelMap: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,0,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,0,1,1,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1],
        [2,2,2,2,2,2,0,2,2,2,2,2,2,2],
        [5,2,2,2,2,0,0,0,2,2,2,2,2,5],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,0,2,2,2,2],
        [2,2,0,0,0,0,2,2,2,0,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,0,2,2,2,2],
        [5,3,3,3,3,3,3,3,3,0,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,0,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,0,3,3,3,3,3,3,5,3,3,3],
        [3,3,3,0,3,3,3,3,3,3,3,3,3,3],
        [4,4,4,0,4,4,4,4,4,4,4,4,4,4],
        [4,4,4,4,4,4,4,4,0,0,0,0,4,4],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4],
        [4,4,4,4,4,4,0,4,4,4,4,4,4,4],
        [4,4,4,4,4,4,0,4,4,4,4,4,4,4],
        [4,4,4,5,4,4,0,4,4,4,4,4,4,4],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,5],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4]],

}

let playerConfig = {
    x: 0,
    y: 5,
    player_idle_texture: 'player_idle',
    player_move_texture: 'player_move',
    attack_texture: 'player_attack',
    cameraBoundry: 2,
}

function preload ()
{
    this.load.image('star', 'assets/star.png');
    this.load.image('full_default', 'assets/full.png');
    this.load.image('full_orange', 'assets/FullTile_7.png');
    this.load.image('full_red', 'assets/FullTile_2.png');
    this.load.image('full_pink', 'assets/FullTile_3.png');
    this.load.image('lava', 'assets/MagmaTiledTurned.png');
    this.load.image('empty', 'assets/empty.png');

    this.load.image("rock_static", "assets/rock_static.png")
    this.load.spritesheet('rock_shaking', 'assets/rock_shaking.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('rock_broken', 'assets/rock_broken.png', { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet('knight', 'assets/knight.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('enemy1', 'assets/enemy1.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('player_idle', 'assets/player_idle.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('player_move', 'assets/player_movement.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('player_attack', 'assets/hammer.png', { frameWidth: 80, frameHeight: 80 });

    this.background = new LevelBackground();
    this.player = new Player();
    this.enemy = new Enemy();
}



function create ()
{
    this.anims.create({
        key: 'player_idle',
        frames: this.anims.generateFrameNumbers('player_idle'),
        frameRate: 5,
    });
    this.anims.create({
        key: 'player_move',
        frames: this.anims.generateFrameNumbers('player_move'),
        frameRate: 5,
    });
    this.anims.create({
        key: 'player_attack',
        frames: this.anims.generateFrameNumbers('player_attack'),
        frameRate: 5,
        repeat: -1,
    });

    this.anims.create({
        key: 'enemy1',
        frames: this.anims.generateFrameNumbers('enemy1'),
        frameRate: 3,
        repeat: -1,
    });
    this.anims.create({
        key: 'knight',
        frames: this.anims.generateFrameNumbers('knight'),
        frameRate: 3,
        repeat: -1,
    });
    this.anims.create({
        key: 'rock_shaking',
        frames: this.anims.generateFrameNumbers('rock_shaking'),
        frameRate: 10,
        repeat: 1,
    });
    this.anims.create({
        key: 'rock_broken',
        // frames: [ { key: 'rock_shaking'} ],
        frames: this.anims.generateFrameNumbers('rock_broken'),
        frameRate: 10,
        hideOnComplete: true,
    });
    this.cameras.main.setBounds(
        0,
        0, 
        this.game.config.width,
        this.game.config.height / backgroundConfig.displayBlockHeight * backgroundConfig.blockHeight);
    // background config
    backgroundConfig.width = this.game.config.width, 
    backgroundConfig.height = this.game.config.height,
    backgroundConfig.blockTextures = blockTextures;
    backgroundConfig.entityTextures = entityTextures;
    backgroundConfig.scene = this;    
    backgroundConfig.levelMap = backgroundConfig.levelMap[0].map(
        (col, i) => backgroundConfig.levelMap.map(row => row[i]));
    this.background.create(backgroundConfig);

    this.backgroundCellWidth = this.background.blockTextureWidth;
    this.backgroundCellHeight = this.background.blockTextureHeight;
    // player config
    playerConfig.backgroundCellWidth = this.background.blockTextureWidth;
    playerConfig.backgroundCellHeight = this.background.blockTextureHeight;

    playerConfig.scene = this;
    this.player.create(playerConfig);    
    if (this.background.blocks["full"][this.player.bx][this.player.by])
        this.background.blocks["full"][this.player.bx][this.player.by].destroy();
    // enemy config
    let enemyConfig = {
        scene: this,
        x: 6,
        y: 7,
        playerTexture: 'enemy1',
        backgroundCellWidth: this.background.blockTextureWidth,
        backgroundCellHeight: this.background.blockTextureHeight,
        speed: 50,
        isAnimation: true,
    }   
    this.enemy.create(enemyConfig); 
    
    // key binding setting
    this.cursors = this.input.keyboard.addKeys({
        "up": Phaser.Input.Keyboard.KeyCodes.UP,
        "down": Phaser.Input.Keyboard.KeyCodes.DOWN,
        "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
        "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
        "attack": Phaser.Input.Keyboard.KeyCodes.SPACE});

    // conllision setting
    var collsionObj = {
        "knight": this.background.blockGroups["knight"],
        "rock": this.background.blockGroups["rock"],
        "player": this.player.sprite,
        "enemy": this.enemy.sprite,
        "player_attack": this.player.attack,
    }
    for (var i in collisionHandlers)
        for (var j in collisionHandlers[i]) {
            for (var k in collisionHandlers[i][j]) {
                this.physics.add.overlap(
                    collsionObj[j],
                    collsionObj[k],
                    collisionHandlers[i][j][k]);
            }
        }

    // initialization
    this.background.initialization();
    
    this.player.initialization();    
}


function update (){
    this.background.update();
    this.player.update();
    this.enemy.update();
}