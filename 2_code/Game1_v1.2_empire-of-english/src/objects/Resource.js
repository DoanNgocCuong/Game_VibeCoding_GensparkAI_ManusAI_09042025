/**
 * Resource base class
 * Base class for collectible resources
 */

class Resource {
    constructor(scene, x, y, type, texture) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.type = type;
        
        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, texture);
        
        // Add to physics system
        scene.physics.world.enable(this.sprite);
        
        // Set properties
        this.sprite.setInteractive();
        this.active = true;
        this.highlighted = false;
        
        // Create highlight effect (initially hidden)
        this.highlightEffect = scene.add.circle(x, y, 20, CONSTANTS.COLORS.HIGHLIGHT, 0.3)
            .setVisible(false);
    }
    
    /**
     * Set highlight state
     * @param {boolean} highlighted - Whether to highlight the resource
     */
    setHighlight(highlighted) {
        if (this.highlighted !== highlighted) {
            this.highlighted = highlighted;
            this.highlightEffect.setVisible(highlighted);
            
            if (highlighted) {
                // Add pulse animation to highlight
                if (!this.highlightTween) {
                    this.highlightTween = this.scene.tweens.add({
                        targets: this.highlightEffect,
                        scale: { from: 0.8, to: 1.2 },
                        alpha: { from: 0.3, to: 0.5 },
                        duration: 800,
                        yoyo: true,
                        repeat: -1
                    });
                } else {
                    this.highlightTween.resume();
                }
            } else if (this.highlightTween) {
                this.highlightTween.pause();
            }
        }
    }
    
    /**
     * Check if resource is active
     * @returns {boolean} Whether the resource is active
     */
    isActive() {
        return this.active;
    }
    
    /**
     * Collect the resource
     */
    collect() {
        this.active = false;
        this.sprite.setVisible(false);
        this.highlightEffect.setVisible(false);
        
        if (this.highlightTween) {
            this.highlightTween.pause();
        }
    }
    
    /**
     * Respawn the resource
     */
    respawn() {
        this.active = true;
        this.sprite.setVisible(true);
        this.setHighlight(false);
    }
    
    /**
     * Get bounds of the resource sprite
     * @returns {Phaser.Geom.Rectangle} Bounds rectangle
     */
    getBounds() {
        return this.sprite.getBounds();
    }
}
