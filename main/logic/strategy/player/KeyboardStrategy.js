class KeyboardStrategy {
    constructor() {
        this.keys = { w: false, a: false, s: false, d: false }; // Initialize keys only once
        this.speed = 2;
    }

    // Update key states when keys are pressed
    handleKeyDown(event) {
        console.log(`Key Down: ${event.key}`);  
        if (event.key === 'w') this.keys.w = true;
        if (event.key === 'a') this.keys.a = true;
        if (event.key === 's') this.keys.s = true;
        if (event.key === 'd') this.keys.d = true;
        console.log(this.keys); 
    }

    // Update key states when keys are released
    handleKeyUp(event) {
        console.log(`Key Up: ${event.key}`);  
        if (event.key === 'w') this.keys.w = false;
        if (event.key === 'a') this.keys.a = false;
        if (event.key === 's') this.keys.s = false;
        if (event.key === 'd') this.keys.d = false;
        console.log(this.keys); 
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
