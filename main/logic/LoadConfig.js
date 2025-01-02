import JSONMapLoadingStrategy from './strategy/overworld/JSONMapLoadingStrategy.js';
import Player from './Player.js';
import Camera from './observer/Camera.js'
import IdleState from './state/player/IdleState.js';

export async function loadMapConfig() {
    try {
        const mapLoadingStrategy = new JSONMapLoadingStrategy();  
        const map = await mapLoadingStrategy.loadMap('file/MapConfig.json', 'main'); 
        const playerConfig = await mapLoadingStrategy.getPlayerConfig('file/MapConfig.json', 'main');

        return { map, playerConfig };
    } catch (error) {
        console.error('Error loading map config:', error);
        throw error;
    }
}

export async function initializeGameAssets(canvas, c) {
    try {
        const { map, playerConfig } = await loadMapConfig();
        const imageSrc = map.image instanceof HTMLImageElement ? map.image.src : map.image;

        const mapImage = await loadImage(imageSrc);
        const camera = new Camera(map.mapWidth, map.mapHeight);
        const loadedAnimations = await loadCharacterAnimations();

        canvas.width = map.canvasWidth;
        canvas.height = map.canvasHeight;

        // Initialize player
        const player = new Player(
            playerConfig.startX,  
            playerConfig.startY,  
            75, 75, c,
            loadedAnimations
        );

        player.setState(new IdleState(player));

        return { mapImage, camera, player };  
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
