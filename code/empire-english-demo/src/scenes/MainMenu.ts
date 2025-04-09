import Phaser from 'phaser';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    // Title
    this.add.text(400, 200, 'Empire of English', { fontSize: '32px' }).setOrigin(0.5);
    
    // Play button
    const playButton = this.add.image(400, 300, 'button')
      .setInteractive()
      .setScale(2);
    
    this.add.text(400, 300, 'Play Demo', { fontSize: '20px' }).setOrigin(0.5);
    
    playButton.on('pointerdown', () => {
      this.scene.start('Game');
    });
  }
} 