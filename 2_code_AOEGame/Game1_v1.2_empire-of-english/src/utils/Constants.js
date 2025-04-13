/**
 * Constants used throughout the game
 */

const CONSTANTS = {
    // Game settings
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    
    // Player settings
    VILLAGER_SPEED: 150,
    VILLAGER_START_X: 400,
    VILLAGER_START_Y: 300,
    
    // Resource settings
    RESOURCE_REWARD: 10,
    RESOURCE_RESPAWN_TIME: 10000, // 10 seconds
    
    // Building requirements
    TOWN_CENTER_FOOD_COST: 30,
    TOWN_CENTER_WOOD_COST: 20,
    
    // UI settings
    UI_PADDING: 10,
    RESOURCE_ICON_SIZE: 24,
    
    // Quiz settings
    QUIZ_WIDTH: 500,
    QUIZ_HEIGHT: 300,
    
    // Colors
    COLORS: {
        PRIMARY: 0x4a6fa5,
        SECONDARY: 0xc28f3d,
        TEXT: 0xffffff,
        BUTTON: 0x4a6fa5,
        BUTTON_HOVER: 0x5d82b8,
        BUTTON_TEXT: 0xffffff,
        PANEL_BACKGROUND: 0x333333,
        PANEL_BORDER: 0x666666,
        HIGHLIGHT: 0xffff00,
        SUCCESS: 0x28a745,
        ERROR: 0xdc3545
    }
};
