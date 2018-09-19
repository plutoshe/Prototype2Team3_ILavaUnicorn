import { LevelBackground } from "../sprites/levelBackground.js"
import { Player } from "../sprites/player.js"
import {collisionHandlers} from "../collisionHandlers.js"
import { Enemy } from "../enemy.js"
import { Lava } from "../lava.js"
import {blockTextures, entityTextures, backgroundConfig, playerConfig} 
    from "./levelSceneConfig.js"


export class levelScene extends Phaser.Scene{
    constructor (config)
    {
        super(config);
        Phaser.Scene.call(this, { key: 'levelScene' });
    }
    preload ()
    {
        this.load.image('star', 'assets/star.png');
        this.load.image('full_purple', 'assets/full.png');
        this.load.image('full_lightbrown', 'assets/FullTile_5.png');
        this.load.image('full_darkbrown', 'assets/FullTile_4.png');
        this.load.image('full_orange', 'assets/FullTile_7.png');
        this.load.image('full_red', 'assets/FullTile_2.png');
        this.load.image('full_pink', 'assets/FullTile_3.png');
        this.load.image('full_maroon', 'assets/FullTile_14.png');
        this.load.image('full_blue', 'assets/FullTile_8.png');
        this.load.image('full_green', 'assets/FullTile_15.png');
        this.load.image('full_lightgray', 'assets/FullTile_13.png');
        this.load.image('full_darkgray', 'assets/FullTile_11.png');
        this.load.image('full_black', 'assets/FullTile_9.png');
        this.load.image('lava', 'assets/MagmaTiledTurned.png');
        this.load.image('empty', 'assets/empty.png');

        this.load.image("castle", "assets/castle.png");

        this.load.image('background_lose', "assets/background_lose.png");
        this.load.image('background_win', 'assets/background_win.png');
        this.load.image('flag_lose', 'assets/flag_lose.png');
        this.load.image('flag_win', 'assets/flag_win.png');

        this.load.image("rock_static", "assets/rock_static.png")
        this.load.spritesheet('rock_shaking', 'assets/rock_shaking.png', 
                              { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('rock_broken', 'assets/rock_broken.png', 
                              { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('knight', 'assets/unicorn.png', 
                              { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('enemy1', 'assets/enemy1.png', 
                              { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('player_idle', 'assets/player_idle.png', 
                              { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('player_move', 'assets/player_movement.png', 
                              { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('player_attack', 'assets/hammer.png', 
                              { frameWidth: 80, frameHeight: 80 });

        this.load.spritesheet('player_win', 'assets/player_win.png', 
                              { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('player_lose', 'assets/player_lose.png', 
                              { frameWidth: 128, frameHeight: 128 });
    }
    create ()
    {
        this.anims.create({
            key: 'player_lose',
            frames: this.anims.generateFrameNumbers('player_lose'),
            frameRate: 7,
        });

        this.anims.create({
            key: 'player_win',
            frames: this.anims.generateFrameNumbers('player_win'),
            frameRate: 5,
        });


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



        this.background = new LevelBackground();
        this.player = new Player();
        this.enemy = new Enemy();

        this.cameras.main.setBounds(
            0,
            0, 
            this.game.config.width,
            this.game.config.height / backgroundConfig.displayBlockHeight * backgroundConfig.blockHeight);
        // background config
        backgroundConfig.width = this.game.config.width;
        backgroundConfig.height = this.game.config.height;
        backgroundConfig.blockTextures = blockTextures;
        backgroundConfig.entityTextures = entityTextures;
        backgroundConfig.scene = this;    
        this.background.create(backgroundConfig);

        this.backgroundCellWidth = this.background.blockTextureWidth;
        this.backgroundCellHeight = this.background.blockTextureHeight;
        // player config
        playerConfig.backgroundCellWidth = this.background.blockTextureWidth;
        playerConfig.backgroundCellHeight = this.background.blockTextureHeight;

        playerConfig.scene = this;
        this.player.create(playerConfig);    
        if (this.background.blocks["full"][this.player.bx][this.player.by]) {
            this.background.blocks["full"][this.player.bx][this.player.by].destroy();
            this.background.setlevelMap(this.player.bx, this.player.by, 0);
        }
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
        };  
        this.enemy.create(enemyConfig); 
        
        // key binding setting

        // conllision setting
        var collsionObj = {
            "knight": this.background.blockGroups["knight"],
            "rock": this.background.blockGroups["rock"],
            "player": this.player.sprite,
            "enemy": this.enemy.sprite,
            "player_attack": this.player.attack,
            "lava": this.background.lava.blocksGroup, 
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
        this.input.keyboard.removeAllListeners();
        this.cursors = this.input.keyboard.addKeys({
            "up": Phaser.Input.Keyboard.KeyCodes.UP,
            "down": Phaser.Input.Keyboard.KeyCodes.DOWN,
            "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
            "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
            "attack": Phaser.Input.Keyboard.KeyCodes.SPACE});
        // initialization
        this.background.initialization();
        
        this.player.initialization();    
        this.isOver = false;
    }

    isGameFinished(game) {
        if (game.player.by < game.background.successbackLimit && 
            game.background.EntityColl["knight"].length == 0)
            return 1;
        if (!game.player.sprite.active)
            return 2;
        return 0;
    }

    changeStartScene() {
        this.scene.start('startScene');
    }

    update (){
        if (this.isGameFinished(this)) {  
            if (!this.isOver) {
                var status = this.isGameFinished(this);
                var backgroundGameFinished = "background_win";
                var playerAction = "player_win";
                var flag = "flag_win";
                if (status == 2) {
                    backgroundGameFinished = "background_lose";
                    playerAction = "player_lose";
                    flag = "flag_lose";
                }
                var transparentBackground = this.add.sprite(this.game.config.width / 2, 
                                this.game.config.height / 2, 
                                backgroundGameFinished);
                transparentBackground.setScale(
                        this.game.config.width / transparentBackground.width,
                        this.game.config.height / transparentBackground.height);
                this.add.sprite(this.game.config.width / 2, 
                                this.game.config.height / 4,
                                flag);
                var playerActionSprite = this.add.sprite(this.game.config.width / 2, 
                                this.game.config.height / 2,
                                playerAction);
                playerActionSprite.play(playerAction);
                this.isOver = true;
                console.log("Game Finished");
                console.log(this.time);
                this.time.addEvent({
                    delay: 2500,
                    callback: this.changeStartScene ,
                    callbackScope: this,
                    args: this
                });
            }
            return;
        }
        this.background.update();
        this.player.update();
        this.enemy.update();
    }
}
