class Camera {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = 0; 
    this.y = 0; 
    this.followSpeed = 0.1; // Adjust how fast the camera follows the player
  }

  // Update camera position based on player with smoothing
  update(player) {
    // Apply smoothing to follow player position
    this.x += (player.x - this.x) * this.followSpeed;
    this.y += (player.y - this.y) * this.followSpeed;
    
    // Optionally, you can add some boundary checks if needed
    this.x = Math.max(0, Math.min(this.x, this.canvasWidth));
    this.y = Math.max(0, Math.min(this.y, this.canvasHeight));
  }
}

export default Camera;
