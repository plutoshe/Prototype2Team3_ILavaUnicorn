import { new2DArray } from "../helper/helper.js"


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
                if (!blockTexture.createFunction(this.blockTextures[[this.levelMap[i][j]]])) {                 
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
        if (entityTexture.group in this.blockGroups) {
            blocks = this.blockGroups[entityTexture.group];
            blocksArr = this.blocks[entityTexture.group];
        } else {
            blocks = this.scene.physics.add.group();
            blocksArr = new2DArray(this.blockWidth, this.blockHeight);
        }
        for (var i in entityTexture.pos) {
            var ex = entityTexture.pos[i][0];
            var ey = entityTexture.pos[i][1];
            if (!entityTexture.isOK(this.blockTextures[this.levelMap[ex][ey]])) continue;
            var block = blocks.create(
                    this.leftTopX + ex * this.blockTextureWidth + this.blockTextureWidth / 2, 
                    this.leftTopY + ey * this.blockTextureHeight + this.blockTextureHeight / 2, 
                    entityTexture.texture);
            block.setScale(this.blockTextureWidth / block.width, this.blockTextureHeight / block.height);
            blocksArr[ex][ey] = block;  
        }
        return [blocks, blocksArr];
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
    constructor() {}

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
        
        this.blockGroups = {};
        this.blocks = {};
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
        }
 
        this.stones = []
        for (var i = 0; i < this.blockWidth; i++) {
            for (var j = 0; j < this.blockHeight; j++) {
                if (this.blocks["rock"][i][j]) {            
                    this.stones.push([this.blocks["rock"][i][j], i, j]);
                }
            }
        }
        console.log(this.stones);
        
    }

    initialization() {
        for (var i = 0; i < this.blockWidth; i++) {
            for (var j = 1; j < this.blockHeight; j++) {
                if (this.blockTextures[this.levelMap[i][j]].group == "empty")
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
                    this.levelMap[this.stones[i][1]][this.stones[i][2]] = 1;
                }   
                if (by >= this.blockHeight - 1 || this.levelMap[bx][by] == 0 && this.levelMap[bx][by + 1] == 1) {
                    this.stones[i][0].setVelocityY(0);
                    this.stones[i][0].setTexture("rock_broken");
                    var currentStone = this.stones[i][0];
                    currentStone.on(
                        "animationcomplete",
                        function (animation, frame) {
                            console.log("disableBody for rock");
                            currentStone.disableBody(true, true);
                        });
                    this.stones[i][0].anims.play("rock_broken");
                    this.stones[i][0].status = "broken";
                }

            }
        }
    }

}
