const Phase = require('phaser')
const getBodAnimations = require('./bod_animations')

const targetsPlaced = []
const completedMessage = []

function preload() {
    this.load.atlasXML('bod', 'sprites.png', 'sprites.xml')
    this.load.image('spritesheet', 'sprites.png')
    this.load.tilemapTiledJSON('map', 'map.json')
    this.load.image('crate', 'Crate_Brown.png')
    this.load.image('placedCrate', 'Crate_Yellow.png')
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
        .map((crate, i) => {
            this.physics.world.enable(crate)
            const crateSprite = this.physics.add.sprite(crate.x, crate.y, 'crate')
            
            return crateSprite
                .setDepth(1)
                .setPushable(true)
                .setCollideWorldBounds(true)
                .setDrag(2000, 2000)
                .setName(`crate_${i+1}`)
        })
    
    crates.forEach(crate => {
        this.physics.add.collider(this.bod,  crate, null, null, this)
        this.physics.add.collider(wallLayer, crate, null, null, this)
        this.physics.add.collider(crates,    crate, null, null, this)
    })

    map.createLayer('targets', tileset, 0, 0)
    map.createFromObjects('targets', {gid: 28})
        .map(target => {
            this.physics.world.enable(target)
            this.physics.add.overlap(target, crates, onTargetHit.bind(this))
        })
    
}

function onTargetHit(target, crate) {
    const touching = [
        crate.body.touching.up,
        crate.body.touching.down,
        crate.body.touching.left,
        crate.body.touching.right
    ].some(contacts => contacts)
    
    const nextTarget = `target_${targetsPlaced.length + 1}`

    if (touching && target.name === nextTarget) {
        const placed = targetsPlaced.find(_crate => _crate.name === crate.name)
        
        if(!placed) {
            this.tweens.add({
                targets: crate,
                x: target.x,
                y: target.y,
                duration: 300,
                ease: 'Power2',
                delay: 200
            })
            crate.setPushable(false)
            crate.setTexture('placedCrate')
            targetsPlaced.push(crate)
        }
    }
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
    if (!completedMessage.length) {
        this.add.text(1 * 64, 3 * 64, "LEVEL COMPLETE!", { 
            align: 'center',
            fontSize: '44px',
            color: 'rgba(221, 190, 67, 1)'
        })
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