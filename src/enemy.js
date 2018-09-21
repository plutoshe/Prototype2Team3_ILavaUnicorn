/* Class that defines enemy movement and AI */
export class Enemy {     

    trim(pos, divider) {
    	return  Math.floor(pos / divider) * divider;
    	Math.floor(this.sprite.x / this.scene.background.blockTextureWidth) * this.background.blockTextureWidth;
    }

    attack()
    {
		// placeholder for future enemy attacking functionality a la Fygars.
    }

    create(config)
    {
    	console.log(config);
        this.scene = config.scene;
        this.manager = config.enemyManager;
		this.backgroundCellWidth = config.backgroundCellWidth;
    	this.backgroundCellHeight = config.backgroundCellHeight;
    	console.log(config.x * this.backgroundCellWidth + config.backgroundCellWidth / 2, 
			config.y * this.backgroundCellHeight + config.backgroundCellHeight / 2, 
			config.enemyTexture);

		this.sprite = this.scene.physics.add.sprite(
			config.x * this.backgroundCellWidth + config.backgroundCellWidth / 2, 
			config.y * this.backgroundCellHeight + config.backgroundCellHeight / 2, 
			config.enemyTexture);
		if (config.isAnimation) {
			this.sprite.play(config.enemyTexture);
		}
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
			moveComplete = this.move(this.oldKey);
			while(!moveComplete && i < move_list.length)
			{
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
				if( this.by <= 0
					|| this.scene.background.getLevelMapGroup(this.bx, this.by - 1) != "empty")
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
				if( this.by >= this.scene.background.blockHeight - 1
					|| this.scene.background.getLevelMapGroup(this.bx, this.by + 1) != "empty")
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
				if( this.bx <= 0
					|| this.scene.background.getLevelMapGroup(this.bx - 1, this.by) != "empty")
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
				if( this.bx >= this.scene.background.blockWidth - 1
					|| this.scene.background.getLevelMapGroup(this.bx + 1, this.by) != "empty")
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

    chase(player)/* "Extremely sophisticated AI" that chases the Player using a ladder of if-statements. */
    {
        var bx = Math.floor(this.sprite.x / this.backgroundCellWidth);
		var by = Math.floor(this.sprite.y / this.backgroundCellHeight);
		var pl_bx = Math.floor(player.sprite.x / this.backgroundCellWidth);
		var pl_by = Math.floor(player.sprite.y / this.backgroundCellHeight);

		var dx = bx - pl_bx;// +ve if enemy is to the right of the player
		var dy = by - pl_by;// +ve if enemy is below the player

		var move_list = [];// a list of possible moves the enemy could make in order of preference. So basically, the enemy first tries to move in the direction of move_list[0], and if it can't then it tries move_list[1], etc.

		// extremely advanced AI
		if( Math.abs(dx) < Math.abs(dy) ) // going up/down is faster
		{
			if(dy > 0) // enemy is below the player, so we need to move upwards
			{
				move_list.push("up");
				if(dx > 0) // enemy is to the right of the player, so we want to move left
				{
					move_list.push("left");
					move_list.push("right");// these two would basically be useless moves, but we still want them to be possible
					move_list.push("down");
				}	
				else
				{
					move_list.push("right");// move right instead
					move_list.push("left");
					move_list.push("down");
				}
			}
			else
			{
				move_list.push("down"); // move down instead
				if(dx > 0)
				{
					move_list.push("left"); // I think you get the gyst by now
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
		else // this handles the reverse: if it's more efficient to move horizontally instead of vertically
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
		var random_prob = 0.2;// this "dumbs down" the AI a little by shuffling the move_list with a random probability. Otherwise, the AI chases down the player pretty aggressively
		if(Math.random() < random_prob)
			shuffle(move_list);
		return move_list;
    }

    runaway(object)
    {
		// placeholder for AI that will run away or try to avoid falling rocks or lava
    }

    ghost()
    {
        // placeholder for "ghost mode", where enemies can ghost through dirt
    }
}
// shuffles the move_list for us
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