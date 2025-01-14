import MovementStrategy from "./MovementStrategy.js";

class OverworldStrategy extends MovementStrategy {
    constructor(canvasWidth, canvasHeight, mapCollision, camera) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.mapCollision = mapCollision;
        this.camera = camera;
        this.keys = { w: false, a: false, s: false, d: false };
        this.keyQueue = [];
        this.speed = 1;
        this.offsetX = (camera.camerabox.width / 2) - 0.005;
        this.offsetY = (camera.camerabox.height / 2)- 0.005;

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

    checkCollision(player, positionX, positionY) {
        const adjustedPositionX = positionX 
        const adjustedPositionY = positionY 
    
        for (const row of this.mapCollision) {
            for (const boundary of row) {
                const playerRight = adjustedPositionX + (player.width / 2);
                const playerLeft = adjustedPositionX - (player.width / 2); 
                const playerUp = adjustedPositionY - (player.height / 2); 
                const playerDown = adjustedPositionY + (player.height / 2); 
    
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
    
    checkPlayerCollision(player, direction) {
        let newX = player.x 
        let newY = player.y
        const playerRightSide = player.x + (player.width / 2);
        const playerLeftSide = player.x - (player.width / 2);
        const playerUpSide = player.y - (player.height / 2);
        const playerDownSide = player.y + (player.height / 2);

        // Move the player based on the direction
        if (direction === 'up' && playerUpSide > 0) {
            newY -= this.speed;
        } else if (direction === 'down' && playerDownSide < this.canvasHeight) {
            newY += this.speed;
        } else if (direction === 'left' && playerLeftSide > 0) {
            newX -= this.speed;
        } else if (direction === 'right' && playerRightSide < this.canvasWidth) {
            newX += this.speed;
        } else if (direction === 'up-right' && playerUpSide > 0 && playerRightSide < this.canvasWidth) {
            newY -= this.speed / 2; 
            newX += this.speed / 2; 
        } else if (direction === 'up-left' && playerUpSide > 0 && playerLeftSide > 0) {
            newY -= this.speed / 2; 
            newX -= this.speed / 2; 
        } else if (direction === 'down-right' && playerDownSide < this.canvasHeight && playerRightSide < this.canvasWidth) {
            newY += this.speed / 2; 
            newX += this.speed / 2; 
        } else if (direction === 'down-left' && playerDownSide < this.canvasHeight && playerLeftSide > 0) {
            newY += this.speed / 2; 
            newX -= this.speed / 2; 
        }

        if (this.camera.cameraPan) {
            if (direction === 'up' || direction === 'down') {
                newY = player.y;
            } else if (direction === 'left' || direction === 'right') {
                newX = player.x;
            } else {
                newY = player.y;
                newX = player.x;
            }
        }
        if (this.checkCollision(player, newX, newY)) {
            return [player.x, player.y]; 
        }
        return [newX, newY]; 
    }

    move(player) {
        const latestDirection = this.getLatestDirection();
        
        if (!latestDirection) {
            player.direction = null; 
            return false; 
        }
        const direction = this.keyToDirection[latestDirection];
        player.direction = direction;
        const [newX, newY] = this.checkPlayerCollision(player, direction);
        player.x = newX;
        player.y = newY;
        return true;
    }
}

export default OverworldStrategy;