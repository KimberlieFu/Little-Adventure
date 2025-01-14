class Camera {
  constructor(canvasWidth, canvasHeight, mapWidth, mapHeight, startX, startY) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.velocity = 0;
    this.camerabox = {
      position: { x: 0, y:0 },
      width: 1000,
      height: 500,
    }
    this.x = startX;
    this.y = startY;
    this.velocity = 1;
    this.cameraPan = false;
  }

  setVelocity(velocity) {
    this.velocity = velocity;  
  }

  pan(player) {
    let cameraMove = false;
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    const cameraboxLeftSide = this.camerabox.position.x;
    const cameraboxUpSide = this.camerabox.position.y;
    const cameraboxDownSide = this.camerabox.position.y + this.camerabox.height;

    // Pan right
    if (cameraboxRightSide >= this.canvasWidth && Math.abs(this.x) < this.mapWidth - this.canvasWidth && 
       (player.direction === 'right' || player.direction === 'up-right' || player.direction === 'down-right')) {
        const newCameraX = this.x - this.velocity;
        const newPlayerX = player.x + this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, player.y) && !player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
            cameraMove = true;
        }
    }
    // Pan left
    if (cameraboxLeftSide < 0 && this.x < 0 && 
       (player.direction === 'left' || player.direction === 'up-left' || player.direction === 'down-left')) {
        const newCameraX = this.x + this.velocity;
        const newPlayerX = player.x - this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
            cameraMove = true;
        }
    }
    // Pan up
    if (cameraboxUpSide < 0 && this.y < 0 &&
      (player.direction === 'up' || player.direction === 'up-left' || player.direction === 'up-right')) {
        const newCameraY = this.y + this.velocity;
        const newPlayerY = player.y - this.velocity;

        if (!player.movementStrategy.checkCollision(player, player.x, newPlayerY)) {
            this.y = newCameraY; 
            cameraMove = true;
        }
    }
    // Pan down
    if (cameraboxDownSide >= this.canvasHeight && Math.abs(this.y) < this.mapHeight - this.canvasHeight &&
       (player.direction === 'down' || player.direction === 'down-left' || player.direction === 'down-right')) {
        const newCameraY = this.y - this.velocity;
        const newPlayerY = player.y + this.velocity;

        if (!player.movementStrategy.checkCollision(player, player.x, newPlayerY)) {
            this.y = newCameraY;
            cameraMove = true;
        }
    }
    if (cameraMove) {
      this.cameraPan = true;
      return;
    }
    this.cameraPan = false;
  }

  update(player) {
    this.camerabox.position.x = player.x - this.camerabox.width / 2;
    this.camerabox.position.y = player.y - this.camerabox.height / 2;
    this.pan(player);
  }

  draw(context) {
    context.save();
    context.strokeStyle = "red"; 
    context.lineWidth = 2;

    context.strokeRect(
        this.camerabox.position.x, 
        this.camerabox.position.y, 
        this.camerabox.width,
        this.camerabox.height
    );


    context.beginPath();
    context.moveTo(this.camerabox.position.x + this.camerabox.width, this.camerabox.position.y); // Top right corner
    context.lineTo(this.camerabox.position.x + this.camerabox.width, this.camerabox.position.y + this.camerabox.height); // Bottom right corner
    context.strokeStyle = "blue"; // Use a different color for clarity
    context.stroke();

    context.restore();
  }

  setZoom(zoom) {
    this.zoom = zoom;
  }
}

export default Camera;
