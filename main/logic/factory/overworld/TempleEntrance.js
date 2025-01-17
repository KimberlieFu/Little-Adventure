import Entrance from './Entrance.js';

class TempleEntrance extends Entrance {
    constructor(x, y, width, height, zoom, context) {
        super(x, y, width, height, zoom, context);
        this.type = "temple";
    }

    getInteractionMessage() {
        return "enter the temple";
    }

    interact() {
        console.log("You entered the house. Welcome to the Temple!");
    }
}

export default TempleEntrance;
