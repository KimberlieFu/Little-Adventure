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

        const onLoadHandler = () => {
            isMapLoaded = true;
            console.log('Map loaded successfully.');
            animate();
        };

        mainMap.onload = onLoadHandler;
        mainMap.onerror = (error) => console.error('Error loading map image:', error);

        if (mainMap.complete) {
            isMapLoaded = true;
            console.log('Map is already loaded.');
            animate();
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
        console.log(`Player position: x: ${player.x}, y: ${player.y}`);
       
        // Only draw the map after it has been loaded
        c.drawImage(mainMap, -camera.x, -camera.y);

        console.log(`Player position: x: ${player.x}, y: ${player.y}`);
        console.log(`Camera position: x: ${camera.x}, y: ${camera.y}`);
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
