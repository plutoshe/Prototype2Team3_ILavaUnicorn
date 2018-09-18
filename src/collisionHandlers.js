import {collide, min, max} from "./helper/helper.js"
var collisionHandlers = { 
	"overlap": {
	    "player": {
	    	"player_attack":
	    		function attackRetrieve(player, attack) {
	    			if (attack.canRecycle && 
	    				(attack.vx != 0 && Math.abs(player.x - attack.x) < attack.dispearDistance ||
	    				 attack.vy != 0 && Math.abs(player.y - attack.y) < attack.dispearDistance)) {
	    			attack.setVisible(false);
	    			attack.anims.pause();
	    			attack.setVelocity(0, 0);
	    			attack.x = -10;
	    			attack.y = -10;
	    			}
	    		},
        	"full_block": 
				function overlapForBlock(player, block)
				{
					if (!block) return;
				    let blockTopLeft = block.getTopLeft();
				    let playerTopLeft = player.getTopLeft();
				    let playerBottomRight = player.getBottomRight();
				    let minPlayerX = min(playerTopLeft.x, playerBottomRight.x);
				    let maxPlayerX = max(playerTopLeft.x, playerBottomRight.x);
				    let minPlayerY = min(playerTopLeft.y, playerBottomRight.y);
				    let maxPlayerY = max(playerTopLeft.y, playerBottomRight.y);
				    // if (!collide(player, block)) return;
				    if (minPlayerY == blockTopLeft.y) {
				        if (maxPlayerX - blockTopLeft.x <= block.width &&
				            maxPlayerX - blockTopLeft.x >= block.minX) {
				            block.minX = maxPlayerX - blockTopLeft.x;
				        }
				        if (minPlayerX - blockTopLeft.x >= 0 && 
				            minPlayerX - blockTopLeft.x <= block.maxX) {
				            block.maxX = minPlayerX - blockTopLeft.x;
				        }
				    }
				   
 				    if (minPlayerX == blockTopLeft.x) {
				        if (maxPlayerY - blockTopLeft.y <= block.height && 
				            maxPlayerY - blockTopLeft.y >= block.minY) {
				            block.minY = maxPlayerY - blockTopLeft.y;
				        }
				        if (minPlayerY - blockTopLeft.y >= 0 && 
				            minPlayerY - blockTopLeft.y <= block.maxY) {
				            block.maxY = minPlayerY - blockTopLeft.y;
				        }
				    }
				    block.setCrop(
				        block.minX / block.scaleX, 
				        block.minY / block.scaleY, 
				        (block.maxX - block.minX) / block.scaleX, 
				        (block.maxY - block.minY) / block.scaleY);
				    
				},
			"camera":
				function beyondCamearaLimit(playerClass, camera) {
					var my = camera.midPoint.y;
					
					while (playerClass.dsty + playerClass.backgroundCellHeight / 2 >
					 	my + camera.height / 2 - 
					 	playerClass.cameraBoundry * playerClass.backgroundCellHeight) {
						my += playerClass.backgroundCellHeight;
					}
					while (playerClass.dsty - playerClass.backgroundCellHeight / 2 < 
						my - camera.height / 2 + 
						playerClass.cameraBoundry * playerClass.backgroundCellHeight)
						my -=  playerClass.backgroundCellHeight;
					camera.pan(camera.midPoint.x, my, 50);
				},
			"knight":
				function rescueKnight(player, knight) {
					knight.destroy();
				},
			"enemy":
				function encounterEnemy(player, enemy) {
					player.disableBody(true, true);
				},
		},
		
		"enemy": {
        	"full_block": 
				function overlapForBlock(player, block)
				{
				    let blockTopLeft = block.getTopLeft();
				    let playerTopLeft = player.getTopLeft();
				    let playerBottomRight = player.getBottomRight();
				     //if (!collide(player, block)) return;
				    if (playerTopLeft.y == blockTopLeft.y) {
				        if (playerBottomRight.x - blockTopLeft.x <= block.width &&
				            playerBottomRight.x - blockTopLeft.x >= block.minX) {
				            block.minX = playerBottomRight.x - blockTopLeft.x;
				        }
				        if (playerTopLeft.x - blockTopLeft.x >= 0 && 
				            playerTopLeft.x - blockTopLeft.x <= block.maxX) {
				            block.maxX = playerTopLeft.x - blockTopLeft.x;
						}
				    }
				    
				    if (playerTopLeft.x == blockTopLeft.x) {
				        if (playerBottomRight.y - blockTopLeft.y <= block.height && 
				            playerBottomRight.y - blockTopLeft.y >= block.minY) {
				            block.minY = playerBottomRight.y - blockTopLeft.y;
				        }
				        if (playerTopLeft.y - blockTopLeft.y >= 0 && 
				            playerTopLeft.y - blockTopLeft.y <= block.maxY) {
				            block.maxY = playerTopLeft.y - blockTopLeft.y;
				        }
				    }
				    
				}
        },

    },

    "collision": {
    	"player": {
    		"rock": 
    			function (player, rock) {
    				if (rock.status == "falling") {
	    				player.disableBody(true, true);
	    			}
    			}
		},
		
		"enemy": {
    		"rock": 
    			function (enemy, rock) {
    				if (rock.status == "falling") {
	    				enemy.disableBody(true, true);
	    			}
    			}
    	},
    	"knight": {
    		"rock":
    			function (knight,rock) {
    				if (rock.status == "falling") {
    					knight.disableBody(true, true);
    				}
    			}
    	}
	},

    }

export { collisionHandlers }

