import {collisionHandlers} from "./collisionHandlers.js"
import { collide } from "./helper/helper.js";
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
		this.speed = config.speed;
    }

    update()
    {
		var move_list = this.chase(this.scene.player);
		var i = 0;
		var movementDirection = move_list[i];
		var moveComplete = false;
        if (this.oldKey != "") {
	        var bx = Math.floor(this.dstx / this.backgroundCellWidth);
	        var by = Math.floor(this.dsty / this.backgroundCellHeight);
            //collisionHandlers["overlap"]["enemy"]["full_block"](this.sprite, this.scene.background.blocks["full"][bx][by]);
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
		else 
		{
			console.log(move_list);
			while(!moveComplete)
			{
				console.log(move_list[i]);
				moveComplete = this.move(move_list[i]);
				i = i + 1;
			}
		}
	}
	
	move(direction)
	{
		var moveComplete;
		switch(direction)
		{
			case "up":
				if( this.scene.background.levelMap[this.bx][this.by - 1] != 0 
				||  this.by <= 0)
				{
					moveComplete = false;
				}
				else
				{
					this.sprite.setVelocityX(0);
					this.sprite.setVelocityY(-this.speed);
					this.dstx = this.sprite.x;
					this.dsty = this.sprite.y - this.scene.background.blockTextureHeight;
					this.oldKey = "up";
					moveComplete = true;
				}
				break;
			case "down":
				if( this.scene.background.levelMap[this.bx][this.by + 1] != 0 
				||  this.by >= this.scene.background.blockHeight - 1)
				{
					moveComplete = false;
				}
				else
				{
					this.sprite.setVelocityX(0);
					this.sprite.setVelocityY(this.speed);
					this.dstx = this.sprite.x;
					this.dsty = this.sprite.y + this.scene.background.blockTextureHeight;
					this.oldKey = "down";
					moveComplete = true;
				}
				break;
			case "left":
				if( this.scene.background.levelMap[this.bx - 1][this.by] != 0 
				||  this.bx <= 0 )
				{
					moveComplete = false;
				}
				else
				{
					this.sprite.setVelocityY(0);
					this.sprite.setVelocityX(-this.speed);
					this.dstx = this.sprite.x - this.backgroundCellWidth;
					this.dsty = this.sprite.y;
					this.oldKey = "left";
					moveComplete = true;
				}
				break;
			case "right":
				if( this.scene.background.levelMap[this.bx + 1][this.by] != 0
				||  this.bx >= this.scene.background.blockWidth - 1 )
				{
					moveComplete = false;
				}
				else
				{
					this.sprite.setVelocityY(0);
					this.sprite.setVelocityX(this.speed);
					this.dstx = this.sprite.x + this.backgroundCellWidth;
					this.dsty = this.sprite.y;
					this.oldKey = "right";
					moveComplete = true;
				}
				break;
			default:
				moveComplete = false;
		}
		return moveComplete;
	}

    checkBackgroundCollision()
    {

    }

    checkPlayerCollision()
    {

    }

    chase(player)
    {
        var bx = Math.floor(this.sprite.x / this.backgroundCellWidth);
		var by = Math.floor(this.sprite.y / this.backgroundCellHeight);
		var pl_bx = Math.floor(player.sprite.x / this.backgroundCellWidth);
		var pl_by = Math.floor(player.sprite.y / this.backgroundCellHeight);

		var dx = bx - pl_bx;// +ve if enemy is to the right of the player
		var dy = by - pl_by;// +ve if enemy is below the player

		var move_list = [];

		// extremely advanced AI
		if( Math.abs(dx) < Math.abs(dy) ) // going up/down is faster
		{
			if(dy > 0)
			{
				move_list.push("up");
				if(dx > 0)
				{
					move_list.push("left");
					move_list.push("right");
					move_list.push("down");
				}	
				else
				{
					move_list.push("right");
					move_list.push("left");
					move_list.push("down");
				}
			}
			else
			{
				move_list.push("down");
				if(dx > 0)
				{
					move_list.push("left");
					move_list.push("right");
					move_list.push("up");
				}	
				else
				{
					move_list.push("right");
					move_list.push("left");
					move_list.push("up");
				}
			}

		}
		else
		{
			if(dx > 0)
			{
				move_list.push("left");
				if(dy > 0)
				{
					move_list.push("up");
					move_list.push("down");
					move_list.push("right");
				}	
				else
				{
					move_list.push("down");
					move_list.push("up");
					move_list.push("right");
				}
			}
			else
			{
				move_list.push("right");
				if(dy > 0)
				{
					move_list.push("up");
					move_list.push("down");
					move_list.push("right");
				}	
				else
				{
					move_list.push("down");
					move_list.push("up");
					move_list.push("right");
				}
			}

		}
		var random_prob = 0.2;
		if(Math.random() < random_prob)
			shuffle(move_list);
		return move_list;
    }

    runaway(object)
    {

    }

    ghost()
    {
        
    }
}
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }