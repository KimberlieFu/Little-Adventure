class PlayerState {
    constructor(player) {
        this.player = player;
    }

    getAnimationDirection() {
        return 'idle';
    }

    update() {
        throw new Error('Update method must be implemented.');
    }

    animate() {
        throw new Error('Animate method must be implemented.');
    }
}

export default PlayerState;
