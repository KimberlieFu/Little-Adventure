import PlayerState from './PlayerState.js';

class IdleState extends PlayerState {
    constructor(player) {
        super(player);
        this.frameTimer = 0; 
        this.frameDelay = 15; 
        this.loopFrames = player.animations.idle.loopFrames || 16; 
        this.totalFrames = 16;
        this.player.setAnimation('idle');
    }

    update() {
        if (this.frameTimer >= this.frameDelay) {
            this.player.frame = (this.player.frame + 1) % this.loopFrames;
            this.frameTimer = 0; 
        } else {
            this.frameTimer++; 
        }
    }

    animate() {
        const playerFrameWidth = this.player.image.width / this.totalFrames; 
        const currentFrame = this.player.frame % this.loopFrames;

        this.player.context.drawImage(
            this.player.image,
            currentFrame * playerFrameWidth,
            0, 
            playerFrameWidth,
            this.player.image.height,
            this.player.x - this.player.width / 2,
            this.player.y - this.player.height / 2, 
            this.player.width, 
            this.player.height 
        );
    }
}

export default IdleState;
