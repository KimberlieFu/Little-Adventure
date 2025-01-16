import MapState from "./MapState.js";
import { initializeGameAssets } from "../../map/LoadConfig.js";

export class MainMap extends MapState {
    constructor(canvas, c) {
        super();
        this.canvas = canvas;
        this.c = c;
        this.isInitialized = false;
        this.isMapLoaded = false;
    }

    async loadAssets() {
        try {
            const assets = await initializeGameAssets(this.canvas, this.c);

            this.mainMap = assets.mapImage;
            this.mainForeground = assets.mapForeground;
            this.player = assets.player;
            this.camera = assets.camera;
            this.mapWidth = assets.mapWidth;
            this.mapHeight = assets.mapHeight;
            this.mapCollision = assets.mapCollision;

            this.mainMap.onload = this.onLoad.bind(this);
            this.mainMap.onerror = (error) => console.error('Error loading map image:', error);

            if (this.mainMap.complete) {
                this.isMapLoaded = true;
                this.onLoad();
            }

            console.log('Game assets loaded successfully.');
            this.isInitialized = true;

        } catch (error) {
            console.error('Error initializing the main map:', error);
        }
    }

    onLoad() {
        this.isMapLoaded = true;
        console.log('Map loaded successfully.');
    }

    update() {
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.c.save();
        this.c.translate(this.camera.x, this.camera.y);
        this.c.drawImage(this.mainMap, 0, 0);
        this.c.restore();

        this.mapCollision.forEach(row => {
            row.forEach((boundary) => {
                boundary.update(this.camera);
            });
        });

        this.player.update();
        this.player.animate();
        this.player.handleInput();

        this.c.save();
        this.c.translate(this.camera.x, this.camera.y);
        this.c.drawImage(this.mainForeground, 0, 0);
        this.c.restore();

        requestAnimationFrame(this.update.bind(this));
    }
}
