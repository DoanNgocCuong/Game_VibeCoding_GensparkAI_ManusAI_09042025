/**
 * Boot Scene
 * Handles asset loading and initial setup
 */

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Display loading text
        const loadingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Loading...',
            {
                font: '20px Arial',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);

        // Create loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(
            this.cameras.main.width / 2 - 160,
            this.cameras.main.height / 2 + 30,
            320,
            50
        );

        // Loading progress events
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(
                this.cameras.main.width / 2 - 150,
                this.cameras.main.height / 2 + 40,
                300 * value,
                30
            );
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load game assets
        
        // Map tiles
        this.load.image('tiles', 'assets/images/map_tiles.png');
        
        // Character and objects
        this.load.image('villager', 'assets/images/villager.png');
        this.load.image('food', 'assets/images/food.png');
        this.load.image('wood', 'assets/images/wood.png');
        this.load.image('town_center', 'assets/images/town_center.png');
        
        // UI elements
        this.load.image('button', 'assets/images/ui/button.png');
        this.load.image('panel', 'assets/images/ui/panel.png');
        this.load.image('food_icon', 'assets/images/ui/food_icon.png');
        this.load.image('wood_icon', 'assets/images/ui/wood_icon.png');
    }

    create() {
        // Create placeholder assets if they don't exist
        this.createPlaceholderAssets();
        
        // Start the game scene
        this.scene.start('GameScene');
        this.scene.start('UIScene');
    }

    /**
     * Create placeholder assets for development
     * This ensures the game can run even without actual asset files
     */
    createPlaceholderAssets() {
        // Create a temporary canvas for each missing asset
        const missingAssets = [
            { key: 'villager', color: 0x3498db, width: 32, height: 32 },
            { key: 'food', color: 0xe74c3c, width: 24, height: 24 },
            { key: 'wood', color: 0x8e44ad, width: 24, height: 24 },
            { key: 'town_center', color: 0xf1c40f, width: 64, height: 64 },
            { key: 'tiles', color: 0x2ecc71, width: 32, height: 32 },
            { key: 'button', color: 0x3498db, width: 100, height: 30 },
            { key: 'panel', color: 0x34495e, width: 300, height: 200 },
            { key: 'food_icon', color: 0xe74c3c, width: 16, height: 16 },
            { key: 'wood_icon', color: 0x8e44ad, width: 16, height: 16 }
        ];

        missingAssets.forEach(asset => {
            if (!this.textures.exists(asset.key)) {
                const graphics = this.make.graphics();
                graphics.fillStyle(asset.color);
                graphics.fillRect(0, 0, asset.width, asset.height);
                
                // For specific assets, add identifying marks
                if (asset.key === 'villager') {
                    graphics.fillStyle(0xffffff);
                    graphics.fillRect(8, 8, 16, 16);
                } else if (asset.key === 'food') {
                    graphics.fillStyle(0xffffff);
                    graphics.fillCircle(12, 12, 6);
                } else if (asset.key === 'wood') {
                    graphics.fillStyle(0x795548);
                    graphics.fillRect(8, 4, 8, 16);
                }
                
                graphics.generateTexture(asset.key, asset.width, asset.height);
                graphics.destroy();
            }
        });
    }
}
