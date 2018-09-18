import {collisionHandlers} from "../collisionHandlers.js"
export class Player {

	// config setting
    // scene: background of current scene
    // x, y : screen lefttop point
    // width, height : screen size
    // blockWidth, blockHeight: the size of block
    // blockTexture: block texture
    // mapsStatus: current map status
    trim(pos, divider) {
    	return  Math.floor(pos / divider) * divider;
    	Math.floor(this.sprite.x / this.scene.background.blockTextureWidth) * this.background.blockTextureWidth;
    }

	create(config) {
		this.scene = config.scene;
		this.backgroundCellWidth = config.backgroundCellWidth;
    	this.backgroundCellHeight = config.backgroundCellHeight;
    	this.cameraBoundry = config.cameraBoundry;
    	
    	// this.add.sprite(400, y, 'gems').play(key);

		this.sprite = this.scene.physics.add.sprite(
			config.x * this.backgroundCellWidth + config.backgroundCellWidth / 2, 
			config.y * this.backgroundCellHeight + config.backgroundCellHeight / 2, 
			"player_idle");
		this.sprite.play("player_idle");     
		this.attack = this.scene.physics.add.sprite(
			-1,-1,"player_attack");
		
		this.attack.setScale(this.backgroundCellWidth / this.attack.width, this.backgroundCellHeight / this.attack.height);
		this.attack.setVisible(false);
		this.attack.distanceX = 3 * this.backgroundCellWidth;
		this.attack.distanceY = 3 * this.backgroundCellHeight;
		this.attack.boundryMinX = this.backgroundCellWidth / 4;
    	this.attack.boundryMaxX = this.scene.background.canvasWidth - this.backgroundCellWidth / 4;
    	this.attack.boundryMinY = this.backgroundCellHeight / 4;
    	this.attack.boundryMaxY = this.scene.background.canvasHeight - this.backgroundCellHeight / 4;
    	this.attack.dispearDistance = this.backgroundCellHeight / 8;
    	
	    this.sprite.setScale(this.backgroundCellWidth / this.sprite.width, this.backgroundCellHeight / this.sprite.height);
	    // this.sprite.setCollideWorldBounds(true);
	    
	    
	    this.sprite.x = this.trim(this.sprite.x, this.backgroundCellWidth) + config.backgroundCellWidth / 2;
	    this.sprite.y = this.trim(this.sprite.y, this.backgroundCellHeight) + config.backgroundCellHeight / 2;
	    this.bx = Math.floor(this.sprite.x / this.backgroundCellWidth);
	    this.by = Math.floor(this.sprite.y / this.backgroundCellHeight);
    	this.oldKey = "";
	}

	initialization() {
		this.dsty = this.sprite.y;
		collisionHandlers["overlap"]["player"]["camera"](this, this.scene.cameras.main);
	}

	couldGo(bx, by) {
		if (bx >= this.scene.background.blockWidth ||
			by >= this.scene.background.blockHeight ||
			bx < 0 || by < 0 ||
		    (this.scene.background.entityMap[bx][by] && 
		    this.scene.background.entityMap[bx][by] == "rock"))
			return false;
		return true;
	}

	couldGoAttack(x, y, vx, vy) {
		
		let bx = Math.floor((x + this.attack.dispearDistance) / this.backgroundCellWidth);// + (vx > 0) - (vx < 0);
	    let by = Math.floor((y + this.attack.dispearDistance) / this.backgroundCellHeight);// + (vy > 0) - (vy < 0);
	    
	    if (bx >= this.scene.background.blockWidth ||
			by >= this.scene.background.blockHeight ||
			bx < 0 || by < 0)
			return false;
    	return this.scene.background.getLevelMapGroup(bx, by) == "empty";
	}
    
