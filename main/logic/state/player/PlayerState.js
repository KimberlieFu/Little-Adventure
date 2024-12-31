class PlayerState {
    constructor(player) {
        this.player = player;
    }

    handleInput() {
        throw new Error('handleInput method must be implemented.');
    }

    update() {
        throw new Error('update method must be implemented.');
    }

    animate() {
        throw new Error('animate method must be implemented.');
    }
}

export default PlayerState;