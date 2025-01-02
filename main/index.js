import { initializeGameAssets } from './logic/LoadConfig.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let mainMap, player, camera;
let isMapLoaded = false;

async function initializeGame() {
    try {
        const assets = await initializeGameAssets(canvas, c);
        mainMap = assets.mapImage;
        player = assets.player;
        camera = assets.camera;
        player.addObserver(camera);

        // Ensure the image is fully loaded before rendering
        mainMap.onload = () => {
            isMapLoaded = true;
            console.log('Map loaded successfully.');
            animate(); // Start animation after map is loaded
        };

        mainMap.onerror = (error) => {
            console.error('Error loading map image:', error);
        };

        if (mainMap.complete) { // If the image is already loaded
            isMapLoaded = true;
            console.log('Map is already loaded.');
            animate(); // Start animation immediately
        }

        console.log('Game assets loaded successfully.');
    } catch (error) {
        console.error('Error initializing the game:', error);
    }
}

// Animation loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (isMapLoaded && camera) {
        console.log(mainMap);

        // Only draw the map after it has been loaded
        c.drawImage(mainMap, -camera.x, -camera.y);
        console.log(`Camera position: x: ${-camera.x}, y: ${-camera.y}`);
    }

    // Render and update player
    if (player) {
        player.handleInput();
        player.update();
        player.animate();
    }

    requestAnimationFrame(animate);
}

initializeGame();
