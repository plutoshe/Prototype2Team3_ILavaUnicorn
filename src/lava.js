
export class Lava {     
    constructor()
    {
        this.timer = 0;
        this.pastT = 0;
    }
    
    create(config)
    {
        this.background = config.background;
        this.scene = config.scene;
        
        this.lavaTileIndex = config.lavaTileIndex; // here, it'll be 4 or something
		
        this.spreadSpeed = config.spreadSpeed;
        this.d = new Date();

        this.findLavaBlocks();
    }

    update()
    {
        /*if(this.timer > 0)
        {
            var t = this.d.getMilliseconds();
            this.timer = this.timer - (t - this.pastT);
        }
        else*/
        {
            this.timer = this.spreadSpeed;
            this.gravityFill();
            
            // this line is killing performance.
            //this.background.addBlockTextureGroup(this.background.blockTextures[this.lavaTileIndex]);
            //console.log(this.blocks.length);
        }
        this.pastT = this.d.getMilliseconds();
        //console.log(this.timer);
	}
	
	floodFill()
	{
        var i;
        for(i = 0; i < this.blocks.length; i++)
        {
            var lavaBlock = this.blocks[i];
            if(this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] == 0)
            {
                this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] = this.lavaTileIndex;
                this.blocks.push([lavaBlock[0] + 1,lavaBlock[1]]);
            }    

            if(this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] == 0)
                this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] = this.lavaTileIndex;

            if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] == 0)
                this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] = this.lavaTileIndex;

            if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] == 0)
                this.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] = this.lavaTileIndex;
        }
        //console.log(this.background.blockTextures);
    }

    gravityFill()
	{
        var i;
        var didSomething = false;
        for(i = 0; i < this.blocks.length; i++)
        {
            var lavaBlock = this.blocks[i];
            if(this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] == 0)
            {
                this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] = this.lavaTileIndex;
                this.blocks.push([lavaBlock[0] + 1,lavaBlock[1]]);
                didSomething = true;
            }

            if(this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] == 0)
            {
                this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] = this.lavaTileIndex;
                this.blocks.push([lavaBlock[0] - 1,lavaBlock[1]]);
                didSomething = true;
            }
            
            if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] == 0)
            {
                this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] = this.lavaTileIndex;
                this.blocks.push([lavaBlock[0],lavaBlock[1] + 1]);
                didSomething = true;
            }
        }
        if(didSomething)
            this.background.addBlockTextureGroup(this.background.blockTextures[this.lavaTileIndex]);
	}

    findLavaBlocks()
    {
        this.blocks = [];
        var i,j;

        for(i=0;i < this.background.blockWidth; i++)
            for(j=0;j < this.background.blockHeight; j++)
                if(this.background.levelMap[i][j] == this.lavaTileIndex)
                    this.blocks.push([i,j]);
    }
}