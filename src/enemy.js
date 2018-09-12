class Enemy {
    constructor(scene, game, x, y, width, height, texture) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.texture = texture;
        this.ghostmode = false;

        this.scene = scene;
        this.game = game;        
    }

    attack()
    {

    }

    create()
    {
        Phaser.Sprite.call(this, game, x, y, this.texture);
        scene.physics.enable(this, Phaser.Physics.ARCADE);
        this.collideWorldBounds = true;
        this.enableBody = true;
        //this.animations.add('right', [0, 1, 2, 3, 4], 5, true);
        //sthis.animations.add('left', [5, 6, 7, 8, 9], 5, true);
        this.body.gravity.y = 800;
        this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
        this.body.bounce.x = 1;
        this.body.collideWorldBounds = true;
        this.body.velocity.x = 80;
    }

    update()
    {
        this.game.physics.arcade.collide(this, background, function (enemy, background) {
            
            let backgroundBlockX = enemy.x/background.blockWidth;
            let backgroundBlockY = enemy.y/background.blockHeight;
            if (enemy.body.velocity.x > 0 && this.background.mapstatus[backgroundBlockX,backgroundBlockY] == 'full') {
                // change directions here. 
            }
            /*if (slime.body.velocity.x > 0) {
                slime.animations.play('right');
            } else {
                slime.animations.play('left');
            }*/
        });
     
        this.game.physics.arcade.collide(this, slimes, function (slime, slimes) {
            slime.body.velocity.x *= -1;
        });
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