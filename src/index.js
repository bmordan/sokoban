const Phase = require('phaser')
const getBodAnimations = require('./bod_animations')

function preload() {
    this.load.atlasXML('bod', 'sprites.png', 'sprites.xml')
}

function create() {
    this.bod = this.physics.add.sprite(100, 100, 'bod')
    this.bod.setCollideWorldBounds(true)
    const bodAnimations = getBodAnimations(this)
    bodAnimations.forEach(animation => this.anims.create(animation))
    this.cursors = this.input.keyboard.createCursorKeys()
}

function update() {
    if(this.cursors.left.isDown) {
        this.bod.play('left', true)
        this.bod.setVelocityX(-290)
    } else if (this.cursors.right.isDown) {
        this.bod.play('right', true)
        this.bod.setVelocityX(290)
    } else if (this.cursors.up.isDown) {
        this.bod.play('up', true)
        this.bod.setVelocityY(-290)
    } else if (this.cursors.down.isDown) {
        this.bod.play('down', true)
        this.bod.setVelocityY(290)
    } else {
        this.bod.setVelocityX(0)
        this.bod.setVelocityY(0)
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: 900,
    height: 250,
    backgroundColor: '#FFF',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: { preload, create, update }
})