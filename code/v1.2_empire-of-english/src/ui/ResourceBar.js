/**
 * ResourceBar class
 * Displays current resource counts
 */

class ResourceBar {
    constructor(scene, x, y, resources) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        // Create background panel
        this.panel = scene.add.rectangle(
            x + 100,
            y + 20,
            200,
            40,
            CONSTANTS.COLORS.PANEL_BACKGROUND,
            0.7
        ).setOrigin(0, 0);
        
        // Add border to panel
        this.panel.setStrokeStyle(2, CONSTANTS.COLORS.PANEL_BORDER);
        
        // Create food icon and text
        this.foodIcon = scene.add.image(x + 20, y + 20, 'food_icon');
        this.foodText = scene.add.text(
            x + 40,
            y + 20,
            `Food: ${resources.food}`,
            {
                font: '16px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0, 0.5);
        
        // Create wood icon and text
        this.woodIcon = scene.add.image(x + 120, y + 20, 'wood_icon');
        this.woodText = scene.add.text(
            x + 140,
            y + 20,
            `Wood: ${resources.wood}`,
            {
                font: '16px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0, 0.5);
    }
    
    /**
     * Update resource display
     * @param {Object} resources - Current resource counts
     */
    updateResources(resources) {
        this.foodText.setText(`Food: ${resources.food}`);
        this.woodText.setText(`Wood: ${resources.wood}`);
    }
}
