import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        // Add error handler for loading errors
        this.load.on('loaderror', (fileObj: any) => {
            console.error('Error loading asset:', fileObj.key);
        });

        // Load all assets with error handling
        const assets = [
            { key: 'background', path: 'assets/background.jpg' },
            { key: 'villager', path: 'assets/villager.jpg' },
            { key: 'food', path: 'assets/food.jpg' },
            { key: 'wood', path: 'assets/wood.jpg' },
            { key: 'townCenter', path: 'assets/town.jpg' },
            { key: 'button', path: 'assets/button.jpg' }
        ];

        // Load each asset
        assets.forEach(asset => {
            this.load.image(asset.key, asset.path);
        });

        // Create loading UI
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBox = this.add.graphics();
        const progressBar = this.add.graphics();
        
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
        
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '20px',
            color: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);
        
        const percentText = this.add.text(width / 2, height / 2, '0%', {
            fontSize: '18px',
            color: '#ffffff'
        });
        percentText.setOrigin(0.5, 0.5);
        
        // Update progress bar
        this.load.on('progress', (value: number) => {
            percentText.setText(parseInt(String(value * 100)) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });
        
        // Clean up and start game
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            
            this.scene.start('Game');
        });
    }
} 