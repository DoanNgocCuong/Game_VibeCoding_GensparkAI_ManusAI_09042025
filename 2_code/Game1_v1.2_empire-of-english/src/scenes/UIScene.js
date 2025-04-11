/**
 * UI Scene
 * Overlay scene for UI elements that persist across gameplay
 */

class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
        this.resourceBar = null;
        this.buildMenu = null;
        this.quizPopup = null;
    }

    create() {
        // Create UI components
        this.createResourceBar();
        this.createBuildMenu();
        
        // Set up event listeners for communication with GameScene
        this.setupEventListeners();
    }

    /**
     * Create resource bar UI component
     */
    createResourceBar() {
        this.resourceBar = new ResourceBar(
            this,
            CONSTANTS.UI_PADDING,
            CONSTANTS.UI_PADDING,
            this.game.globals.resources
        );
    }

    /**
     * Create build menu UI component
     */
    createBuildMenu() {
        this.buildMenu = new BuildMenu(
            this,
            this.cameras.main.width - CONSTANTS.UI_PADDING,
            this.cameras.main.height - CONSTANTS.UI_PADDING
        );
        
        // Initially disable build button
        this.buildMenu.setButtonEnabled(false);
    }

    /**
     * Set up event listeners for communication with GameScene
     */
    setupEventListeners() {
        // Listen for resource updates
        const gameScene = this.scene.get('GameScene');
        gameScene.events.on('resources:update', this.updateResources, this);
        
        // Listen for quiz events
        gameScene.events.on('quiz:show', this.showQuiz, this);
        
        // Listen for building challenge events
        gameScene.events.on('building:challenge', this.showBuildingChallenge, this);
        
        // Listen for building complete events
        gameScene.events.on('building:complete', this.handleBuildingComplete, this);
    }

    /**
     * Update resources display
     * @param {Object} resources - Current resource counts
     */
    updateResources(resources) {
        // Update resource bar
        this.resourceBar.updateResources(resources);
        
        // Check if we have enough resources to build town center
        const canBuild = 
            resources.food >= CONSTANTS.TOWN_CENTER_FOOD_COST && 
            resources.wood >= CONSTANTS.TOWN_CENTER_WOOD_COST &&
            !this.game.globals.gameState.townCenterBuilt;
        
        // Enable/disable build button
        this.buildMenu.setButtonEnabled(canBuild);
    }

    /**
     * Show quiz popup
     * @param {Object} data - Quiz data
     */
    showQuiz(data) {
        // Create quiz popup if it doesn't exist
        if (!this.quizPopup) {
            this.quizPopup = new QuizPopup(
                this,
                this.cameras.main.width / 2,
                this.cameras.main.height / 2
            );
        }
        
        // Show quiz with the provided question
        this.quizPopup.show(data.question, data.resourceType);
        
        // Notify GameScene that quiz has started
        const gameScene = this.scene.get('GameScene');
        gameScene.events.emit('quiz:start');
    }

    /**
     * Show building challenge popup
     * @param {Object} data - Building challenge data
     */
    showBuildingChallenge(data) {
        // Create quiz popup if it doesn't exist
        if (!this.quizPopup) {
            this.quizPopup = new QuizPopup(
                this,
                this.cameras.main.width / 2,
                this.cameras.main.height / 2
            );
        }
        
        // Show building challenge with the provided question
        this.quizPopup.showBuildingChallenge(data.question);
    }

    /**
     * Handle building complete event
     */
    handleBuildingComplete() {
        // Disable build button
        this.buildMenu.setButtonEnabled(false);
        
        // Show success message
        this.showMessage('Town Center built successfully!');
    }

    /**
     * Show a temporary message on screen
     * @param {string} text - Message text
     * @param {number} duration - Duration in milliseconds
     */
    showMessage(text, duration = 3000) {
        const message = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 100,
            text,
            {
                font: '24px Arial',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4,
                align: 'center'
            }
        ).setOrigin(0.5);
        
        // Add background
        const bounds = message.getBounds();
        const background = this.add.rectangle(
            bounds.centerX,
            bounds.centerY,
            bounds.width + 20,
            bounds.height + 20,
            CONSTANTS.COLORS.SUCCESS,
            0.8
        ).setOrigin(0.5);
        
        // Ensure background is behind text
        background.setDepth(message.depth - 1);
        
        // Fade out and destroy after duration
        this.tweens.add({
            targets: [message, background],
            alpha: 0,
            duration: 500,
            delay: duration - 500,
            onComplete: () => {
                message.destroy();
                background.destroy();
            }
        });
    }
}
