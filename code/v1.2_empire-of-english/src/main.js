/**
 * Empire of English: Conquer Through Communication
 * Main game configuration and initialization
 */

// Remove loading message when game starts
document.getElementById('loading').style.display = 'none';

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        GameScene,
        UIScene
    ]
};

// Create the game instance
const game = new Phaser.Game(config);

// Global game state accessible across scenes
game.globals = {
    resources: {
        food: 0,
        wood: 0
    },
    buildingRequirements: {
        townCenter: {
            food: 30,
            wood: 20
        }
    },
    gameState: {
        quizActive: false,
        buildMode: false,
        townCenterBuilt: false
    }
};
