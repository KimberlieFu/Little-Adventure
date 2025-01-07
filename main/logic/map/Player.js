import GameObject from './GameObject.js';
import IdleState from '../state/player/IdleState.js';
import WalkingState from '../state/player/WalkingState.js';
import OverworldStrategy from '../strategy/player/OverworldStrategy.js';

class Player extends GameObject {
    constructor(x, y, width, height, context, canvasWidth, canvasHeight, animations, mapCollision) {
        super(x, y, width, height);
        this.animations = animations;
        this.keyPressed = false;
        this.frame = 0;
        this.totalFrames = animations.idle.frames;
        this.frameDelay = 10;
        this.frameCounter = 0;
        this.mapCollision = mapCollision;
        this.context = context;
        this.state = new IdleState(this);
        this.movementStrategy = new OverworldStrategy(canvasWidth, canvasHeight, mapCollision);  
        this.direction = null;
        this.currentAnimation = 'idle';
        this.observers = []; 
        this.velocity = 3;
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
        this.movementStrategy.move(this);

        if (!this.movementStrategy.getKeySet().some(key => this.movementStrategy.keys[key])) {
            if (this.state.constructor.name !== 'IdleState') {
                this.setState(new IdleState(this));
            }
            this.keyPressed = false;
        } else {
            if (this.state.constructor.name !== 'WalkingState') {
                this.setState(new WalkingState(this));
            }
            this.keyPressed = true;
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


        // Draw a green box around the player
        this.context.strokeStyle = 'green';
        this.context.lineWidth = 2;       
        this.context.strokeRect(
            this.x - this.width / 2,     
            this.y - this.height / 2,    
            this.width,                   
            this.height                  
        );

        // Draw a circle at the player's x, y position
        this.context.beginPath();
        this.context.arc(this.x, this.y, 5, 0, 2 * Math.PI); // Circle with radius 5
        this.context.fillStyle = 'blue';
        this.context.fill();
        this.context.closePath();
    }
}

export default Player;