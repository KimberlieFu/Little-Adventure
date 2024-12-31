import GameObject from './GameObject.js';
import IdleState from './state/player/IdleState.js';
import WalkingState from './state/player/WalkingState.js';

class Player extends GameObject {
    constructor(x, y, width, height, image, context) {
        super(x, y, width, height);
        this.image = image;
        this.context = context;
        this.frame = 0;
        this.totalFrames = 13; // Only use 13 valid frames
        this.speed = 5;
        this.frameDelay = 10;
        this.frameCounter = 0;
        this.keys = { w: false, a: false, s: false, d: false };
        this.state = new IdleState(this); // Initial state is idle
    }

    setState(state) {
        this.state = state;
    }

    handleInput() {
        this.state.handleInput();
    }

    update() {
        this.state.update();
    }

    animate() {
        this.state.animate();
    }
}

export default Player;
