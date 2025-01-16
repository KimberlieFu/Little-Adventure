import { MainMap } from './MainMap.js';

export class MapContext {
    constructor(canvas, c) {
        this.canvas = canvas;
        this.c = c;
        this.currentState = new MainMap(this.canvas, this.c); 
    }

    async initializeMap() {
        await this.currentState.loadAssets();
    }

    setState(state) {
        this.currentState = state;
    }

    update() {
        this.currentState.update();
    }
}
