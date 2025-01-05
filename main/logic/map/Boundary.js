import GameObject from './GameObject.js';

class Boundary extends GameObject {
    constructor(x, y, width, height, zoom, context) {
        super(x, y, width, height)
        this.zoom = zoom / 100;
        this.x = x * width * this.zoom;
        this.y = y * height * this.zoom;
        this.context = context;
    }

    animate() {
        this.context.fillStyle = "rgba(1, 0, 0, 0)";
        this.context.fillRect(this.x, this.y, this.width, this.height); 
    }
}

export default Boundary;