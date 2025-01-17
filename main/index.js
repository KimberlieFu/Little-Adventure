import { MapContext } from "./logic/state/area/MapContext.js";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const mapLoader = new MapContext(canvas, c);

async function start() {
    await mapLoader.initializeMap();
    mapLoader.update(); 
}
     
start();
