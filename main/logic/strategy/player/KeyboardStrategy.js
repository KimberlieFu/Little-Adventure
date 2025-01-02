class KeyboardStrategy {
    constructor() {
        this.keys = { w: false, a: false, s: false, d: false };
        this.keyQueue = []; 
        this.speed = 3;
    }

    // Handle key presses
    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(key)) {
            if (!this.keys[key]) {
                this.keyQueue.push(key); 
            }
            this.keys[key] = true;
        }
    }

    // Handle key releases
    handleKeyUp(event) {
        const key = event.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(key)) {
            this.keys[key] = false; 
            this.keyQueue = this.keyQueue.filter((k) => k !== key); 
        }
    }

    // Get the most recent direction, resolving conflicts (e.g., up/down or left/right)
    getLatestDirection() {
        let vertical = null;
        let horizontal = null; 

        // Traverse the queue in reverse to find the most recent conflicting directions
        for (let i = this.keyQueue.length - 1; i >= 0; i--) {
            const key = this.keyQueue[i];
            if (['w', 's'].includes(key) && !vertical) vertical = key;
            if (['a', 'd'].includes(key) && !horizontal) horizontal = key; 
            if (vertical && horizontal) break; 
        }

        // Determine final direction
        if (vertical && horizontal) return `${vertical}-${horizontal}`; 
        if (vertical) return vertical; 
        if (horizontal) return horizontal;

        return null;
    }

    // Move the player based on the latest direction
    move(player) {
        const latestDirection = this.getLatestDirection();
        if (!latestDirection) return;

        // Perform movement based on the latest direction
        if (latestDirection.includes('w')) player.y -= this.speed; // Move up
        if (latestDirection.includes('s')) player.y += this.speed; // Move down
        if (latestDirection.includes('a')) player.x -= this.speed; // Move left
        if (latestDirection.includes('d')) player.x += this.speed; // Move right
    }
}

export default KeyboardStrategy;
