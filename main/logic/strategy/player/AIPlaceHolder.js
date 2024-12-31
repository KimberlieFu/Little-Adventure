import MovementStrategy from './MovementStrategy.js';

class AIPlayerMovementStrategy extends MovementStrategy {
    move(player) {
        // AI-based movement logic (just as a placeholder)
        player.x += player.speed;
        player.y += player.speed;
    }
}

export default AIPlayerMovementStrategy;
