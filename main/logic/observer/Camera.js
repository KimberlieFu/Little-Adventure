class Camera {
  constructor(canvasWidth, canvasHeight, mapWidth, mapHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.lerpFactor = 0.5;
    this.velocity = 0;
    this.camerabox = {
      position: { x: 0, y:0 },
      width: 500,
      height: 300,
    }
    this.x = 0;
    this.y = 0;
    this.velocity = 6;
  }

  setVelocity(velocity) {
    this.velocity = velocity;  
  }

  panRight() {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    if (cameraboxRightSide >= this.canvasWidth && Math.abs(this.x) < this.mapWidth - this.canvasWidth) {
      this.x -= this.velocity; 
      
    }
  }

  panLeft() {
    const cameraboxLeftSide = this.camerabox.position.x; 
    if (cameraboxLeftSide < 0 && this.x < 0) {
        this.x += this.velocity;
    }
  }
  

  panUp() {
    const cameraboxUpSide = this.camerabox.position.y; 
    if (cameraboxUpSide < 0 && this.y < 0) {
      this.y += this.velocity;
    }
    console.log(this.y);
  }

  panDown() {
    const cameraboxUpSide = this.camerabox.position.y + this.camerabox.height; 
    if (cameraboxUpSide >= this.canvasHeight && Math.abs(this.y) < this.mapHeight - this.canvasHeight) {
      this.y -= this.velocity;
    }
  }

  update(player) {
    this.camerabox.position.x = player.x - 250;
    this.camerabox.position.y = player.y - 150;
    this.panRight();
    this.panLeft();
    this.panUp();
    this.panDown();
  }


  draw(context) {
    // Save the current canvas state
    context.save();
    context.strokeStyle = "red"; 
    context.lineWidth = 2;

    context.strokeRect(
        this.camerabox.position.x, 
        this.camerabox.position.y, 
        this.camerabox.width,
        this.camerabox.height
    );

    // Restore the canvas state
    context.restore();
  }


  setZoom(zoom) {
    this.zoom = zoom;
  }
}

export default Camera;
