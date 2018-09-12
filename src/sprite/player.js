import {collisionHandlers} from "../collisionHandlers.js"
//import {LevelBackground} from "./level_background.js"
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
    	console.log(config.x * this.backgroundCellWidth, 
			config.y * this.backgroundCellHeight);
		this.sprite = this.scene.physics.add.sprite(
			config.x * this.backgroundCellWidth + config.backgroundCellWidth / 2, 
			config.y * this.backgroundCellHeight + config.backgroundCellHeight / 2, 
			config.playerTexture);
		console.log(this.backgroundCellWidth / this.sprite.width, this.backgroundCellHeight / this.sprite.height);
	    this.sprite.setScale(this.backgroundCellWidth / this.sprite.width, this.backgroundCellHeight / this.sprite.height);
	    this.sprite.setCollideWorldBounds(true);
	    //this.sprite.x = this.trim(this.sprite.x, this.backgroundCellWidth);
	    //this.sprite.y = this.trim(this.sprite.y, this.backgroundCellHeight);
	    this.bx = Math.floor(this.sprite.x / this.backgroundCellWidth);
	    this.by = Math.floor(this.sprite.y / this.backgroundCellHeight);
    	this.oldKey = "";
	}
    
	update() {

		var playerTopLeft = this.sprite.getTopLeft();
    	var playerBottomRight = this.sprite.getBottomRight();
	    if (this.oldKey != "") {
	        var bx = Math.floor(this.dstx / this.backgroundCellWidth);
	        var by = Math.floor(this.dsty / this.backgroundCellHeight);

	        collisionHandlers["player"]["full_block"](this.sprite, this.scene.background.blocks["full"][bx][by]);
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
	            this.scene.background.blocks["full"][bx][by].setVisible(false);
	            this.scene.background.setlevelMap(bx, by, 0);

	        }
	    } 
	    else if (this.scene.cursors['right'].isDown && this.bx < this.scene.background.blockWidth - 1 && this.scene.background.levelMap[this.bx + 1][this.by] != 2)
	    {
	        this.sprite.setVelocityY(0);
	        this.sprite.setVelocityX(160);
	        this.dstx = this.sprite.x + this.backgroundCellWidth;
	        this.dsty = this.sprite.y;
	        this.oldKey = "right";
	    } 
	    else if (this.scene.cursors['left'].isDown && this.bx > 0 && this.scene.background.levelMap[this.bx - 1][this.by] != 2)
	    {
	        this.sprite.setVelocityY(0);
	        this.sprite.setVelocityX(-160);
	        this.dstx = this.sprite.x - this.backgroundCellWidth;
	        this.dsty = this.sprite.y;
	        this.oldKey = "left";
	    } 
	    else if (this.scene.cursors['up'].isDown && this.by > 0 && this.scene.background.levelMap[this.bx][this.by - 1] != 2)
	    {
	        this.sprite.setVelocityX(0);
	        this.sprite.setVelocityY(-160);
	        this.dstx = this.sprite.x;
	        this.dsty = this.sprite.y - this.scene.background.blockTextureHeight;
	        this.oldKey = "up";
	    } else
	    if (this.scene.cursors['down'].isDown && this.by < this.scene.background.blockHeight - 1 && this.scene.background.levelMap[this.bx][this.by + 1] != 2)
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

}
