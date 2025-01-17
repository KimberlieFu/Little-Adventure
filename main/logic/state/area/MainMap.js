import MapState from "./MapState.js";
import { initializeMainMapGameAssets } from "../../map/LoadConfig.js";


export class MainMap extends MapState {
    constructor(canvas, c) {
        super();
        this.canvas = canvas;
        this.c = c;
        this.isInitialized = false;
        this.isMapLoaded = false;
        this.closestEntrance = null;
    }

    async loadAssets() {
        try {
            const assets = await initializeMainMapGameAssets(this.canvas, this.c);

            this.mainMap = assets.mapImage;
            this.mainForeground = assets.mapForeground;
            this.player = assets.player;
            this.camera = assets.camera;
            this.mapWidth = assets.mapWidth;
            this.mapHeight = assets.mapHeight;
            this.mapCollision = assets.mapCollision;
            this.mapEntrance = assets.mapEntrance;

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
        this.c.drawImage(this.mainMap, this.camera.x, this.camera.y);

        this.mapCollision.forEach(row => {
            row.forEach((boundary) => {
                boundary.update(this.camera);
            });
        });
    
        this.player.update();
        this.player.animate();
        this.player.handleInput();
    
        this.c.drawImage(this.mainForeground, this.camera.x, this.camera.y);
    
        let nearestDistance = Infinity;
        // for (const entrance of this.mapEntrance) {
        //     const distance = entrance.update(this.camera, this.player);
            
        //     if (distance < nearestDistance) {
        //         nearestDistance = distance; 
        //         this.closestEntrance = entrance; 
        //     }
        // }
        
        // if (this.closestEntrance) {
        //     this.closestEntrance.update(this.camera, this.player, true);
        // }
    
        requestAnimationFrame(this.update.bind(this));
    }
}
