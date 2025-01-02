class MovementStrategy {
    move(player) {
        throw new Error('Move method must be implemented.');
    }

    getKeyToDirection() {
        throw new Error('Key-Direction method must be implemented.');
    }

    setSpeed(velocity) {
        throw new Error('Set speed method must be implemented.');
    }


    
}

export default MovementStrategy;
