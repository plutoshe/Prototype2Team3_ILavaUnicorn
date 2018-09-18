
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

        this.findLavaBlocks();
    }

    update()
    {
        //this.gravityFill();
        this.floodFill();
	}
	
	floodFill()
	{
        var i;
        var didSomething = false;
        //console.log(this.blocks);
        var count = this.blocks.length;
        for(i = 0; i < count; i++)
        {
            var lavaBlock = this.blocks[i];
            if(lavaBlock[0]+1 < this.background.blockWidth)
                if(this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] == 0)
                {
                    this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] = this.lavaTileIndex;
                    if(!checkTupleInArray(this.blocks,[lavaBlock[0] + 1,lavaBlock[1]]))
                    {
                        this.blocks.push([lavaBlock[0] + 1,lavaBlock[1]]);
                        didSomething = true;
                    }
                    //console.log(this.blocks);
                }
            if(lavaBlock[0] > 0)
                if(this.background.levelMap [ lavaBlock[0] - 1 ] [ lavaBlock[1] ] == 0)
                {
                    this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] = this.lavaTileIndex;
                    if(!checkTupleInArray(this.blocks,[lavaBlock[0] - 1,lavaBlock[1]]))
                    {
                        this.blocks.push([lavaBlock[0] - 1,lavaBlock[1]]);
                        didSomething = true;
                    }
                    //console.log(this.blocks);
                }
            if(lavaBlock[1] > 0)
                if(this.background.levelMap [ lavaBlock[0] ] [ lavaBlock[1] - 1 ] == 0)
                {
                    this.background.levelMap[lavaBlock[0]][lavaBlock[1] - 1] = this.lavaTileIndex;
                    if(!checkTupleInArray(this.blocks,[lavaBlock[0],lavaBlock[1] - 1]))
                    {
                        this.blocks.push([lavaBlock[0],lavaBlock[1] - 1 ]);
                        didSomething = true;
                    }
                    //console.log(this.blocks);
                }
            if(lavaBlock[1]+1 < this.background.blockHeight)
                if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] == 0)
                {
                    this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] = this.lavaTileIndex;
                    if(!checkTupleInArray(this.blocks,[lavaBlock[0],lavaBlock[1] + 1]))
                    {
                        this.blocks.push([lavaBlock[0],lavaBlock[1] + 1]);
                        didSomething = true;
                    }
                    //console.log(this.blocks);
                }
        }
        if(didSomething)
        {
            this.background.addBlockTextureGroup(this.background.blockTextures[this.lavaTileIndex]);
            //addTexture(this.background.blockTextures[this.lavaTileIndex], this.background, this.blocks);
        }    
    }

    gravityFill()
	{
        var i;
        var didSomething = false;
        console.log(this.blocks);
        var count = this.blocks.length;
        for(i = 0; i < count; i++)
        {
            var lavaBlock = this.blocks[i];
            if(lavaBlock[0]+1 < this.background.blockWidth)
                if(this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] == 0)
                {
                    this.background.levelMap[lavaBlock[0] + 1][lavaBlock[1]] = this.lavaTileIndex;
                    if(!checkTupleInArray(this.blocks,[lavaBlock[0] + 1,lavaBlock[1]]))
                    {
                        this.blocks.push([lavaBlock[0] + 1,lavaBlock[1]]);
                        didSomething = true;
                    }
                    console.log(this.blocks);
                }
            if(lavaBlock[0] > 0)
                if(this.background.levelMap [ lavaBlock[0] - 1 ] [ lavaBlock[1] ] == 0)
                {
                    this.background.levelMap[lavaBlock[0] - 1][lavaBlock[1]] = this.lavaTileIndex;
                    if(!checkTupleInArray(this.blocks,[lavaBlock[0] - 1,lavaBlock[1]]))
                    {
                        this.blocks.push([lavaBlock[0] - 1,lavaBlock[1]]);
                        didSomething = true;
                    }
                    console.log(this.blocks);
                }
            if(lavaBlock[1]+1 < this.background.blockHeight)
                if(this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] == 0)
                {
                    this.background.levelMap[lavaBlock[0]][lavaBlock[1] + 1] = this.lavaTileIndex;
                    if(!checkTupleInArray(this.blocks,[lavaBlock[0],lavaBlock[1] + 1]))
                    {
                        this.blocks.push([lavaBlock[0],lavaBlock[1] + 1]);
                        didSomething = true;
                    }
                    console.log(this.blocks);
                }
        }
        if(didSomething)
        {
            this.background.addBlockTextureGroup(this.background.blockTextures[this.lavaTileIndex]);
        }    
	}

    findLavaBlocks()
    {
        this.blocks = [];
        var i,j;

        for(i=0;i < this.background.blockWidth; i++)
            for(j=0;j < this.background.blockHeight; j++)
                if(this.background.levelMap[i][j] == this.lavaTileIndex)
                    if(!checkTupleInArray(this.blocks,[i,j]))
                    {
                        this.blocks.push([i,j]);
                        console.log("Lava Block at " + i + ", "+ j);
                    }
    }
}

function compareTuples(a1,a2)
{
    if(a1[0] != a2[0])
        return false;
    if(a1[1] != a2[1])
        return false;
    return true;
}

function checkTupleInArray(arr,t)
{
    var i;
    for(i = 0; i < arr.length; i++)
    {
        var x = arr[i];
        if(compareTuples(x,t))
        {
            //console.log("duplicate");
            return true;
        }
            
    }
    return false;
}

var update = function(lava)
{
    lava.gravityFill();
}

var addTexture = function(blockTexture,background,lavaBlocks)
{
    var i;
    for(i=0; i < lavaBlocks.length; i++)    
        blockTexture.createFunction(
                background.getLevelMapTexture(lavaBlocks[i][0], lavaBlocks[i][1]));
}