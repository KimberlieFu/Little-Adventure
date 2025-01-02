class Camera {
  constructor(canvasWidth, canvasHeight, mapWidth, mapHeight, zoom = 1) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.x = 0;
    this.y = 0;
    this.lerpFactor = 0.1;
    this.zoom = 5; // Zoom factor
  }

  update(player) {
    // Adjust the player position by the zoom factor (scaled player position)
    const scaledPlayerX = player.x * this.zoom;
    const scaledPlayerY = player.y * this.zoom;

    // Target position for the camera to center on the player
    const targetX = scaledPlayerX - this.canvasWidth / 2;
    const targetY = scaledPlayerY - this.canvasHeight / 2;

    // Smoothly move the camera towards the target position using lerp
    this.x += (targetX - this.x) * this.lerpFactor;
    this.y += (targetY - this.y) * this.lerpFactor;

    // Calculate the bounds considering the zoom
    const maxX = Math.max(0, this.mapWidth * this.zoom - this.canvasWidth);
    const maxY = Math.max(0, this.mapHeight * this.zoom - this.canvasHeight);

    // Prevent camera from going out of bounds, respecting the zoom
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));

    console.log(`Camera position: x: ${this.x}, y: ${this.y}`);
  }

  setZoom(zoom) {
    this.zoom = zoom;
  }
}

export default Camera;
