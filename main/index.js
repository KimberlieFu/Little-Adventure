import { initializeGameAssets } from './logic/map/LoadConfig.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let mainMap, mainForeground, player, camera;
let mapPositionX, mapPositionY, mapCollision, mapWidth, mapHeight;
let isMapLoaded = false, isInitialized = false;


async function initializeGame() {
    try {
        const assets = await initializeGameAssets(canvas, c);

        mainMap = assets.mapImage;
        mainForeground = assets.mapForeground;
        player = assets.player;
        camera = assets.camera;
        mapWidth = assets.mapWidth;
        mapHeight = assets.mapHeight;
        mapCollision = assets.mapCollision;
        mapPositionX, mapPositionY = 0, 0;

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
        isInitialized = true; 
        
    } catch (error) {
        console.error('Error initializing the game:', error);
    }
}


// Animation loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.translate(camera.x, camera.y);
    c.drawImage(mainMap, 0, 0);
    c.restore();

    mapCollision.forEach(row => {
        row.forEach((boundary) => {
            boundary.update(camera);
        });
    });

    player.update();
    player.animate();
    player.handleInput();

    c.save();
    c.translate(camera.x, camera.y);
    c.drawImage(mainForeground, 0, 0);
    c.restore();


  


    requestAnimationFrame(animate);
}

initializeGame();