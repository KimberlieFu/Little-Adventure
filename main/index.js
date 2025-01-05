import { initializeGameAssets } from './logic/LoadConfig.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let mainMap, player, camera;
let mapPositionX, mapPositionY, mapWidth, mapHeight;
let isMapLoaded = false;

async function initializeGame() {
    try {
        const assets = await initializeGameAssets(canvas, c);

        mainMap = assets.mapImage;
        player = assets.player;
        camera = assets.camera;
        mapWidth = assets.mapWidth;
        mapHeight = assets.mapHeight;
        mapPositionX = 0;
        mapPositionY = 0;
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
    c.drawImage(mainMap, mapPositionX, mapPositionY);

    if (camera) {
        camera.draw(c);
        mapPositionX = camera.x;
        mapPositionY = camera.y;
    }

    if (player) {
        player.handleInput();
        player.update();
        player.animate();
    }

    requestAnimationFrame(animate);
}

initializeGame();