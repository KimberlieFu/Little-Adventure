import GameObject from '../../map/GameObject.js';

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

    update(camera) {
        this.adjustedX = this.originalX + camera.x;
        this.adjustedY = this.originalY + camera.y;
    }
}

export default Boundary;
