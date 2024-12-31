import PlayerState from './PlayerState.js';

class IdleState extends PlayerState {
    handleInput() {
        // Idle state doesn't handle input directly
    }

    update() {
        // No movement, just standing still
        this.player.frame = 0;
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

export default IdleState;