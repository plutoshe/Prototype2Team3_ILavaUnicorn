import { new2DArray } from "../helper/helper.js"
import { Lava } from "../lava.js"

export class LevelBackground {


    addBlockTextureGroup(blockTexture) {
        var blocks;
        var blocksArr;
        if (blockTexture.group in this.blockGroups) {
            blocks = this.blockGroups[blockTexture.group];
            blocksArr = this.blocks[blockTexture.group];
        } else {
            blocks = this.scene.physics.add.group();
            blocksArr = new2DArray(this.blockWidth, this.blockHeight);
        }
        
        for (var i = 0; i < this.blockWidth; i++) {
            for (var j = 0; j < this.blockHeight; j++) { 
                var v = this.getLevelMapTexture(i, j);
                if (!v) {
                    console.log("no texture exist!");
                }
                if (!blockTexture.createFunction(v)) {                 
                    continue;
                } 
            
                var block = blocks.create(
                    this.leftTopX + i * this.blockTextureWidth + this.blockTextureWidth / 2, 
                    this.leftTopY + j * this.blockTextureHeight + this.blockTextureWidth / 2, 
                    blockTexture.texture);
                if (blockTexture.group == "full") {
                    block.minX = 0;
                    block.maxX = this.blockTextureWidth;
                    block.minY = 0;
                    block.maxY = this.blockTextureHeight;
                }
                block.setScale(this.blockTextureWidth / block.width, this.blockTextureHeight / block.height);
                block.moves = false;
                blocksArr[i][j] = block;
                

            }
        }
        return [blocks, blocksArr];
    }

    addEntityTextureGroup(entityTexture) {
        var blocks;
        var blocksArr;
        var textureColl;
        if (entityTexture.group in this.blockGroups) {
            blocks = this.blockGroups[entityTexture.group];
            blocksArr = this.blocks[entityTexture.group];
            textureColl = this.EntityColl[entityTexture.group];
        } else {
            blocks = this.scene.physics.add.group();
            blocksArr = new2DArray(this.blockWidth, this.blockHeight);
            textureColl = [];
        }
        for (var i in entityTexture.pos) {
            var ex = entityTexture.pos[i][0];
            var ey = entityTexture.pos[i][1];
            if (entityTexture.backgroundBlockGroup && 
                entityTexture.backgroundBlockGroup != "")
                if (entityTexture.backgroundBlockGroup != 
                    this.getLevelMapGroup(ex, ey)) 
                        continue;
            var block = blocks.create(
                    this.leftTopX + ex * this.blockTextureWidth + this.blockTextureWidth / 2, 
                    this.leftTopY + ey * this.blockTextureHeight + this.blockTextureHeight / 2, 
                    entityTexture.texture);
            if (entityTexture.animation) {
                block.play(entityTexture.animation);
            }
            block.setScale(this.blockTextureWidth / block.width, this.blockTextureHeight / block.height);
            blocksArr[ex][ey] = block; 
            this.entityMap[ex][ey] = entityTexture.group;
            textureColl.push([block, ex, ey]);
        }
        return [blocks, blocksArr, textureColl];
    }

    checkStone(x, y) {
        if (this.blocks["rock"][x][y]) {
            this.blocks["rock"][x][y].setTexture('rock_shaking');
            this.blocks["rock"][x][y].anims.play("rock_shaking");
            var current_block = this.blocks["rock"][x][y];
            this.blocks["rock"][x][y].on(
                'animationcomplete', 
                function (animation, frame) {
                    current_block.status = "falling";
                    current_block.setTexture("rock_static");
                    current_block.setVelocityY(160);
                    current_block.removeAllListeners('animationcomplete');
                }
            );
        }
    }

    setlevelMap(x, y, value) {
        this.levelMap[x][y] = value;
        if (value == 0 && y > 0) {
            this.checkStone(x, y - 1);
        }
    }
    getLevelMap(x, y) {
        return this.levelMap[x][y];
    }
    getLevelMapTexture(x, y) {
        return this.blockTextures[this.levelMap[x][y]];
    }
    getLevelMapGroup(x, y) {
        return this.getLevelMapTexture(x,y).group;
    }

    constructor() {
        this.lava = new Lava();
    }

