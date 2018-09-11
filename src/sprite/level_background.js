import { new2DArray } from "../helper/helper.js"


export class LevelBackground {
    addTextureGroup(texture) {
        var blocks = this.scene.physics.add.group();
        var blocksArr = new2DArray(this.blockWidth, this.blockHeight);
        for (var i = 0; i < this.blockWidth; i++) {
            for (var j = 0; j < this.blockHeight; j++) {
                
                
                if (texture == "rock_static" && this.texture[this.levelMap[i][j]] != "rock_static") {
                    continue;
                } 

                var block = blocks.create(this.leftTopX + i * this.blockTextureWidth, this.leftTopY + j * this.blockTextureHeight, texture);

                block.setOrigin(0, 0);
                block.minX = 0;
                block.maxX = this.blockTextureWidth;
                block.minY = 0;
                block.maxY = this.blockTextureHeight;
                // block.setScale(heightRatio, widthRatio);
                block.setScale(this.blockTextureWidth / block.width, this.blockTextureHeight / block.height);
                
                block.moves = false;
                if (texture == "full" && this.texture[this.levelMap[i][j]] == "empty") {
                    block.setVisible(false);
                }
                blocksArr[i][j] = block;
                

            }
        }
        // console.log("!", blocksArr[0][0]);
        return [blocks, blocksArr];
    }

    rockShakingDone(animation, frame) {
        console.log("done");
    }
    

    checkStone(x, y) {
        if (this.levelMap[x][y] == 2) {
            this.blocks["rock_static"][x][y].setTexture('rock_shaking');
            this.blocks["rock_static"][x][y].anims.play("rock_shaking");
            this.blocks["rock_static"][x][y].on('animationcomplete', this.rockShakingDone);
        }
    }

    setlevelMap(x, y, value) {
        if (value = 0 && y > 0) {
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
        this.texture = config.blockTexture;
        this.blockHeight = config.blockHeight;
        this.blockWidth = config.blockWidth;
        this.blockTextureHeight = config.height / config.blockHeight;
        this.blockTextureWidth = config.width / config.blockWidth;
        this.levelMap = config.levelMap;
        
        this.blockGroups = {};
        this.blocks = {};
        this.scene = config.scene;
        
        for (var textureId in this.texture){
            var tmp = this.addTextureGroup(this.texture[textureId]);
            this.blockGroups[this.texture[textureId]] = tmp[0];
            this.blocks[this.texture[textureId]] = tmp[1];
        }
        for (var i = 0; i < this.blockWidth; i++) {
            for (var j = 1; j < this.blockHeight; j++) {
                if (this.levelMap[i][j] == 0) {
                    this.checkStone(i, j - 1);
                }
            }
        }
    }

}
