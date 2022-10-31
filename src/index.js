const Phase = require('phaser')
const getBodAnimations = require('./bod_animations')

function preload() {
    this.load.atlasXML('bod', 'sprites.png', 'sprites.xml')
}

function create() {
    this.bod = this.physics.add.sprite(100, 100, 'bod')
    this.bod.setCollideWorldBounds(true)
    this.bod.setDepth(1)
    this.cursors = this.input.keyboard.createCursorKeys()
    // character animations
    const bodAnimations = getBodAnimations(this)
    bodAnimations.forEach(animation => this.anims.create(animation))
    // staticTileSet
    const level = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1,31,31,31,31,31,31, 1],
        [1,31,31,31,31,31,31, 1],
        [1, 1, 1, 1,31,31,31, 1],
        [1,31,31,31,31,31,31, 1],
        [1,31,31,31,31,31,31, 1],
        [1,31,31,31,31,31,31, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]        
    ]
    const tileMap = this.make.tilemap({
        data: level,
        tileWidth: 64,
        tileHeight: 64
    })

    const tiles = tileMap.addTilesetImage('bod')
    const layer = tileMap.createStaticLayer(0, tiles, 0, 0)
}

function update() {
    if(this.cursors.left.isDown) {
        this.bod.play('left', true)
        this.bod.setVelocityX(-290)
        this.bod.setVelocityY(0)
    } else if (this.cursors.right.isDown) {
        this.bod.play('right', true)
        this.bod.setVelocityX(290)
        this.bod.setVelocityY(0)
    } else if (this.cursors.up.isDown) {
        this.bod.play('up', true)
        this.bod.setVelocityY(-290)
        this.bod.setVelocityX(0)
    } else if (this.cursors.down.isDown) {
        this.bod.play('down', true)
        this.bod.setVelocityY(290)
        this.bod.setVelocityX(0)
    } else {
        this.bod.setVelocityX(0)
        this.bod.setVelocityY(0)
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: 8 * 64,
    height: 8 * 64,
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