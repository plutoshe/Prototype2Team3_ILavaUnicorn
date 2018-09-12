
class Background {
    addTextureGroup(texture) {
        var blocks = this.scene.physics.add.group();
        // blocks.x = 0; blocks.y = 0;
        // blocks.setOrigin(0.5, 0.5);
        // blocks.enableBody = true;
        // blocks.physicsBodyType = Phaser.Physics.ARCADE;
        var blocksArr = new2DArray(this.blockWidth, this.blockHeight);
        for (var i = 0; i < this.blockWidth; i++) {
            for (var j = 0; j < this.blockHeight; j++) {
                // if ((i == 3) && (j == 3) && texture == "full") {
                //     console.log("!hhhh");
                //     var block = blocks.create(this.leftTopX + i * this.blockTextureWidth, this.leftTopY + j * this.blockTextureHeight, texture);
                //     // var block = blocks.create(0, 0, texture);
                //     console.log(this.leftTopX + i * this.blockTextureWidth, this.leftTopY + j * this.blockTextureHeight);
                //     block.setOrigin(0, 0);
                //     // block.anchor.setTo(0.5, 0.5);
                //     block.minX = 0;
                //     block.maxX = this.blockTextureWidth;
                //     block.minY = 0;
                //     block.maxY = this.blockTextureHeight;
                //     block.setScale(this.blockTextureWidth / block.width, this.blockTextureHeight / block.height);
                    
                //     block.setCrop(0, 0, 32, 40);
                //     continue;
                // } else {
                //     continue;
                // }
                var block = blocks.create(this.leftTopX + i * this.blockTextureWidth, this.leftTopY + j * this.blockTextureHeight, texture);

                block.setOrigin(0, 0);
                block.minX = 0;
                block.maxX = this.blockTextureWidth;
                block.minY = 0;
                block.maxY = this.blockTextureHeight;
                // block.setScale(heightRatio, widthRatio);
                block.setScale(this.blockTextureWidth / block.width, this.blockTextureHeight / block.height);
                
                block.moves = false;
                blocksArr[i][j] = block;

            }
        }
        // console.log("!", blocksArr[0][0]);
        return [blocks, blocksArr];
    }

    constructor(scene, leftTopX, leftTopY, width, height, blockWidth, blockHeight, blockTexture, mapsStatus) {
        this.leftTopX = leftTopX;
        this.leftTopY = leftTopY;
        this.height = height;
        this.width = width;
        this.texture = blockTexture;
        this.blockHeight = blockHeight;
        this.blockWidth = blockWidth;
        this.blockTextureHeight = height / blockHeight;
        this.blockTextureWidth = width / blockWidth;

        
        this.blockGroups = {};
        this.blocks = {};
        this.scene = scene;
        
        for (var texture in blockTexture){
            var tmp = this.addTextureGroup(blockTexture[texture]);
            this.blockGroups[blockTexture[texture]] = tmp[0];
            this.blocks[blockTexture[texture]] = tmp[1];
        }
        console.log(this.blockGroups, this.blocks);

        
    }
}