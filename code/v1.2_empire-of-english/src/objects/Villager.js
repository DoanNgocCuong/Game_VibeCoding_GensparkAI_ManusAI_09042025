/**
 * Villager class
 * Player-controlled character
 */

class Villager extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'villager');
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set physics properties
        this.setCollideWorldBounds(true);
        
        // Movement properties
        this.moveTarget = null;
        this.speed = CONSTANTS.VILLAGER_SPEED;
        
        // Set up input handlers
        this.setupInput();
    }
    
    /**
     * Set up keyboard input for movement
     */
    setupInput() {
        // Create cursor keys
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
        // Add WASD keys
        this.wasd = {
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
    }
    
    /**
     * Update method called each frame
     */
    update() {
        // Handle keyboard movement
        this.handleKeyboardMovement();
        
        // Handle target movement (from mouse clicks)
        this.handleTargetMovement();
    }
    
    /**
     * Handle keyboard movement
     */
    handleKeyboardMovement() {
        // Reset velocity
        this.setVelocity(0);
        
        // Clear move target when using keyboard
        if (this.isAnyDirectionKeyDown()) {
            this.moveTarget = null;
        }
        
        // Handle up/down movement
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.setVelocityY(this.speed);
        }
        
        // Handle left/right movement
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.setVelocityX(this.speed);
        }
        
        // Normalize diagonal movement
        this.normalizeDiagonalMovement();
    }
    
    /**
     * Check if any direction key is pressed
     * @returns {boolean} Whether any direction key is pressed
     */
    isAnyDirectionKeyDown() {
        return (
            this.cursors.up.isDown || this.wasd.up.isDown ||
            this.cursors.down.isDown || this.wasd.down.isDown ||
            this.cursors.left.isDown || this.wasd.left.isDown ||
            this.cursors.right.isDown || this.wasd.right.isDown
        );
    }
    
    /**
     * Normalize diagonal movement to prevent faster diagonal speed
     */
    normalizeDiagonalMovement() {
        const velocity = this.body.velocity;
        
        if (velocity.x !== 0 && velocity.y !== 0) {
            const normalizedVelocity = new Phaser.Math.Vector2(velocity.x, velocity.y).normalize().scale(this.speed);
            this.setVelocity(normalizedVelocity.x, normalizedVelocity.y);
        }
    }
    
    /**
     * Handle movement to target position (from mouse clicks)
     */
    handleTargetMovement() {
        if (this.moveTarget) {
            // Calculate distance to target
            const distance = Phaser.Math.Distance.Between(
                this.x, this.y,
                this.moveTarget.x, this.moveTarget.y
            );
            
            // If we're close enough to the target, stop moving
            if (distance < 5) {
                this.setVelocity(0);
                this.moveTarget = null;
                return;
            }
            
            // Move towards target
            const angle = Phaser.Math.Angle.Between(
                this.x, this.y,
                this.moveTarget.x, this.moveTarget.y
            );
            
            // Calculate velocity based on angle
            const velocityX = Math.cos(angle) * this.speed;
            const velocityY = Math.sin(angle) * this.speed;
            
            // Set velocity
            this.setVelocity(velocityX, velocityY);
        }
    }
    
    /**
     * Move to the specified position
     * @param {number} x - Target X coordinate
     * @param {number} y - Target Y coordinate
     */
    moveTo(x, y) {
        this.moveTarget = { x, y };
    }
}
