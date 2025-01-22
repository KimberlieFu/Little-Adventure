import GameObject from '../../map/GameObject.js';

class Entrance extends GameObject {
    constructor(x, y, width, height, blockWidth, blockheight, zoom, context) {
        super(x, y, width, height);
        this.zoom = zoom / 100;
        this.width = width * blockWidth * this.zoom;
        this.height = height * blockheight * this.zoom;
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

        this.context.save();
        this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
        this.context.fillRect(this.adjustedX, this.adjustedY, this.width, this.height);
        this.context.restore();

        const distance = Math.sqrt(
            Math.pow(player.x - (this.adjustedX + this.width / 2), 2) +
            Math.pow(player.y - (this.adjustedY + this.height / 2), 2)
        );

        if (distance < 100) {
            this.displayPopUp(`${this.getInteractionMessage()}`);
        }

        return distance;
    }

    displayPopUp(message) {
        const padding = 10; 
        const cornerRadius = 10; 
        const triangleHeight = 10;
        const triangleWidth = 20; 
    
        this.context.fillStyle = "white";
    
        // Measure text width and calculate rectangle size
        const textWidth = this.context.measureText(message).width;
        const textHeight = 20;
        const rectWidth = textWidth + padding * 2;
        const rectHeight = textHeight + padding;
    
        // Positioning
        const rectX = this.adjustedX + this.width / 2 - rectWidth / 2;
        const rectY = this.adjustedY - rectHeight - triangleHeight - 10;
        const textX = rectX + padding;
        const textY = rectY + rectHeight / 2 + textHeight / 4;
    
        // Draw rounded rectangle
        this.context.fillStyle = "rgba(0, 0, 0, 0.8)"; 
        this.context.beginPath();
        this.context.moveTo(rectX + cornerRadius, rectY);
        this.context.lineTo(rectX + rectWidth - cornerRadius, rectY);
        this.context.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius);
        this.context.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius);
        this.context.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - cornerRadius, rectY + rectHeight);
        this.context.lineTo(rectX + cornerRadius, rectY + rectHeight);
        this.context.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - cornerRadius);
        this.context.lineTo(rectX, rectY + cornerRadius);
        this.context.quadraticCurveTo(rectX, rectY, rectX + cornerRadius, rectY);
        this.context.closePath();
        this.context.fill();
    
        // Draw upside-down triangle
        const triangleX = rectX + rectWidth / 2 - triangleWidth / 2; 
        const triangleY = rectY + rectHeight; 
        this.context.beginPath();
        this.context.moveTo(triangleX, triangleY); 
        this.context.lineTo(triangleX + triangleWidth / 2, triangleY + triangleHeight); 
        this.context.lineTo(triangleX + triangleWidth, triangleY); 
        this.context.closePath();
        this.context.fill();
    
        // Draw text
        this.context.fillStyle = "white"; 
        this.context.fillText(message, textX, textY);
    }
    
    getInteractionMessage() {
        return "Enter";
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
