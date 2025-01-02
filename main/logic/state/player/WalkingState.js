import PlayerState from './PlayerState.js';

class WalkingState extends PlayerState {
    constructor(player) {
        super(player);
        this.frameTimer = 0;
        this.frameDelay = 5;

        // Set initial animation direction
        const direction = this.getAnimationDirection();
        this.loopFrames = player.animations[direction]?.loopFrames || 16;
        this.totalFrames = player.animations[direction]?.frames || 16;
        player.direction = direction;
        player.setAnimation(direction);
    }

    getAnimationDirection() {
        const latestDirection = this.player.movementStrategy.getLatestDirection();
        if (!latestDirection) return this.player.direction || 'down';

        const keyToDirection = this.player.movementStrategy.getKeyToDirection();
        return keyToDirection[latestDirection] || 'down';
    }

    update() {
        // Update animation frame
        if (this.frameTimer >= this.frameDelay) {
            this.player.frame = (this.player.frame + 1) % this.loopFrames;
            this.frameTimer = 0;
        } else {
            this.frameTimer++;
        }

        // Check for direction changes
        const newDirection = this.getAnimationDirection();
        if (this.player.direction !== newDirection) {
            this.player.frame = 0; 
            this.player.direction = newDirection;
            this.loopFrames = this.player.animations[newDirection]?.loopFrames || 16; 
            this.totalFrames = this.player.animations[newDirection]?.frames || 16; 
            this.player.setAnimation(newDirection);
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