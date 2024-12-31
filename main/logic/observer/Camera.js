class Camera {
    constructor(mapWidth, mapHeight, viewWidth, viewHeight) {
      this.mapWidth = mapWidth;
      this.mapHeight = mapHeight;
      this.viewWidth = viewWidth;
      this.viewHeight = viewHeight;
      this.x = 0; // Camera's X position
      this.y = 0; // Camera's Y position
    }
  
    update(player) {
      // Calculate the desired camera position based on player's position
      let targetX = player.x - this.viewWidth / 2;
      let targetY = player.y - this.viewHeight / 2;
  
      // Prevent the camera from going out of bounds of the map
      targetX = Math.max(0, Math.min(targetX, this.mapWidth - this.viewWidth));
      targetY = Math.max(0, Math.min(targetY, this.mapHeight - this.viewHeight));
  
      // Adjust camera to follow the player, but prevent centering if at the edge
      if (player.x <= this.viewWidth / 2 || player.x >= this.mapWidth - this.viewWidth / 2) {
        // When player is near the horizontal edge, just keep the player in view
        this.x = Math.max(0, Math.min(player.x - this.viewWidth / 2, this.mapWidth - this.viewWidth));
      } else {
        // Center the camera when not at the edge
        this.x = targetX;
      }
  
      if (player.y <= this.viewHeight / 2 || player.y >= this.mapHeight - this.viewHeight / 2) {
        // When player is near the vertical edge, just keep the player in view
        this.y = Math.max(0, Math.min(player.y - this.viewHeight / 2, this.mapHeight - this.viewHeight));
      } else {
        // Center the camera when not at the edge
        this.y = targetY;
      }
    }
  }
  
  export default Camera;
  