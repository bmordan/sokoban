const Phase = require('phaser')
const getBodAnimations = require('./bod_animations')

function preload() {
    this.load.atlasXML('bod', 'sprites.png', 'sprites.xml')
    this.load.image('spritesheet', 'sprites.png')
    this.load.tilemapTiledJSON('map', 'map.json')
}

function create() {
    this.bod = this.physics.add.sprite(100, 100, 'bod')
    this.bod.setCollideWorldBounds(true)
    this.bod.setDepth(1)
    const bodAnimations = getBodAnimations(this)
    bodAnimations.forEach(animation => this.anims.create(animation))
    // staticTileSet
    this.cursors = this.input.keyboard.createCursorKeys()
    
    const map = this.make.tilemap({key: 'map', tileWidth: 64, tileHeight: 64})
    const tileset = map.addTilesetImage('tileset', 'spritesheet')
    const groundLayer = map.createLayer('ground', tileset, 0, 0)
    const wallLayer = map.createLayer('walls', tileset, 0, 0)

    this.physics.add.collider(this.bod, wallLayer)
    wallLayer.setCollisionBetween(2,2)
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
    width: 16 * 64,
    height: 16 * 64,
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