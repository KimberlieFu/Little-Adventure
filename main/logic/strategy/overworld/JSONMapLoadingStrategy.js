import MapLoadingStrategy from "./MapLoadingStrategy.js";

class JSONMapLoadingStrategy extends MapLoadingStrategy {
    async loadMap(mapFile, mapSection = "main") { 
        try {
            const response = await fetch(mapFile);
            const mapConfig = await response.json();
            const map = mapConfig[mapSection]?.map;
    
            if (!map) {
                throw new Error(`Map section "${mapSection}" not found in the configuration.`);
            }
    
            const mapImageSrc = map.image;
            const mapImage = new Image();
            mapImage.src = mapImageSrc;
    
            await new Promise((resolve, reject) => {
                mapImage.onload = resolve;
                mapImage.onerror = reject;
            });
   
            const mapWidth = mapImage.naturalWidth;
            const mapHeight = mapImage.naturalHeight;
    
            console.log("Map loaded:", mapSection, mapImageSrc);
    
            return { image: mapImage, mapForeground: map.foreground, mapWidth: mapWidth, mapHeight: mapHeight, canvasWidth: map.width, canvasHeight: map.height, 
                mapStartX: map.startX, mapStartY: map.startY, mapCollision: map.collision, mapRowTile: map.rowTile, mapPixel: map.pixel, mapZoom: map.zoom };
    
        } catch (error) {
            console.error('Error loading JSON map:', error);
        }
    }
    
    async getPlayerConfig(mapFile, mapSection = "main") {
        try {
            const response = await fetch(mapFile);
            const mapConfig = await response.json();
            const player = mapConfig[mapSection]?.player;

            if (!player) {
                throw new Error(`Player configuration not found in the "${mapSection}" section.`);
            }

            return player;

        } catch (error) {
            console.error('Error retrieving player config:', error);
        }
    }
}

export default JSONMapLoadingStrategy
