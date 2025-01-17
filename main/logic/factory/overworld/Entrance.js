import GameObject from '../../map/GameObject.js';

class Entrance extends GameObject {
    constructor(x, y, width, height, zoom, context) {
        super(x, y, width, height);
        this.zoom = zoom / 100;
        this.width = width * this.zoom;
        this.height = height * this.zoom;
        this.originalX = x * width * this.zoom;
        this.originalY = y * height * this.zoom;
        this.adjustedX = 0;
        this.adjustedY = 0;
        this.context = context;
        this.type = "generic"; 
    }

    update(camera, player) {
        this.adjustedX = this.originalX + camera.x;
        this.adjustedY = this.originalY + camera.y;

        this.context.fillStyle = "rgba(255, 0, 0, 0.5)";
        this.context.fillRect(this.adjustedX, this.adjustedY, this.width, this.height);
        const distance = Math.sqrt(
            Math.pow(player.x - (this.adjustedX + this.width / 2), 2) +
            Math.pow(player.y - (this.adjustedY + this.height / 2), 2)
        );

        if (distance < 100) {
            this.displayPopUp(`Press 'Enter' to ${this.getInteractionMessage()}`);
        }

        return distance;
    }

    displayPopUp(message) {
        this.context.font = "16px Arial";
        this.context.fillStyle = "white";
        this.context.fillText(message, this.adjustedX, this.adjustedY - 10);
    }

    getInteractionMessage() {
        return `interact with ${this.type}`;
    }

    interact() {
        console.log(`You interacted with a ${this.type}.`);
    }

    isPlayerNear(player) {
        const distance = Math.sqrt(
            Math.pow(player.x - (this.adjustedX + this.width / 2), 2) +
            Math.pow(player.y - (this.adjustedY + this.height / 2), 2)
        );
        return distance < 100;
    }
}

export default Entrance;
