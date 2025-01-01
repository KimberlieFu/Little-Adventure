import PlayerState from './PlayerState.js';

class WalkingState extends PlayerState {
    constructor(player) {
        super(player);
        this.frameTimer = 0;
        this.frameDelay = 5;
        this.loopFrames = player.animations.down.loopFrames || 16;
        this.totalFrames = 16;
        this.player.direction = this.getAnimationDirection();
        this.player.setAnimation(this.player.direction);
    }

    getAnimationDirection() {
        const keys = this.player.movementStrategy.keys;  // Access keys from movementStrategy
        let direction = 'down';

        if (keys.w && keys.d) direction = 'up-right';
        else if (keys.w && keys.a) direction = 'up-left';
        else if (keys.s && keys.d) direction = 'down-right';
        else if (keys.s && keys.a) direction = 'down-left';
        else if (keys.w) direction = 'up';
        else if (keys.s) direction = 'down';
        else if (keys.a) direction = 'left';
        else if (keys.d) direction = 'right';

        return direction;
    }

    update() {
        // Handle frame update and check if direction has changed
        if (this.frameTimer >= this.frameDelay) {
            this.player.frame = (this.player.frame + 1) % this.loopFrames;
            this.frameTimer = 0;
        } else {
            this.frameTimer++;
        }

        // Check if the animation direction needs to be updated
        const newDirection = this.getAnimationDirection();
        if (this.player.direction !== newDirection) {
            this.player.frame = 0;  // Reset to first frame for the new direction
            this.player.direction = newDirection;  // Update direction
            this.player.setAnimation(newDirection);  // Update animation
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

export default WalkingState;
