/**
 * BuildMenu class
 * Shows available buildings and requirements
 */

class BuildMenu {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        // Create background panel
        this.panel = scene.add.rectangle(
            x - 150,
            y - 60,
            300,
            60,
            CONSTANTS.COLORS.PANEL_BACKGROUND,
            0.7
        ).setOrigin(0.5, 0.5);
        
        // Add border to panel
        this.panel.setStrokeStyle(2, CONSTANTS.COLORS.PANEL_BORDER);
        
        // Create build button
        this.buildButton = scene.add.rectangle(
            x - 150,
            y - 60,
            200,
            40,
            CONSTANTS.COLORS.BUTTON,
            1
        ).setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true });
        
        // Add button text
        this.buildText = scene.add.text(
            x - 150,
            y - 60,
            `Build Town Center\n(${CONSTANTS.TOWN_CENTER_FOOD_COST} Food, ${CONSTANTS.TOWN_CENTER_WOOD_COST} Wood)`,
            {
                font: '14px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5, 0.5);
        
        // Add button hover effect
        this.buildButton.on('pointerover', () => {
            this.buildButton.fillColor = CONSTANTS.COLORS.BUTTON_HOVER;
        });
        
        this.buildButton.on('pointerout', () => {
            this.buildButton.fillColor = CONSTANTS.COLORS.BUTTON;
        });
        
        // Add button click handler
        this.buildButton.on('pointerdown', () => {
            this.handleBuildClick();
        });
        
        // Initially disable button
        this.setButtonEnabled(false);
    }
    
    /**
     * Enable or disable the build button
     * @param {boolean} enabled - Whether the button should be enabled
     */
    setButtonEnabled(enabled) {
        this.buildButton.setInteractive(enabled ? { useHandCursor: true } : false);
        this.buildButton.alpha = enabled ? 1.0 : 0.5;
        this.buildText.alpha = enabled ? 1.0 : 0.5;
    }
    
    /**
     * Handle build button click
     */
    handleBuildClick() {
        // Emit event to start building mode
        const gameScene = this.scene.scene.get('GameScene');
        gameScene.events.emit('build:start');
        
        // Disable button while in build mode
        this.setButtonEnabled(false);
    }
}
