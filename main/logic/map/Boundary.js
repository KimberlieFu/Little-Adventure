import GameObject from './GameObject.js';

class Boundary extends GameObject {
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
    }

    animate(camera) {
        this.adjustedX = this.originalX + camera.x;
        this.adjustedY = this.originalY + camera.y;
        
        this.context.fillStyle = "rgba(255, 0, 0, 0.5)";
        this.context.fillRect(this.adjustedX, this.adjustedY, this.width, this.height);


        // Draw a circle at the boundary's top-left corner
        this.context.beginPath();
        this.context.arc(this.adjustedX, this.adjustedY, 5, 0, Math.PI * 2); // Circle of radius 5
        this.context.fillStyle = "blue";
        this.context.fill();
        this.context.closePath();
    }
}

export default Boundary;
