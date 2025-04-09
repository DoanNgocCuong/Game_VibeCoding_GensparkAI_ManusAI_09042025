/**
 * Game Scene
 * Main gameplay scene with map, villager, and resources
 */

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.villager = null;
        this.resources = [];
        this.quizManager = new QuizManager();
        this.activeResource = null;
        this.buildMode = false;
        this.townCenterPlaced = false;
    }

    create() {
        // Create simple background
        this.createBackground();
        
        // Create villager
        this.createVillager();
        
        // Create resources
        this.createResources();
        
        // Set up input handlers
        this.setupInput();
        
        // Set up collision detection
        this.setupCollisions();
        
        // Initialize game state
        this.game.globals.gameState.quizActive = false;
        this.game.globals.gameState.buildMode = false;
        this.game.globals.gameState.townCenterBuilt = false;
        
        // Create event emitter for communication between scenes
        this.events.on('quiz:start', this.handleQuizStart, this);
        this.events.on('quiz:end', this.handleQuizEnd, this);
        this.events.on('build:start', this.handleBuildStart, this);
        this.events.on('build:cancel', this.handleBuildCancel, this);
        this.events.on('build:complete', this.handleBuildComplete, this);
    }

    update() {
        // Update villager movement
        if (this.villager && !this.game.globals.gameState.quizActive) {
            this.villager.update();
        }
        
        // Update resources (highlight when villager is nearby)
        this.updateResources();
        
        // Handle build mode if active
        if (this.game.globals.gameState.buildMode) {
            this.updateBuildMode();
        }
    }

    /**
     * Create a simple tiled background
     */
    createBackground() {
        // Create a simple grid background
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x333333, 0.3);
        
        // Draw vertical lines
        for (let x = 0; x < this.cameras.main.width; x += 32) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, this.cameras.main.height);
        }
        
        // Draw horizontal lines
        for (let y = 0; y < this.cameras.main.height; y += 32) {
            graphics.moveTo(0, y);
            graphics.lineTo(this.cameras.main.width, y);
        }
        
        graphics.strokePath();
    }

    /**
     * Create the player-controlled villager
     */
    createVillager() {
        this.villager = new Villager(
            this,
            CONSTANTS.VILLAGER_START_X,
            CONSTANTS.VILLAGER_START_Y
        );
    }

    /**
     * Create resource objects on the map
     */
    createResources() {
        // Create food resources (nouns)
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, this.cameras.main.width - 50);
            const y = Phaser.Math.Between(50, this.cameras.main.height - 50);
            
            const foodResource = new FoodResource(this, x, y);
            this.resources.push(foodResource);
        }
        
        // Create wood resources (verbs)
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, this.cameras.main.width - 50);
            const y = Phaser.Math.Between(50, this.cameras.main.height - 50);
            
            const woodResource = new WoodResource(this, x, y);
            this.resources.push(woodResource);
        }
    }

    /**
     * Set up input handlers
     */
    setupInput() {
        // Handle mouse click for movement and interaction
        this.input.on('pointerdown', (pointer) => {
            // Ignore clicks when quiz is active
            if (this.game.globals.gameState.quizActive) return;
            
            // Check if clicked on a resource
            let resourceClicked = false;
            
            this.resources.forEach(resource => {
                if (resource.isActive() && Phaser.Geom.Rectangle.Contains(
                    resource.getBounds(),
                    pointer.x,
                    pointer.y
                )) {
                    resourceClicked = true;
                    this.handleResourceClick(resource);
                }
            });
            
            // If in build mode, handle building placement
            if (this.game.globals.gameState.buildMode && !resourceClicked) {
                this.placeTownCenter(pointer.x, pointer.y);
                return;
            }
            
            // If no resource was clicked, move the villager
            if (!resourceClicked) {
                this.villager.moveTo(pointer.x, pointer.y);
            }
        });
    }

    /**
     * Set up collision detection
     */
    setupCollisions() {
        // Add collision detection between villager and resources
        this.physics.add.overlap(
            this.villager,
            this.resources.map(r => r.sprite),
            (villager, resourceSprite) => {
                // Find the resource object that owns this sprite
                const resource = this.resources.find(r => r.sprite === resourceSprite);
                if (resource) {
                    resource.setHighlight(true);
                }
            }
        );
    }

    /**
     * Update resources (highlight when villager is nearby)
     */
    updateResources() {
        this.resources.forEach(resource => {
            if (resource.isActive()) {
                // Calculate distance between villager and resource
                const distance = Phaser.Math.Distance.Between(
                    this.villager.x,
                    this.villager.y,
                    resource.x,
                    resource.y
                );
                
                // Highlight resource if villager is nearby
                resource.setHighlight(distance < 50);
            }
        });
    }

    /**
     * Handle resource click
     * @param {Resource} resource - The clicked resource
     */
    handleResourceClick(resource) {
        // Only handle click if villager is close enough
        const distance = Phaser.Math.Distance.Between(
            this.villager.x,
            this.villager.y,
            resource.x,
            resource.y
        );
        
        if (distance < 50) {
            this.activeResource = resource;
            
            // Get a quiz question for this resource type
            const question = this.quizManager.getRandomQuestion(resource.type);
            
            // Emit event to show quiz popup in UI scene
            this.events.emit('quiz:show', {
                question: question,
                resourceType: resource.type
            });
            
            // Set game state
            this.game.globals.gameState.quizActive = true;
        } else {
            // Move villager closer to the resource
            this.villager.moveTo(resource.x, resource.y);
        }
    }

    /**
     * Handle quiz start event
     */
    handleQuizStart() {
        this.game.globals.gameState.quizActive = true;
    }

    /**
     * Handle quiz end event
     * @param {Object} result - Quiz result object
     */
    handleQuizEnd(result) {
        this.game.globals.gameState.quizActive = false;
        
        if (result.correct && this.activeResource) {
            // Add resources
            if (this.activeResource.type === 'food') {
                this.game.globals.resources.food += CONSTANTS.RESOURCE_REWARD;
            } else if (this.activeResource.type === 'wood') {
                this.game.globals.resources.wood += CONSTANTS.RESOURCE_REWARD;
            }
            
            // Deactivate resource (will respawn later)
            this.activeResource.collect();
            
            // Schedule resource respawn
            this.time.delayedCall(CONSTANTS.RESOURCE_RESPAWN_TIME, () => {
                if (this.activeResource) {
                    this.activeResource.respawn();
                }
            });
            
            // Update UI
            this.events.emit('resources:update', this.game.globals.resources);
        }
        
        this.activeResource = null;
    }

    /**
     * Handle build start event
     */
    handleBuildStart() {
        this.game.globals.gameState.buildMode = true;
        
        // Show build placement indicator
        this.buildIndicator = this.add.image(0, 0, 'town_center')
            .setAlpha(0.5)
            .setVisible(false);
        
        // Follow mouse cursor
        this.input.on('pointermove', (pointer) => {
            if (this.game.globals.gameState.buildMode) {
                this.buildIndicator.setPosition(pointer.x, pointer.y);
                this.buildIndicator.setVisible(true);
            }
        });
    }

    /**
     * Update build mode
     */
    updateBuildMode() {
        // Nothing to do here for now
    }

    /**
     * Handle build cancel event
     */
    handleBuildCancel() {
        this.game.globals.gameState.buildMode = false;
        
        if (this.buildIndicator) {
            this.buildIndicator.destroy();
            this.buildIndicator = null;
        }
    }

    /**
     * Place town center at the specified position
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    placeTownCenter(x, y) {
        // Store position for later
        this.townCenterPosition = { x, y };
        
        // Hide build indicator
        if (this.buildIndicator) {
            this.buildIndicator.setVisible(false);
        }
        
        // Get a building challenge
        const challenge = this.quizManager.getRandomBuildingChallenge();
        
        // Emit event to show building challenge in UI scene
        this.events.emit('building:challenge', {
            question: challenge
        });
    }

    /**
     * Handle build complete event
     * @param {Object} result - Build result object
     */
    handleBuildComplete(result) {
        if (result.success) {
            // Deduct resources
            this.game.globals.resources.food -= CONSTANTS.TOWN_CENTER_FOOD_COST;
            this.game.globals.resources.wood -= CONSTANTS.TOWN_CENTER_WOOD_COST;
            
            // Update UI
            this.events.emit('resources:update', this.game.globals.resources);
            
            // Create town center
            this.createTownCenter();
        }
        
        // Exit build mode
        this.game.globals.gameState.buildMode = false;
        
        if (this.buildIndicator) {
            this.buildIndicator.destroy();
            this.buildIndicator = null;
        }
    }

    /**
     * Create town center building
     */
    createTownCenter() {
        // Create town center at the stored position
        const townCenter = this.add.image(
            this.townCenterPosition.x,
            this.townCenterPosition.y,
            'town_center'
        );
        
        // Add scale-up animation
        townCenter.setScale(0.1);
        this.tweens.add({
            targets: townCenter,
            scale: 1,
            duration: 1000,
            ease: 'Bounce.Out'
        });
        
        // Update game state
        this.game.globals.gameState.townCenterBuilt = true;
        
        // Emit event to update UI
        this.events.emit('building:complete');
    }
}
