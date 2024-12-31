import PlayerState from './PlayerState.js';

class IdleState extends PlayerState {
    constructor(player) {
        super(player);
        this.frameTimer = 0;  // Initialize frame timer
        this.frameDelay = 30;  // Adjust this value to control the animation speed (higher is slower)
        
        // Dynamically use loopFrames passed from the animation data
        this.loopFrames = player.animations.idle.loopFrames || 16;  // Default to 16 if not provided
        this.totalFrames = 16; // Total frames in the sprite sheet (assuming 16 total frames in the sprite sheet)
    }

    handleInput() {
        // Idle state doesn't handle input directly
    }

    update() {
        // Update idle state with animation speed control
        if (this.frameTimer >= this.frameDelay) {
            this.player.frame = (this.player.frame + 1) % this.loopFrames; // Loop only for the first `loopFrames`
            this.frameTimer = 0; // Reset the frame timer
        } else {
            this.frameTimer++; // Increment the frame timer
        }
    }

    animate() {
        const playerFrameWidth = this.player.image.width / this.totalFrames; // Calculate frame width for 16 total frames
        const currentFrame = this.player.frame % this.loopFrames; // Loop over the first `loopFrames`

        this.player.context.drawImage(
            this.player.image,
            currentFrame * playerFrameWidth, // X position in the sprite sheet (loop over the first `loopFrames`)
            0, // Y position (assuming a single row of frames)
            playerFrameWidth, // Width of one frame
            this.player.image.height, // Height of the sprite
            this.player.x - this.player.width / 2, // X position on canvas
            this.player.y - this.player.height / 2, // Y position on canvas
            this.player.width, // Scaled width
            this.player.height // Scaled height
        );
    }
}

export default IdleState;
