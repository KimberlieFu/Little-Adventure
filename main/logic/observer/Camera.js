class Camera {
    constructor(width, height, mapWidth, mapHeight) {
        this.cameraX = 0;
        this.cameraY = 0;
        this.width = width;
        this.height = height;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    // Method to update the camera position based on player's position
    update(playerX, playerY) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        // Keep the player at the center unless it's near the edge of the map
        this.cameraX = Math.min(Math.max(playerX - halfWidth, 0), this.mapWidth - this.width);
        this.cameraY = Math.min(Math.max(playerY - halfHeight, 0), this.mapHeight - this.height);
    }

    // Method to get the camera's current position (used to draw the visible area)
    getPosition() {
        return { x: this.cameraX, y: this.cameraY };
    }
}

export default Camera;