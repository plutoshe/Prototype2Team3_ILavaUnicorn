import {collide} from "./helper/helper.js"
var collisionHandlers = { 
	"overlap": {
	    "player": {
        	"full_block": 
				function overlapForBlock(player, block)
				{
					if (!block) return;
				    let blockTopLeft = block.getTopLeft();
				    let playerTopLeft = player.getTopLeft();
				    let playerBottomRight = player.getBottomRight();
				    // if (!collide(player, block)) return;
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
				}
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
				    /*block.setCrop(
				        block.minX / block.scaleX, 
				        block.minY / block.scaleY, 
				        (block.maxX - block.minX) / block.scaleX, 
				        (block.maxY - block.minY) / block.scaleY);*/
				    
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
	},

    }

export { collisionHandlers }