	update() {
		var playerTopLeft = this.sprite.getTopLeft();
    	var playerBottomRight = this.sprite.getBottomRight();
    	if (this.oldKey == "") {
	    	if (this.scene.cursors['attack'].isDown && !this.attack.visible) {
	    		this.attack.setVisible(true);
	    		this.attack.ox = this.sprite.x;
	    		this.attack.oy = this.sprite.y;
	    		this.attack.x = this.sprite.x;
	    		this.attack.y = this.sprite.y;
	    		this.attack.angle = this.sprite.angle;
	    		this.attack.flipX = this.sprite.flipX;
	    		this.attack.play('player_attack');
	    		this.attack.vx = 0;
	    		this.attack.vy = 0;
	    		this.attack.canRecycle = false;
	    		if (this.attack.angle != 0) this.attack.vy = 180; else this.attack.vx = 180;
	    		if (!this.attack.flipX) {
	    			this.attack.vy = -this.attack.vy;
	    			this.attack.vx = -this.attack.vx;
	    		}
	    		this.attack.setVelocity(this.attack.vx, this.attack.vy);
	    	}
    	}
    	if (this.attack.visible && 
    		(Math.abs(this.attack.ox - this.attack.x) > this.attack.distanceX || 
    		Math.abs(this.attack.oy - this.attack.y) > this.attack.distanceY || 
    		this.attack.x < this.attack.boundryMinX || 
    		this.attack.x > this.attack.boundryMaxX || 
    		this.attack.y < this.attack.boundryMinY || 
    		this.attack.y > this.attack.boundryMaxY || 
    		!this.couldGoAttack(this.attack.x, this.attack.y, this.attack.vx, this.attack.vy))) {
    		this.attack.canRecycle = true;
    		this.attack.vx = -this.attack.vx;
    		this.attack.vy = -this.attack.vy;
    		this.attack.setVelocity(this.attack.vx, this.attack.vy);
    	} 

	    if (this.oldKey != "") {
	        var bx = Math.floor(this.dstx / this.backgroundCellWidth);
	        var by = Math.floor(this.dsty / this.backgroundCellHeight);
	        collisionHandlers["overlap"]["player"]["full_block"](this.sprite, this.scene.background.blocks["full"][bx][by]);
	        collisionHandlers["overlap"]["player"]["camera"](this, this.scene.cameras.main);
	        if (this.oldKey == "left" && this.sprite.x <= this.dstx ||
	            this.oldKey == "right" && this.sprite.x >= this.dstx ||
	            this.oldKey == "up" && this.sprite.y <= this.dsty ||
	            this.oldKey == "down" && this.sprite.y >= this.dsty) {
	            this.oldKey = "";
	            this.sprite.setVelocityY(0);
	            this.sprite.setVelocityX(0);
	            this.sprite.x = this.dstx;
	            this.sprite.y = this.dsty;   
	            this.sprite.setTexture("player_idle"); 
	            this.sprite.play("player_idle");     
	            this.bx = Math.floor(this.sprite.x / this.backgroundCellWidth);
				this.by = Math.floor(this.sprite.y / this.backgroundCellHeight);
				if ( this.scene.background.blocks["full"][bx][by] != null) 
	            	this.scene.background.blocks["full"][bx][by].setVisible(false);
	            this.scene.background.setlevelMap(bx, by, 0);

	        }
	    } 
	    else if (this.scene.cursors['right'].isDown && 
	    		 this.couldGo(this.bx + 1, this.by))

	    {
	        this.sprite.setVelocityY(0);
	        this.sprite.setVelocityX(160);
	        this.dstx = this.sprite.x + this.backgroundCellWidth;
	        this.dsty = this.sprite.y;
	        this.oldKey = "right";
	        this.sprite.angle = 0;
	        this.sprite.flipX = true;
	        this.sprite.setTexture("player_move");
	        this.sprite.play("player_move");
	    } 
	    else if (this.scene.cursors['left'].isDown && 
	    	  	 this.couldGo(this.bx - 1, this.by))
	    {
	        this.sprite.setVelocityY(0);
	        this.sprite.setVelocityX(-160);
	        this.dstx = this.sprite.x - this.backgroundCellWidth;
	        this.dsty = this.sprite.y;
	        this.oldKey = "left";
	        this.sprite.angle = 0;
	        this.sprite.flipX = false;
	        this.sprite.setTexture("player_move");
	        this.sprite.play("player_move");
	    } 
	    else if (this.scene.cursors['up'].isDown && 
	    		 this.couldGo(this.bx, this.by - 1))
	    {
	        this.sprite.setVelocityX(0);
	        this.sprite.setVelocityY(-160);
	        this.dstx = this.sprite.x;
	        this.dsty = this.sprite.y - this.scene.background.blockTextureHeight;
	        this.oldKey = "up";
	        this.sprite.angle = 90;
	        this.sprite.flipX = false;
	        this.sprite.setTexture("player_move");
	        this.sprite.play("player_move");
	    } else
	    if (this.scene.cursors['down'].isDown && 
	    	this.couldGo(this.bx, this.by + 1))
	    {
	        this.sprite.setVelocityX(0);
	        this.sprite.setVelocityY(160);
	        this.dstx = this.sprite.x;
	        this.dsty = this.sprite.y + this.scene.background.blockTextureHeight;
	        this.oldKey = "down";
	        this.sprite.angle = 90;
	        this.sprite.flipX = true;
	        this.sprite.setTexture("player_move");
	        this.sprite.play("player_move");
	    } else {
	        this.sprite.setVelocityX(0);
	        this.sprite.setVelocityY(0);
	        this.sprite.setTexture("player_idle");
	        this.sprite.play("player_idle");
	    }
	}

}
