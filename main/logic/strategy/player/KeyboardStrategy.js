import MovementStrategy from "./MovementStrategy.js";

class KeyboardStrategy extends MovementStrategy {
    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.keys = { w: false, a: false, s: false, d: false };
        this.keyQueue = [];
        this.speed = 1;
        this.offset = 145;

        this.keyToDirection = {
            w: 'up',
            a: 'left',
            s: 'down',
            d: 'right',
            'w-d': 'up-right',
            'w-a': 'up-left',
            's-d': 'down-right',
            's-a': 'down-left',
        };

        this.keySet = ['w', 'a', 's', 'd']
    }

    setSpeed(velocity) {
        this.speed = velocity;
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

        for (let i = this.keyQueue.length - 1; i >= 0; i--) {
            const key = this.keyQueue[i];
            if (['w', 's'].includes(key) && !vertical) vertical = key;
            if (['a', 'd'].includes(key) && !horizontal) horizontal = key;
            if (vertical && horizontal) break;
        }

        if (vertical && horizontal) return `${vertical}-${horizontal}`;
        if (vertical) return vertical;
        if (horizontal) return horizontal;

        return null;
    }

    getKeyToDirection() {
        return this.keyToDirection;
    }

    getKeySet() {
        return this.keySet;
    }

    move(player) {
        const latestDirection = this.getLatestDirection();
        
        if (!latestDirection) {
            player.direction = null; 
            return; 
        }

        const direction = this.keyToDirection[latestDirection];

        // Move the player based on the direction
        if (direction === 'up' && player.y - this.offset > 0) player.y -= this.speed;
        else if (direction === 'down' && 
            player.y + this.offset < this.canvasHeight) player.y += this.speed;
        else if (direction === 'left' && 
            player.x - this.offset > 0) player.x -= this.speed;
        else if (direction === 'right' && 
            player.x + this.offset < this.canvasWidth) player.x += this.speed;
        else if (direction === 'up-right' ) {
            if (player.y - this.offset > 0) player.y -= this.speed; 
            if (player.x + this.offset < this.canvasWidth) player.x += this.speed;
        }
        else if (direction === 'up-left') { 
            if (player.y - this.offset > 0) player.y -= this.speed; 
            if (player.x - this.offset > 0) player.x -= this.speed;
        }
        else if (direction === 'down-right') {
            if (player.y + this.offset < this.canvasHeight) player.y += this.speed;
            if (player.x + this.offset < this.canvasWidth) player.x += this.speed;
        }
        else if (direction === 'down-left' ) { 
            if (player.y + this.offset < this.canvasHeight) player.y += this.speed;
            if (player.x - this.offset > 0) player.x -= this.speed;
        }
        player.direction = direction;

    }
}

export default KeyboardStrategy;
