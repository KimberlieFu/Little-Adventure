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
    this.offsetX = 1000;
    this.offsetY = 1000;
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
       (player.direction === 'right')) {
        const newCameraX = this.x - this.velocity;
        const newPlayerX = player.x + this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, player.y) && !player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
            cameraMove = true;
        }
    }
    // Pan left
    if (cameraboxLeftSide < 0 && this.x < 0 && 
       (player.direction === 'left')) {
        const newCameraX = this.x + this.velocity;
        const newPlayerX = player.x - this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
            cameraMove = true;
        }
    }
    // Pan up
    if (cameraboxUpSide < 0 && this.y < 0 && 
      (player.direction === 'up')) {
        const newCameraY = this.y + this.velocity;
        const newPlayerY = player.y - this.velocity;

        if (!player.movementStrategy.checkCollision(player, player.x, newPlayerY)) {
            this.y = newCameraY; 
            cameraMove = true;
        }
    }
    // Pan down
    if (cameraboxDownSide >= this.canvasHeight && Math.abs(this.y) < this.mapHeight - this.canvasHeight &&
       (player.direction === 'down')) {
        const newCameraY = this.y - this.velocity;
        const newPlayerY = player.y + this.velocity;

        if (!player.movementStrategy.checkCollision(player, player.x, newPlayerY)) {
            this.y = newCameraY;
            cameraMove = true;
        }
    }
    // Pan up-right
    if ((cameraboxUpSide < 0 || cameraboxRightSide >= this.canvasWidth) && this.y < 0 && Math.abs(this.x) < this.mapWidth - this.canvasWidth &&
       (player.direction === 'up-right')) {
        const newCameraX = this.x - this.velocity;
        const newCameraY = this.y + this.velocity;
        const newPlayerX = player.x + this.velocity;
        const newPlayerY = player.y - this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, newPlayerY) && !player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
            this.y = newCameraY;
            cameraMove = true;
        }
    }
    // Pan down-right
    if ((cameraboxDownSide >= this.canvasHeight || cameraboxRightSide >= this.canvasWidth) && Math.abs(this.y) < this.mapHeight - this.canvasHeight && Math.abs(this.x) < this.mapWidth - this.canvasWidth &&
       (player.direction === 'down-right')) {
        const newCameraX = this.x - this.velocity;
        const newCameraY = this.y - this.velocity;
        const newPlayerX = player.x + this.velocity;
        const newPlayerY = player.y + this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, newPlayerY) && !player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
            this.y = newCameraY;
            cameraMove = true;
        }
    }
    // Pan up-left
    if ((cameraboxUpSide < 0 || cameraboxLeftSide < 0) && this.y < 0 && this.x < 0 && 
       (player.direction === 'up-left')) {
        const newCameraX = this.x + this.velocity;
        const newCameraY = this.y + this.velocity;
        const newPlayerX = player.x - this.velocity;
        const newPlayerY = player.y - this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, newPlayerY) && !player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
            this.y = newCameraY;
            cameraMove = true;
        }
    }
    // Pan down-left
    if ((cameraboxDownSide >= this.canvasHeight || cameraboxLeftSide < 0) && Math.abs(this.y) < this.mapHeight - this.canvasHeight && this.x < 0 && 
       (player.direction === 'down-left')) {
        const newCameraX = this.x + this.velocity;
        const newCameraY = this.y - this.velocity;
        const newPlayerX = player.x - this.velocity;
        const newPlayerY = player.y + this.velocity;

        if (!player.movementStrategy.checkCollision(player, newPlayerX, newPlayerY) && !player.movementStrategy.checkCollision(player, newPlayerX, player.y)) {
            this.x = newCameraX; 
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
    context.restore();
  }

  setZoom(zoom) {
    this.zoom = zoom;
  }
}

export default Camera;
