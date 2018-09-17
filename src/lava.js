
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

        this.findLavaBlocks();
    }

    update()
    {
        this.floodFill();
        this.findLavaBlocks()
        console.log(this.blocks.length);
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
                this.background.blocks["full_red"][lavaBlock[0]][lavaBlock[1]].setTexture("full_red");
            }    

            if(this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] == 0)
                this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] = this.lavaTileIndex;

            if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] == 0)
                this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] = this.lavaTileIndex;

            if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] == 0)
                this.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] = this.lavaTileIndex;
        }
    }

    gravityFill()
	{
        var i;
        for(i = 0; i < this.blocks.length; i++)
        {
            var lavaBlock = this.blocks[i];
            if(this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] == 0)
                this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] = this.lavaTileIndex;

            if(this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] == 0)
                this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] = this.lavaTileIndex;

            if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] == 0)
                this.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] = this.lavaTileIndex;
        }
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