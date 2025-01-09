import MovementStrategy from "./MovementStrategy.js";

class OverworldStrategy extends MovementStrategy {
    constructor(canvasWidth, canvasHeight, mapCollision, camera) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.mapCollision = mapCollision;
        this.keys = { w: false, a: false, s: false, d: false };
        this.keyQueue = [];
        this.speed = 1;
        this.offsetX = (camera.camerabox.width / 2) - 1;
        this.offsetY = (camera.camerabox.height / 2) - 1;

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

    checkCollision(player) {
        for (const row of this.mapCollision) {
            for (const boundary of row) {
                const playerRight = player.x + (player.width / 2);
                const playerLeft = player.x - (player.width / 2); 
                const playerUp = player.y - (player.height / 2); 
                const playerDown = player.y + (player.height / 2); 

                const boundaryRight = boundary.adjustedX + boundary.width;
                const boundaryLeft = boundary.adjustedX;
                const boundaryUp = boundary.adjustedY;
                const boundaryDown = boundary.adjustedY + boundary.height;

                if (
                    playerRight > boundaryLeft && 
                    playerLeft < boundaryRight &&
                    playerDown > boundaryUp && 
                    playerUp < boundaryDown
                ) {
                    return true; 
                }
            }
        }
        return false; 
    }
    

    move(player) {
        const latestDirection = this.getLatestDirection();
        
        if (!latestDirection) {
            player.direction = null; 
            return; 
        }

        console.log(this.checkCollision(player))

        // if (this.checkCollision(player)) {
        //     return;
        // }

       

        const direction = this.keyToDirection[latestDirection];

        // Move the player based on the direction
        if (direction === 'up' && player.y - this.offsetY > 0) player.y -= this.speed;
        else if (direction === 'down' && 
            player.y + this.offsetY < this.canvasHeight) player.y += this.speed;
        else if (direction === 'left' && 
            player.x - this.offsetX > 0) player.x -= this.speed;
        else if (direction === 'right' && 
            player.x + this.offsetX < this.canvasWidth) player.x += this.speed;
        else if (direction === 'up-right' ) {
            if (player.y - this.offsetY > 0) player.y -= this.speed; 
            if (player.x + this.offsetX < this.canvasWidth) player.x += this.speed;
        }
        else if (direction === 'up-left') { 
            if (player.y - this.offsetY > 0) player.y -= this.speed; 
            if (player.x - this.offsetX > 0) player.x -= this.speed;
        }
        else if (direction === 'down-right') {
            if (player.y + this.offsetY < this.canvasHeight) player.y += this.speed;
            if (player.x + this.offsetX < this.canvasWidth) player.x += this.speed;
        }
        else if (direction === 'down-left' ) { 
            if (player.y + this.offsetY < this.canvasHeight) player.y += this.speed;
            if (player.x - this.offsetX > 0) player.x -= this.speed;
        }
            player.direction = direction;
        

    }
}

export default OverworldStrategy;