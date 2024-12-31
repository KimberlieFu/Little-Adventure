import PlayerState from './PlayerState.js';

class WalkingState extends PlayerState {
    constructor(player) {
        super(player);
        this.frameTimer = 0;  // Initialize frame timer
        this.frameDelay = 5;  // Adjust this value to control the animation speed (higher is slower)
    }

    handleInput() {
        // Handle input for walking (move based on keys pressed)
        if (this.player.keys.w) this.player.y -= this.player.speed;
        if (this.player.keys.a) this.player.x -= this.player.speed;
        if (this.player.keys.s) this.player.y += this.player.speed;
        if (this.player.keys.d) this.player.x += this.player.speed;
    }

    update() {
        // Update walking state with animation speed control
        if (this.frameTimer >= this.frameDelay) {
            this.player.frame = (this.player.frame + 1) % this.player.totalFrames;
            this.frameTimer = 0; // Reset the frame timer
        } else {
            this.frameTimer++; // Increment the frame timer
        }
    }

    animate() {
        const playerFrameWidth = this.player.image.width / 16;
        this.player.context.drawImage(
            this.player.image,
            this.player.frame * playerFrameWidth,
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
