import Entrance from './Entrance.js';

class TempleEntrance extends Entrance {
    constructor(x, y, width, height, blockWidth, blockHeight, zoom, context) {
        super(x, y, width, height, blockWidth, blockHeight, zoom, context);
        this.type = "temple";
    }

    interact() {
        console.log("You entered the house. Welcome to the Temple!");
    }
}

export default TempleEntrance;
