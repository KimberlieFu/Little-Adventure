class Camera {
  constructor(canvasWidth, canvasHeight, mapWidth, mapHeight, startX, startY) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.lerpFactor = 0.5;
    this.velocity = 0;
    this.camerabox = {
      position: { x: 0, y:0 },
      width: 300,
      height: 300,
    }
    this.x = startX;
    this.y = startY;
    this.velocity = 6;
  }

  setVelocity(velocity) {
    this.velocity = velocity;  
  }

  pan(player) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    const cameraboxLeftSide = this.camerabox.position.x;
    const cameraboxUpSide = this.camerabox.position.y;
    const cameraboxDownSide = this.camerabox.position.y + this.camerabox.height;
  
    // Pan right
    if (cameraboxRightSide >= this.canvasWidth && Math.abs(this.x) < this.mapWidth - this.canvasWidth && 
       (player.direction === 'right' || player.direction === 'up-right' || player.direction === 'down-right')) {
      this.x -= this.velocity;
    }
    // Pan left
    if (cameraboxLeftSide < 0 && this.x < 0 && 
       (player.direction === 'left' || player.direction === 'up-left' || player.direction === 'down-left')
    ) {
      this.x += this.velocity;
    }
    // Pan up
    if (cameraboxUpSide < 0 && this.y < 0 &&
      (player.direction === 'up' || player.direction === 'up-left' || player.direction === 'up-right')
    ) {

      this.y += this.velocity;
    }
    // Pan down
    if (cameraboxDownSide >= this.canvasHeight && Math.abs(this.y) < this.mapHeight - this.canvasHeight &&
       (player.direction === 'down' || player.direction === 'down-left' || player.direction === 'down-right')) {
      this.y -= this.velocity;
    }
  }
  

  update(player) {
    this.camerabox.position.x = player.x - this.camerabox.width / 2;
    this.camerabox.position.y = player.y - this.camerabox.height / 2;
    if (player.keyPressed === true) this.pan(player);

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
