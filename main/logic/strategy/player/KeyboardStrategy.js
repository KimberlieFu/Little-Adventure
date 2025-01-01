import MovementStrategy from './MovementStrategy.js';

class KeyboardStrategy extends MovementStrategy {
    constructor() {
        super();
        this.keys = { w: false, a: false, s: false, d: false };
        this.speed = 1; 
    }

    // Update key states when keys are pressed
    handleKeyDown(event) {
        if (event.key === 'w') this.keys.w = true;
        if (event.key === 'a') this.keys.a = true;
        if (event.key === 's') this.keys.s = true;
        if (event.key === 'd') this.keys.d = true;
    }

    // Update key states when keys are released
    handleKeyUp(event) {
        if (event.key === 'w') this.keys.w = false;
        if (event.key === 'a') this.keys.a = false;
        if (event.key === 's') this.keys.s = false;
        if (event.key === 'd') this.keys.d = false;
    }

    // Move the player based on pressed keys
    move(player) {
        if (this.keys.w) player.y -= this.speed; // Move up
        if (this.keys.s) player.y += this.speed; // Move down
        if (this.keys.a) player.x -= this.speed; // Move left
        if (this.keys.d) player.x += this.speed; // Move right
    }
}

export default KeyboardStrategy;
