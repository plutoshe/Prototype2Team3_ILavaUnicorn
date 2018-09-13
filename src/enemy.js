import {collisionHandlers} from "./collisionHandlers.js"
//import EasyStar from "./helper/easystar-0.4.3.js"

export class Enemy {     

    trim(pos, divider) {
    	return  Math.floor(pos / divider) * divider;
    	Math.floor(this.sprite.x / this.scene.background.blockTextureWidth) * this.background.blockTextureWidth;
    }

    attack()
    {

    }

    create(config)
    {
        this.scene = config.scene;
		this.backgroundCellWidth = config.backgroundCellWidth;
    	this.backgroundCellHeight = config.backgroundCellHeight;
    	console.log(config.x * this.backgroundCellWidth + config.backgroundCellWidth / 2, 
			config.y * this.backgroundCellHeight + config.backgroundCellHeight / 2, 
			config.playerTexture);

		this.sprite = this.scene.physics.add.sprite(
			config.x * this.backgroundCellWidth + config.backgroundCellWidth / 2, 
			config.y * this.backgroundCellHeight + config.backgroundCellHeight / 2, 
			config.playerTexture);
		// console.log(this.backgroundCellWidth / this.sprite.width, this.backgroundCellHeight / this.sprite.height);

	    this.sprite.setScale(this.backgroundCellWidth / this.sprite.width, this.backgroundCellHeight / this.sprite.height);
	    this.sprite.setCollideWorldBounds(true);
	    
	    
	    this.sprite.x = this.trim(this.sprite.x, this.backgroundCellWidth) + config.backgroundCellWidth / 2;
	    this.sprite.y = this.trim(this.sprite.y, this.backgroundCellHeight) + config.backgroundCellHeight / 2;
	    this.bx = Math.floor(this.sprite.x / this.backgroundCellWidth);
        this.by = Math.floor(this.sprite.y / this.backgroundCellHeight);
        this.oldKey = "";
    }

    update()
    {
        var movementDirection = "left";
        if (this.oldKey != "") {
	        var bx = Math.floor(this.dstx / this.backgroundCellWidth);
	        var by = Math.floor(this.dsty / this.backgroundCellHeight);
            collisionHandlers["overlap"]["player"]["full_block"](this.sprite, this.scene.background.blocks["full"][bx][by]);
            //if(this.scene.physics.collide(this.sprite,this.scene.background.blocks["full"][bx][by]))
            //    return;
	        if (this.oldKey == "left" && this.sprite.x <= this.dstx ||
	            this.oldKey == "right" && this.sprite.x >= this.dstx ||
	            this.oldKey == "up" && this.sprite.y <= this.dsty ||
	            this.oldKey == "down" && this.sprite.y >= this.dsty) {
	            this.oldKey = "";
	            this.sprite.setVelocityY(0);
	            this.sprite.setVelocityX(0);
	            this.sprite.x = this.dstx;
	            this.sprite.y = this.dsty;         
	            this.bx = Math.floor(this.sprite.x / this.backgroundCellWidth);
	            this.by = Math.floor(this.sprite.y / this.backgroundCellHeight);
	        }
	    } 
	    else if (movementDirection == "right" && this.bx < this.scene.background.blockWidth - 1 && this.scene.background.levelMap[this.bx + 1][this.by] != 2)
	    {
	        this.sprite.setVelocityY(0);
	        this.sprite.setVelocityX(160);
	        this.dstx = this.sprite.x + this.backgroundCellWidth;
	        this.dsty = this.sprite.y;
	        this.oldKey = "right";
	    } 
	    else if (movementDirection == "left" && this.bx > 0 && this.scene.background.levelMap[this.bx - 1][this.by] != 2)
	    {
	        this.sprite.setVelocityY(0);
	        this.sprite.setVelocityX(-160);
	        this.dstx = this.sprite.x - this.backgroundCellWidth;
	        this.dsty = this.sprite.y;
	        this.oldKey = "left";
	    } 
	    else if (movementDirection == "up" && this.by > 0 && this.scene.background.levelMap[this.bx][this.by - 1] != 2)
	    {
	        this.sprite.setVelocityX(0);
	        this.sprite.setVelocityY(-160);
	        this.dstx = this.sprite.x;
	        this.dsty = this.sprite.y - this.scene.background.blockTextureHeight;
	        this.oldKey = "up";
	    } else
	    if (movementDirection == "down" && this.by < this.scene.background.blockHeight - 1 && this.scene.background.levelMap[this.bx][this.by + 1] != 2)
	    {
	        this.sprite.setVelocityX(0);
	        this.sprite.setVelocityY(160);
	        this.dstx = this.sprite.x;
	        this.dsty = this.sprite.y + this.scene.background.blockTextureHeight;
	        this.oldKey = "down";
	    } else {
	        this.sprite.setVelocityX(0);
	        this.sprite.setVelocityY(0);
	    }
    }

    checkBackgroundCollision()
    {

    }

    checkPlayerCollision()
    {

    }

    chase(player)
    {
        
    }

    runaway(object)
    {

    }

    ghost()
    {
        
    }
}