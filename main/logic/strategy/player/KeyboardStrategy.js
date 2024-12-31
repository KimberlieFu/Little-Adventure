import MovementStrategy from './MovementStrategy.js';

class KeyboardMovementStrategy extends MovementStrategy {
    move(player) {
        // Move player based on keyboard input
        if (player.keys.w) player.y -= player.speed;
        if (player.keys.a) player.x -= player.speed;
        if (player.keys.s) player.y += player.speed;
        if (player.keys.d) player.x += player.speed;
    }
}

export default KeyboardMovementStrategy;