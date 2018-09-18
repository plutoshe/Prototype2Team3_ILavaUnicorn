
export class Lava {     
    constructor()
    {
        
    }
    
    create(config)
    {
        this.background = config.background;
        this.scene = config.scene;
        
        this.lavaTileIndex = config.lavaTileIndex; // here, it'll be 4 or something
		
        this.spreadSpeed = config.spreadSpeed;
        this.lavaContent = 3;
        //this.timer = new Phaser.Timer();
        this.d = new Date();
        console.log(this.scene.time);
        this.scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: this.update,
            callbackScope: this,
            args: this
        });
        this.lavaTexture = this.background.blockTextures[this.lavaTileIndex];
        var tmp = this.background.addBlockTextureGroup(
            this.lavaTexture);
        this.blocksGroup = tmp[0];
        this.blocksArr = tmp[1];
        this.blocks = []
        for (var i = 0; i < this.background.blockWidth; i++) {
            for (var j = 0; j < this.background.blockHeight; j++) {
                if (this.blocksArr[i][j]) {         
                    this.blocks.push([i, j]);
                }
            }
        }
    }


    addNewLavaBlock(i, j) {
        var newBlock = this.blocksGroup.create(
                    this.background.leftTopX + i * this.background.blockTextureWidth + this.background.blockTextureWidth / 2, 
                    this.background.leftTopY + j * this.background.blockTextureHeight + this.background.blockTextureHeight / 2, 
                    this.lavaTexture.texture);
        newBlock.setScale(this.background.blockTextureWidth / newBlock.width, 
                          this.background.blockTextureHeight / newBlock.height);
        newBlock.moves = false;
        this.blocksArr[i][j] = newBlock;
        this.blocks.push([i,j]);
    }

    update()
    {
        //this.gravityFill();
        this.floodFill();
	}
	
	floodFill()
	{
        var floodFillDirectionArr = [[1,0],[-1,0],[0,1],[0,-1]];
        var i;
        var didSomething = false;
        //console.log(this.blocks);
        var count = this.blocks.length;
        for(i = 0; i < count; i++)
        {
            var lavaBlock = this.blocks[i];
            for (var j in floodFillDirectionArr) {
                var nx = lavaBlock[0] + floodFillDirectionArr[j][0];
                var ny = lavaBlock[1] + floodFillDirectionArr[j][1];
                if (nx >= 0 && nx < this.background.blockWidth &&
                    ny >= 0 && ny < this.background.blockHeight &&
                    !this.checkTupleInArray(nx, ny) && this.background.levelMap[nx][ny] == 0)
                    this.addNewLavaBlock(nx,ny);
            }
        }
    }

    gravityFill()
	{
        var floodFillDirectionArr = [[1,0],[-1,0],[0,1]];
        var i;
        var didSomething = false;
        console.log(this.blocks);
        var count = this.blocks.length;
        for(i = 0; i < count; i++)
        {
            var lavaBlock = this.blocks[i];
            for (var j in floodFillDirectionArr) {
                var nx = lavaBlock[0] + floodFillDirectionArr[j][0];
                var ny = lavaBlock[1] + floodFillDirectionArr[j][1];
                if (nx >= 0 && nx < this.background.blockWidth &&
                    ny >= 0 && ny < this.background.blockHeight &&
                    !this.checkTupleInArray(nx, ny) && this.background.levelMap[nx][ny] == 0)
                    this.addNewLavaBlock(nx,ny);
            }
        }
	}

    compareTuples(a1,a2)
    {
        if(a1[0] != a2[0])
            return false;
        if(a1[1] != a2[1])
            return false;
        return true;
    }

    checkTupleInArray(x,y)
    {
        if (this.blocksArr[x][y]) return true;
       
        return false;
    }

}


var update = function(lava)
{
    lava.gravityFill();
}
