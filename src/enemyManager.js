import { Enemy } from "./enemy.js"

export class EnemyManager {
	constructor() {}

	create(config) {
		this.scene = config.scene;
		this.enemyGroup = this.scene.physics.add.group();
		this.enemyArr = [];
		for (var i in config.enemies) {
			var newEnemy = new Enemy();
			let enemyConfig = {
				x : config.enemies[i].x,
				y : config.enemies[i].y,
				scene: config.scene,
				
				backgroundCellWidth: config.backgroundCellWidth,
				backgroundCellHeight: config.backgroundCellHeight,

				enemyTexture: config.defaultTexture,
	            speed: config.defaultSpeed,
	            isAnimation: config.defaultIsAnimation,

			}
			newEnemy.create(enemyConfig);
			this.enemyGroup.add(newEnemy.sprite);
			this.enemyArr.push(newEnemy);
		}
	}
	update() {
		for (var i in this.enemyArr) {
			this.enemyArr[i].update();
		}
	}
}