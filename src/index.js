const Phase = require('phaser')
const getBodAnimations = require('./bod_animations')

function preload() {
    this.load.atlasXML('bod', 'sprites.png', 'sprites.xml')
    this.load.image('spritesheet', 'sprites.png')
    this.load.tilemapTiledJSON('map', 'map.json')
    this.load.image('crate', 'Crate_Brown.png')
}

function create() {
    const map = this.make.tilemap({key: 'map', tileWidth: 64, tileHeight: 64})
    
    this.cursors = this.input.keyboard.createCursorKeys()

    const spawnpoint = map.findObject('spawn', obj => obj.name === 'spawn')

    this.bod = this.physics.add.sprite(spawnpoint.x, spawnpoint.y, 'bod')
    this.bod.setCollideWorldBounds(true)
    this.bod.setDepth(1)
    const bodAnimations = getBodAnimations(this)
    bodAnimations.forEach(animation => this.anims.create(animation))    

    const tileset = map.addTilesetImage('tileset', 'spritesheet')
    map.createLayer('ground', tileset, 0, 0)
    
    const wallLayer = map.createLayer('walls', tileset, 0, 0)
    this.physics.add.collider(this.bod, wallLayer)
    wallLayer.setCollisionBetween(25,25)

    const crates = map.createFromObjects('crates', {gid: 29})
    crates.forEach(crate => {
        const crateSprite = this.physics.add.sprite(crate.x, crate.y, 'crate')
        this.physics.add.collider(this.bod, crateSprite)
        this.physics.add.collider(crateSprite, wallLayer)
        crateSprite
            .setPushable(true)
            .setCollideWorldBounds(true)
            .setDrag(2000, 2000)
    })
    
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