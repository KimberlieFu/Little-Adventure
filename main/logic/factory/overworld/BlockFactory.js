import Boundary from "./Boundary.js";
import Entrance from "./Entrance.js";
import TempleEntrance from "./TempleEntrance.js";

export class BlockFactory {
    static createBlock(type, x, y, width, height, blockWidth, blockHeight, zoom, context) {
        switch (type) {
            case 1: 
                return new Boundary(x, y, width, height, blockWidth, blockHeight, zoom, context);
            case 2:
                return new TempleEntrance(x, y, width, height, blockWidth, blockHeight, zoom, context);

            default:
                return null;
        }
    }
}
