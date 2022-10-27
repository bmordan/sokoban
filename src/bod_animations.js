function getAnimations(ctx) {
    return [
        {
            key:'right',
            frames: ctx.anims.generateFrameNames('bod', {
                prefix: 'Character',
                suffix: '.png',
                start: 2,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 16,
            repeat: 1
        },
        {
            key:'left',
            frames: ctx.anims.generateFrameNames('bod', {
                prefix: 'Character',
                suffix: '.png',
                frames: [1, 10],
                zeroPad: 1
            }),
            frameRate: 16,
            repeat: 1
        },
        {
            key:'up',
            frames: ctx.anims.generateFrameNames('bod', {
                prefix: 'Character',
                suffix: '.png',
                start: 7,
                end: 9,
                zeroPad: 1
            }),
            frameRate: 16,
            repeat: 1
        },
        {
            key:'down',
            frames: ctx.anims.generateFrameNames('bod', {
                prefix: 'Character',
                suffix: '.png',
                start: 4,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 16,
            repeat: 1
        }
    ]
}

module.exports = getAnimations