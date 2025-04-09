import Phaser from 'phaser';

export class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    // Show loading bar
    const loadingBar = this.add.image(400, 300, 'loadingBar');
    
    // Load all assets
    this.load.spritesheet('villager', 'assets/images/villager.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('food', 'assets/images/food.png');
    this.load.image('wood', 'assets/images/wood.png');
    this.load.image('townCenter', 'assets/images/townCenter.png');
    this.load.image('button', 'assets/images/button.png');
    this.load.json('wordData', 'assets/data/wordData.json');
  }

  create() {
    // Create animations
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('villager', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.start('MainMenu');
  }
} 