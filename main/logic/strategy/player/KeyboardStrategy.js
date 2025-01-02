import MovementStrategy from "./MovementStrategy.js";

class KeyboardStrategy extends MovementStrategy {
    constructor() {
        super();
        this.keys = { w: false, a: false, s: false, d: false };
        this.keyQueue = [];
        this.speed = 1;

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

        // Determine final direction
        if (vertical && horizontal) return `${vertical}-${horizontal}`;
        if (vertical) return vertical;
        if (horizontal) return horizontal;

        return null;
    }

    // Get direction dictionary
    getKeyToDirection() {
        return this.keyToDirection;
    }

    // Move the player based on the latest direction
    move(player) {
        const latestDirection = this.getLatestDirection();
        
        if (!latestDirection) {
            player.direction = null; 
            return; 
        }

        const direction = this.keyToDirection[latestDirection];

        // Move the player based on the direction
        if (direction === 'up') player.y -= this.speed;
        else if (direction === 'down') player.y += this.speed;
        else if (direction === 'left') player.x -= this.speed;
        else if (direction === 'right') player.x += this.speed;
        else if (direction === 'up-right') { player.x += this.speed; player.y -= this.speed; }
        else if (direction === 'up-left') { player.x -= this.speed; player.y -= this.speed; }
        else if (direction === 'down-right') { player.x += this.speed; player.y += this.speed; }
        else if (direction === 'down-left') { player.x -= this.speed; player.y += this.speed; }
        player.direction = direction;
    }
}

export default KeyboardStrategy;
