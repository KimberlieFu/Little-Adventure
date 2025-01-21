import JSONMapLoadingStrategy from '../strategy/overworld/JSONMapLoadingStrategy.js';
import Player from './Player.js';
import Camera from '../observer/Camera.js'
import IdleState from '../state/player/IdleState.js';
import { BlockFactory } from '../factory/overworld/BlockFactory.js';

export async function loadMainMapConfig() {
    try {
        const mapLoadingStrategy = new JSONMapLoadingStrategy();  
        const map = await mapLoadingStrategy.loadMainMap('file/MapConfig.json', 'main'); 
        const playerConfig = await mapLoadingStrategy.getPlayerConfig('file/MapConfig.json', 'main');

        return { map, playerConfig };
    } catch (error) {
        console.error('Error loading map config:', error);
        throw error;
    }
}

export async function loadFont(language) {
    try {
        const mapLoadingStrategy = new JSONMapLoadingStrategy();  
        const font = await mapLoadingStrategy.loadFonts('file/Font.json', language); 

        return { font };
    } catch (error) {
        console.error('Error loading font config:', error);
        throw error;
    }
}

export async function InitializeFonts(language, c) {
    try {
        const { font } = await loadFont(language);

        if (!font || font.length === 0) {
            throw new Error('No fonts loaded.');
        }

        // Find the different font styles
        const regularFont = font.find(f => f.family.includes('regular'));
        const boldFont = font.find(f => f.family.includes('bold'));
        const blackFont = font.find(f => f.family.includes('black'));

        // Check if we have all the required fonts
        if (!regularFont || !boldFont || !blackFont) {
            throw new Error('One or more required font styles are missing.');
        }

        console.log(`Loaded fonts: ${regularFont.family}, ${boldFont.family}, ${blackFont.family}`);
        c.font = `30px ${regularFont.family}`;
        return { regularFont, boldFont, blackFont };

    } catch (error) {
        console.error('Error initializing fonts:', error);
        throw error; 
    }
}

export async function initializeMainMapGameAssets(canvas, c) {
    try {
        const { map, playerConfig } = await loadMainMapConfig();
        const imageSrc = map.image instanceof HTMLImageElement ? map.image.src : map.image;
        const foregroundSrc = map.mapForeground instanceof HTMLImageElement ? map.mapForeground.src : map.mapForeground;

        const mapEntrance = [];

        const mapImage = await loadImage(imageSrc);
        const mapForeground = await loadImage(foregroundSrc);
        const mapWidth = map.mapWidth;
        const mapHeight = map.mapHeight;
        const mapCollision = loadMap(1, map.mapRowTile, map.mapCollision, map.mapPixel, map.mapPixel, map.mapZoom, c);
        const mapTemple = map.mapEntrance.temple;
        const mapTempleEntrance = BlockFactory.createBlock(2, mapTemple.x, mapTemple.y, map.mapPixel, map.mapPixel, mapTemple.width, mapTemple.height, map.mapZoom, c);
        mapEntrance.push(mapTempleEntrance)
        
        const camera = new Camera(map.canvasWidth, map.canvasHeight, map.mapWidth, map.mapHeight, map.mapStartX, map.mapStartY);
        const loadedAnimations = await loadCharacterAnimations();

        canvas.width = map.canvasWidth;
        canvas.height = map.canvasHeight;
        
        // Initialize player
        const player = new Player(
            playerConfig.startX,  
            playerConfig.startY,  
            30, 30, c,  
            map.canvasWidth, map.canvasHeight,
            loadedAnimations, mapCollision, camera
        );

        player.setState(new IdleState(player));
        player.addObserver(camera);
        camera.setVelocity(player.velocity);

        return { mapImage, mapForeground, mapWidth, mapHeight, mapCollision, mapEntrance, camera, player };  
    } catch (error) {
        console.error('Error initializing game assets:', error);
        throw error;
    }
}

async function loadCharacterAnimations() {
    try {
        const response = await fetch('file/Character.json');
        const characterConfig = await response.json();

        const animations = characterConfig.cuphead;
        const loadedAnimations = {};

        for (const animation in animations) {
            const { image, frames, loopFrames } = animations[animation];
            if (image && frames && loopFrames) {
                const loadedImage = await loadImage(image);
                loadedAnimations[animation] = { image: loadedImage, frames, loopFrames };
            } else {
                console.warn(`Missing data for animation: ${animation}`);
            }
        }

        return loadedAnimations; 
    } catch (error) {
        console.error('Error loading character animations:', error);
        return {}; 
    }
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

function loadMap(type, rowTile, mapBlock, width, height, zoom, context) {
    const numRows = Math.ceil(mapBlock.length / rowTile);
    const collisionMap2D = [];
    const boundaryMap2D = [];

    for (let row = 0; row < numRows; row++) {
        const rowStart = row * rowTile; 
        const rowEnd = Math.min(rowStart + rowTile, mapBlock.length); 
        const rowData = mapBlock.slice(rowStart, rowEnd);
        collisionMap2D.push(rowData); 
    }

    collisionMap2D.forEach((row, i) => {
        const boundaryRow = []; 
        row.forEach((symbol, j) => {
            if (symbol !== 0) {
                const block = BlockFactory.createBlock(type, j, i, width, height, 1, 1, zoom, context);
                boundaryRow.push(block); 
            }
        });
        boundaryMap2D.push(boundaryRow);
    });
    
    return boundaryMap2D; 
}