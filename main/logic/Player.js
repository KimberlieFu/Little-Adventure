import GameObject from './GameObject.js';
import KeyboardStrategy from './strategy/player/KeyboardStrategy.js';
import IdleState from './state/player/IdleState.js';
import WalkingState from './state/player/WalkingState.js';

class Player extends GameObject {
    constructor(x, y, width, height, context, animations) {
        super(x, y, width, height);
        this.context = context;
        this.animations = animations; 
        this.frame = 0;
        this.totalFrames = animations.idle.frames; 
        this.frameDelay = 10;
        this.frameCounter = 0;
        this.state = new IdleState(this); 
        this.keys = { w: false, a: false, s: false, d: false }; 
        this.movementStrategy = new KeyboardStrategy(); 
        this.currentAnimation = 'idle'; 
        this.init();
    }

    setState(state) {
        this.state = state;
    }

    setMovementStrategy(strategy) {
        this.movementStrategy = strategy;
    }

    setAnimation(type) {
        if (this.animations[type]) {
            this.currentAnimation = type;
            this.frame = 0; // Reset frame to start of the animation
            this.totalFrames = this.animations[type].frames;
        }
    }

    init() {
        // Add event listeners for keyboard input
        window.addEventListener('keydown', (event) => this.movementStrategy.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.movementStrategy.handleKeyUp(event));
    }

    handleInput() {
        this.state.handleInput();
    }

    update() {
        // Use the movement strategy to move the player
        this.movementStrategy.move(this);
        this.state.update();
    }

    animate() {
        const animation = this.animations[this.currentAnimation];
        const frameWidth = animation.image.width / animation.frames;

        this.context.drawImage(
            animation.image,
            this.frame * frameWidth,
            0,
            frameWidth,
            animation.image.height,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    }
}

export default Player;
