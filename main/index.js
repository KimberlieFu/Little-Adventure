import Player from './logic/Player.js';
import WalkingState from './logic/state/player/WalkingState.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const playerImage = new Image();
let mainMap = new Image();
let player; // Declare player globally

async function loadMapConfig() {
    try {
        const response = await fetch('file/MapConfig.json');
        const mapConfig = await response.json();

        // Set map properties
        canvas.width = mapConfig.map.width;
        canvas.height = mapConfig.map.height;
        mainMap.src = mapConfig.map.image;

        // Set player start position
        player = new Player(mapConfig.player.startX, mapConfig.player.startY, 75, 75, playerImage, c);
        player.setState(new WalkingState(player)); // Set initial player state to Walking

        // Load main map image
        mainMap.onload = () => {
            console.log('Main map loaded');
            playerImage.src = '../GameAsset/player/Cuphead/CupheadDown.png';
            playerImage.onload = () => {
                console.log('Player image loaded');
                animate(); // Start the animation loop after all images are loaded
            };
        };
        
    } catch (error) {
        console.error('Error loading map config:', error);
    }
}

// Animation loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(mainMap, 0, 0);

    // Add debug log to check if player is being rendered
    if (player) {
        console.log('Rendering player at position', player.x, player.y);
        player.handleInput();
        player.update();
        player.animate();
    }

    requestAnimationFrame(animate);
}

// Load the configuration
loadMapConfig();
