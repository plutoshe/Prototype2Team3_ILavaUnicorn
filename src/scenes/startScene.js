export var startScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function startScene ()
    {
        Phaser.Scene.call(this, { key: 'startScene' });
    },

    preload: function ()
    {
        this.load.image('arrow', 'assets/star.png');
    },

    create: function ()
    {
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);
        this.input.once('pointerdown', function (event) {
            this.scene.start('levelScene');
        }, this);
    },

    update: function (time, delta)
    {
        this.arrow.rotation += 0.01;
    }

});