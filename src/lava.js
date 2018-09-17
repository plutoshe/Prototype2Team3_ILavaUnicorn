
export class Lava {     
    constructor()
    {
        this.timer = 0;
    }
    
    create(config)
    {
        this.scene = config.scene;
        
        this.lavaTileIndex = config.lavaTileIndex; // here, it'll be 4 or something
		
        this.spreadSpeed = config.spreadSpeed;

        this.findLavaBlocks();

        //console.log(this.blocks.length);
    }

    update()
    {
		this.floodFill();
	}
	
	floodFill()
	{
        var i;
        for(i = 0; i < this.blocks.length; i++)
        {
            var lavaBlock = this.blocks[i];
            if(this.scene.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] == 0)
                this.scene.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] = this.lavaTileIndex;

            if(this.scene.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] == 0)
                this.scene.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] = this.lavaTileIndex;

            if(this.scene.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] == 0)
                this.scene.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] = this.lavaTileIndex;

            if(this.scene.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] == 0)
                this.scene.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] = this.lavaTileIndex;
        }
	}

    findLavaBlocks()
    {
        this.blocks = [];
        var i,j;

        for(i=0;i < this.scene.background.blockWidth; i++)
            for(j=0;j < this.scene.background.blockHeight; j++)
                if(this.scene.background.levelMap[i][j] == this.lavaTileIndex)
                    this.blocks.push([i,j]);
    }
}