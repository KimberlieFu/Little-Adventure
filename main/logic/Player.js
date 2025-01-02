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
        this.movementStrategy = new KeyboardStrategy();  
        this.direction = null;
        this.currentAnimation = 'idle';
        this.observers = []; 
        this.velocity = 1;
        this.init();
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
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
            this.frame = 0;
            this.totalFrames = this.animations[type].frames;
        }
    }

    init() {
        window.addEventListener('keydown', (event) => {
            this.movementStrategy.handleKeyDown(event);
        });
        window.addEventListener('keyup', (event) => {
            this.movementStrategy.handleKeyUp(event);
        });
        this.movementStrategy.setSpeed(this.velocity);
    }

    handleInput() {
        // Move the player based on key states
        this.movementStrategy.move(this);

        // State transition logic
        if (!this.movementStrategy.keys.w && !this.movementStrategy.keys.a && !this.movementStrategy.keys.s && !this.movementStrategy.keys.d) {
            // If no keys are pressed, switch to IdleState
            if (this.state.constructor.name !== 'IdleState') {
                this.setState(new IdleState(this));
            }
        } else {
            // If any key is pressed, switch to WalkingState
            if (this.state.constructor.name !== 'WalkingState') {
                this.setState(new WalkingState(this));
            }
        }
    }

    update() {
        this.movementStrategy.move(this);
        this.state.update();
        this.notifyObservers();
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
