/**
 * FoodResource class
 * Represents food resources (nouns) in the game
 */

class FoodResource extends Resource {
    constructor(scene, x, y) {
        super(scene, x, y, 'food', 'food');
        
        // Add food-specific properties
        this.sprite.setScale(1.2);
        
        // Add a label to indicate this is a noun
        this.label = scene.add.text(x, y - 20, "Noun", {
            font: '12px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setVisible(false);
    }
    
    /**
     * Override setHighlight to also show/hide the label
     * @param {boolean} highlighted - Whether to highlight the resource
     */
    setHighlight(highlighted) {
        super.setHighlight(highlighted);
        this.label.setVisible(highlighted);
    }
    
    /**
     * Override collect to also hide the label
     */
    collect() {
        super.collect();
        this.label.setVisible(false);
    }
    
    /**
     * Override respawn to ensure label is hidden
     */
    respawn() {
        super.respawn();
        this.label.setVisible(false);
    }
}