    // config setting
    // scene: background of current scene
    // leftTopX, leftTopY : screen lefttop point
    // width, height : screen size
    // blockWidth, blockHeight: the size of block
    // blockTexture: block texture
    // map: current map status

    create(config) {        
        this.leftTopX = config.leftTopX;
        this.leftTopY = config.leftTopY;
        this.successbackLimit = config.successbackLimit;
        this.height = config.height;
        this.width = config.width;

        this.blockTextures = config.blockTextures;
        this.entityTextures = config.entityTextures;
        this.blockHeight = config.blockHeight;
        this.blockWidth = config.blockWidth;
        this.displayBlockWidth = config.displayBlockWidth
        this.displayBlockHeight = config.displayBlockHeight
        this.blockTextureHeight = config.height / config.displayBlockHeight;
        this.blockTextureWidth = config.width / config.displayBlockWidth;
        this.levelMap = config.levelMap;
        this.entityMap = new2DArray(config.blockWidth, config.blockHeight);
        this.canvasWidth = this.blockWidth * this.blockTextureWidth;
        this.canvasHeight = this.blockHeight * this.blockTextureHeight;
        
        this.blockGroups = {};
        this.blocks = {};
        this.EntityColl = {};
        this.scene = config.scene;

        for (var textureId in this.blockTextures){
            var tmp = this.addBlockTextureGroup(this.blockTextures[textureId]);
            this.blockGroups[this.blockTextures[textureId].group] = tmp[0];
            this.blocks[this.blockTextures[textureId].group] = tmp[1];
        }
        for (var textureId in this.entityTextures) {
            var tmp = this.addEntityTextureGroup(this.entityTextures[textureId]);
            this.blockGroups[this.entityTextures[textureId].group] = tmp[0];
            this.blocks[this.entityTextures[textureId].group] = tmp[1];
            this.EntityColl[this.entityTextures[textureId].group] = tmp[2];
        }
 
        this.stones = this.EntityColl["rock"];
        let lavaConfig = {
            background: this,
            scene: this.scene,
            lavaTileIndex: config.lavaTileIndex,
            spreadSpeed: 5000,
            lavaContent: 3
        }
        this.lava.create(lavaConfig);
        this.remainingKnightText = this.scene.add.text(
            0, 
            0, 
            "Remaining Unicorn:\n 0", 
            { 
                fontFamily: "Arial Black", 
                fontSize: 17, 
                color: "#c51b7d", 
                align: 'left' 
            }).setStroke('#de77ae', 16);
    
        console.log(this.stones);
        
    }

    initialization() {
        for (var i = 0; i < this.blockWidth; i++) {
            for (var j = 1; j < this.blockHeight; j++) {
                if (this.getLevelMapGroup(i, j) == "empty")
                    this.checkStone(i, j - 1);
            }
        }
    }

    update() {
        for (var i in this.stones) {
            if (this.stones[i][0] && this.stones[i][0].status == "falling" ) {
                var stoneTopLeft = this.stones[i][0].getTopLeft();
                var bx = Math.floor(stoneTopLeft.x / this.blockTextureWidth);
                var by = Math.floor(stoneTopLeft.y / this.blockTextureHeight);
                if (by > this.stones[i][2]) {
                    this.entityMap[this.stones[i][1]][this.stones[i][2]] = "empty";
                }   
                if (by >= this.blockHeight - 1 || 
                    this.getLevelMapGroup(bx, by) == "empty" && 
                    this.getLevelMapGroup(bx, by + 1) == "full") {

                    this.stones[i][0].setVelocityY(0);
                    this.stones[i][0].setTexture("rock_broken");
                    var currentStone = this.stones[i][0];
                    currentStone.on(
                        "animationcomplete",
                        function (animation, frame) {
                            currentStone.disableBody(true, true);
                        });
                    this.stones[i][0].anims.play("rock_broken");
                    this.stones[i][0].status = "broken";
                }
            }
        }
        for (var i in this.EntityColl["knight"]) {
            if (this.EntityColl["knight"][i][0].isRescue) {
                this.EntityColl["knight"].splice(i,1);
            }
        }
        this.remainingKnightText.text = 
            "Remaining Unicorn:\n " + 
            this.EntityColl["knight"].length;
    }
        
}
