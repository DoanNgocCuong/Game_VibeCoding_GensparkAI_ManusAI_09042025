import Phaser from 'phaser';

export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // Load assets needed for loading screen
    this.load.image('loadingBar', 'assets/images/loadingBar.png');
  }

  create() {
    this.scene.start('Preload');
  }
} 