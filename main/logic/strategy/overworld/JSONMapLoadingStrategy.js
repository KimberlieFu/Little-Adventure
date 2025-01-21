import MapLoadingStrategy from "./MapLoadingStrategy.js";

class JSONMapLoadingStrategy extends MapLoadingStrategy {
    async loadMainMap(mapFile, mapSection = "main") { 
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
                mapStartX: map.startX, mapStartY: map.startY, mapCollision: map.collision, mapEntrance: map.entrance, mapRowTile: map.rowTile, mapPixel: map.pixel, mapZoom: map.zoom };
    
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

    async loadFonts(fontConfigFile, language) {
        try {
            const response = await fetch(fontConfigFile);
            const fontConfig = await response.json();
    
            const fonts = fontConfig[language];
            if (!fonts) {
                throw new Error(`Fonts for language "${language}" not found in the configuration.`);
            }
    
            const fontPromises = Object.entries(fonts).map(([style, fontPath]) => {
                const fontFace = new FontFace(`${language}-${style}`, `url(${fontPath})`);
                return fontFace.load().then((loadedFont) => {
                    document.fonts.add(loadedFont);
                    console.log(`Font loaded: ${language}-${style}`);
                    return loadedFont; 
                });
            });
    
            const loadedFonts = await Promise.all(fontPromises);
            console.log(`All fonts for language "${language}" loaded.`);
            return loadedFonts; 
        } catch (error) {
            console.error('Error loading fonts:', error);
        }
    }
}

export default JSONMapLoadingStrategy
