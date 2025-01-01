import Player from './logic/Player.js';
import WalkingState from './logic/state/player/WalkingState.js';
import Camera from './logic/observer/Camera.js';
import KeyboardStrategy from './logic/strategy/player/KeyboardStrategy.js';
import IdleState from './logic/state/player/IdleState.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let mainMap = new Image();
let player;
let camera;

const idleImage = new Image();
const blinkImage = new Image();
const walkingImage = new Image();

// Utility function for loading images
function loadImage(src) {
    console.log(`Loading image from: ${src}`);  
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            console.log(`Image loaded successfully: ${src}`);  
            resolve(img);
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);  
            reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
    });
}

// Load map configuration
async function loadMapConfig() {
    try {
        const response = await fetch('file/MapConfig.json');
        const mapConfig = await response.json();

        // Set map properties
        canvas.width = mapConfig.map.width;
        canvas.height = mapConfig.map.height;
        mainMap.src = mapConfig.map.image;

        await new Promise((resolve, reject) => {
            mainMap.onload = () => resolve();
            mainMap.onerror = () => reject(new Error('Failed to load main map'));
        });
        console.log("Main map loaded");

        // Initialize camera
        camera = new Camera(mapConfig.map.width, mapConfig.map.height, canvas.width, canvas.height);
        console.log("Camera initialized.");

        // Load player animations
        const [idle, blink, walking] = await Promise.all([
            loadImage('../GameAsset/player/Cuphead/CupheadIdle.png'),
            loadImage('../GameAsset/player/Cuphead/CupheadIdleBlink.png'),
            loadImage('../GameAsset/player/Cuphead/CupheadDown.png'),
        ]);

        // Initialize player
        player = new Player(
            mapConfig.player.startX,
            mapConfig.player.startY,
            75,
            75,
            c,
            {
                idle: { image: idle, frames: 16, loopFrames: 3 },
                blink: { image: blink, frames: 8 },
                walking: { image: walking, frames: 16, loopFrames: 13 }
            }
        );
        console.log("Player initialized:", player);
        player.setState(new IdleState(player));
        animate();
    } catch (error) {
        console.error('Error loading map config or assets:', error);
    }
}

// Animation loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Update the camera position based on the player's position
    if (player && camera) {
        camera.update(player);

        // Adjust the map position to the camera's view
        c.drawImage(mainMap, -camera.x, -camera.y);
    }

    // Render and update player
    if (player) {
        player.handleInput();
        player.update();
        player.animate();
    }

    requestAnimationFrame(animate);
}

// Load the configuration
console.log('Loading map config...');
loadMapConfig();
