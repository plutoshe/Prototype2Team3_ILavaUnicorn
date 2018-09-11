// var background = require("./background")
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



function new2DArray(x, y) {
    var myarray = new Array(x)
    for (i=0; i < x; i++) 
        myarray[i] = new Array(y);
    return myarray;
    
}


var level_width = 20;
var level_height = 15;
var level_maps = new Array(level_height).map(function (x, i) { 
        return new Array(level_width).map(function(x,i) { return "full";});
    });
var blockTexture = ["empty", "full"];
var player;

var game = new Phaser.Game(config);
var collisionHandlers = { 
    "player": 
        { "full": 
            function collisionHandler(player, full) {
                console.log("!!!!");
                //  When a bullet hits an alien we kill them both
                // full.kill();
            },
        },
    }

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('full', 'assets/full.png');
    this.load.image('empty', 'assets/empty.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}



function create ()
{
    this.oldPassBlock = 0;
    this.passBlock = 0;
    this.background = new Background(this, 0, 0, 800, 600, level_width, level_height, blockTexture, level_maps);
    player = this.physics.add.sprite(0, 0, 'star');
    player.setScale(40 / player.width, 40 / player.height);
    player.setCollideWorldBounds(true);
    player.x = Math.floor(player.x / this.background.blockTextureWidth) * this.background.blockTextureWidth;
    player.y = Math.floor(player.y / this.background.blockTextureWidth) * this.background.blockTextureWidth;
    player.bx = Math.floor(player.x / this.background.blockTextureWidth);
    player.by = Math.floor(player.y / this.background.blockTextureWidth);
    this.background.blocks["full"][player.x / this.background.blockTextureWidth][player.y / this.background.blockTextureHeight].destroy();

    // this.physics.add.overlap(player, this.background.blockGroups["full"], sss, null, this);
    cursors = this.input.keyboard.addKeys({
        "up": Phaser.Input.Keyboard.KeyCodes.UP,
        "down": Phaser.Input.Keyboard.KeyCodes.DOWN,
        "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
        "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
        "space": Phaser.Input.Keyboard.KeyCodes.SPACE});
    this.oldplayerX = player.x;
    this.oldplayerY = player.y;
    this.oldKey = "";
    // this.background.blocks["full"][0][0].destroy();
}

function collide(a, b) {
    let a1 = a.getTopLeft();
    let a2 = a.getBottomRight();
    let b1 = b.getTopLeft();
    let b2 = b.getBottomRight();
    if (b1.x >= a1.x && b1.x <= a2.x && b1.y >= a1.y && b1.y <= a2.y || 
        a1.x >= b1.x && a1.x <= b2.x && a1.y >= b1.y && a1.y <= b2.y) {
        if (b2.y == a1.y || b2.x == a1.x || a2.y == b1.y || a2.x == b1.x) return false;
        return true;
    } else return false;
}

function overlapForBlock(player, block)
{
    let blockTopLeft = block.getTopLeft();
    let playerTopLeft = player.getTopLeft();
    let playerBottomRight = player.getBottomRight();
    // if (!collide(player, block)) return;
    if (playerTopLeft.y == blockTopLeft.y) {
        if (playerBottomRight.x - blockTopLeft.x <= block.width &&
            playerBottomRight.x - blockTopLeft.x >= block.minX) {
            block.minX = playerBottomRight.x - blockTopLeft.x;
        }
        if (playerTopLeft.x - blockTopLeft.x >= 0 && 
            playerTopLeft.x - blockTopLeft.x <= block.maxX) {
            block.maxX = playerTopLeft.x - blockTopLeft.x;
        }
    }
    
    if (playerTopLeft.x == blockTopLeft.x) {
        if (playerBottomRight.y - blockTopLeft.y <= block.height && 
            playerBottomRight.y - blockTopLeft.y >= block.minY) {
            block.minY = playerBottomRight.y - blockTopLeft.y;
        }
        if (playerTopLeft.y - blockTopLeft.y >= 0 && 
            playerTopLeft.y - blockTopLeft.y <= block.maxY) {
            block.maxY = playerTopLeft.y - blockTopLeft.y;
        }
    }
    block.setCrop(
        block.minX / block.scaleX, 
        block.minY / block.scaleY, 
        (block.maxX - block.minX) / block.scaleX, 
        (block.maxY - block.minY) / block.scaleY);
    
}

function update (){
    this.oldPassBlock = this.passBlock;
    var playerTopLeft = player.getTopLeft();
    var playerBottomRight = player.getBottomRight();
    if (this.oldKey != "") {

        var bx = Math.floor(player.dstx / this.background.blockTextureWidth);
        var by = Math.floor(player.dsty / this.background.blockTextureWidth);
        console.log(bx, by);
        overlapForBlock(player, this.background.blocks["full"][bx][by]);
        if (this.oldKey == "left" && player.x <= player.dstx ||
            this.oldKey == "right" && player.x >= player.dstx ||
            this.oldKey == "up" && player.y <= player.dsty ||
            this.oldKey == "down" && player.y >= player.dsty) {
            this.oldKey = "";
            player.setVelocityY(0);
            player.setVelocityX(0);
            player.x = player.dstx;
            player.y = player.dsty;         
            player.bx = Math.floor(player.x / this.background.blockTextureWidth);
            player.by = Math.floor(player.y / this.background.blockTextureWidth);
            this.background.blocks["full"][bx][by].setVisible(false);

        }
    } else if (cursors['right'].isDown && player.bx < this.background.width)
    {
        console.log("right");
        // player.y = playerTopLeft.y / this.background.blockTextureHeight * this.background.blockTextureHeight + this.background.blockTextureHeight / 2;
        player.setVelocityY(0);
        player.setVelocityX(160);
        
        player.dstx = player.x + this.background.blockTextureWidth;
        player.dsty = player.y;

        this.oldKey = "right";
    } else
    if (cursors['left'].isDown && player.bx > 0)
    {
        console.log("left");
        // player.y = playerTopLeft.y / this.background.blockTextureHeight * this.background.blockTextureHeight + this.background.blockTextureHeight / 2;
        player.setVelocityY(0);
        player.setVelocityX(-160);

        player.dstx = player.x - this.background.blockTextureWidth;
        player.dsty = player.y;

        this.oldKey = "left";
    } else
    if (cursors['up'].isDown && player.by > 0)
    {
        // player.x = playerTopLeft.x / this.background.blockTextureWidth * this.background.blockTextureWidth  + this.background.blockTextureWidth / 2;
        player.setVelocityX(0);
        player.setVelocityY(-160);

        player.dstx = player.x;
        player.dsty = player.y - this.background.blockTextureHeight;
        this.oldKey = "up";
    } else
    if (cursors['down'].isDown && player.by < this.background.height)
    {
        // player.x = playerTopLeft.x / this.background.blockTextureWidth * this.background.blockTextureWidth + this.background.blockTextureWidth / 2;
        player.setVelocityX(0);
        player.setVelocityY(160);

        player.dstx = player.x;
        player.dsty = player.y + this.background.blockTextureHeight;
        this.oldKey = "down";
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
    this.oldplayerTopLeft = playerTopLeft;
    this.oldplayerBottomRight = playerBottomRight;
    


     // else {
    //     player.setVelocityX(0);
    // }
    
    // if (cursors.up.isDown)
    // {
    //     player.setVelocityY(-160);
    // }
    // else if (cursors.down.isDown)
    // {
    //     player.setVelocityY(160);   
    // } else {
    //     player.setVelocityY(0);
    // }
}

