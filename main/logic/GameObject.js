class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(c) {
        throw new Error('Draw method must be implemented.');
    }
}

export default GameObject;