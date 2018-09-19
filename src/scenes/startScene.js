import {levelScene} from "./levelScene.js"
export var startScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function startScene ()
    {
        Phaser.Scene.call(this, { key: 'startScene' });
    },

    preload: function ()
    {
        this.load.image('start', 'assets/start.png');
    },

    create: function ()
    {
        this.background = this.add.sprite(this.game.config.width / 2, 
                                          this.game.config.height / 2, 
                                          'start');
        this.background.setScale(this.game.config.width / this.background.width, 
            this.game.config.height / this.background.height);
        this.input.once('pointerdown', function (event) {
            // this.scene.start('levelScene');
            // console.log(this.constructor.name);
            // this.game.scene.remove('levelScene');
            // this.game.scene.add('levelScene', new levelScene(), true);

            this.scene.launch('levelScene');
        }, this);
    },

    update: function (time, delta)
    {
    }

});