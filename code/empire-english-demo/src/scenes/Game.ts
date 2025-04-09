import Phaser from 'phaser';
import { LanguageQuiz } from '../utils/LanguageQuiz';

export class Game extends Phaser.Scene {
  private villager!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private resources: Phaser.Physics.Arcade.Group;
  private buildings: Phaser.Physics.Arcade.StaticGroup;
  private foodText!: Phaser.GameObjects.Text;
  private woodText!: Phaser.GameObjects.Text;
  private languageQuiz!: LanguageQuiz;
  
  // Game state variables
  private food: number = 0;
  private wood: number = 0;
  private wordData: any;

  constructor() {
    super('Game');
  }

  create() {
    // Load vocabulary data
    this.wordData = this.cache.json.get('wordData');
    
    // Setup controls
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Create villager
    this.villager = this.physics.add.sprite(400, 300, 'villager');
    this.villager.setCollideWorldBounds(true);
    
    // Create resource group
    this.resources = this.physics.add.group();
    
    // Create building group
    this.buildings = this.physics.add.staticGroup();
    
    // Create UI
    this.createUI();
    
    // Spawn resources
    this.createResources();
    
    // Setup collisions
    this.physics.add.overlap(this.villager, this.resources, this.collectResource, null, this);
    
    // Initialize language quiz
    this.languageQuiz = new LanguageQuiz(this, this.wordData);
  }

  update() {
    // Update villager movement
    this.moveVillager();
  }

  private createUI() {
    // UI background
    this.add.rectangle(400, 30, 800, 60, 0x000000, 0.5).setOrigin(0.5, 0.5);
    
    // Resource display
    this.add.image(100, 30, 'food').setScale(0.5);
    this.foodText = this.add.text(130, 30, '0', { fontSize: '24px' }).setOrigin(0, 0.5);
    
    this.add.image(200, 30, 'wood').setScale(0.5);
    this.woodText = this.add.text(230, 30, '0', { fontSize: '24px' }).setOrigin(0, 0.5);
    
    // Build button
    const buildButton = this.add.image(700, 30, 'button')
      .setInteractive()
      .setScale(1.5);
    
    this.add.text(700, 30, 'Build', { fontSize: '16px' }).setOrigin(0.5);
    
    buildButton.on('pointerdown', () => {
      this.showBuildMenu();
    });
  }

  private createResources() {
    // Create 5 food resources randomly
    for(let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(50, 750);
      const y = Phaser.Math.Between(100, 550);
      const food = this.resources.create(x, y, 'food');
      food.setData('type', 'food');
      food.setData('index', i % this.wordData.nouns.length);
    }
    
    // Create 5 wood resources randomly
    for(let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(50, 750);
      const y = Phaser.Math.Between(100, 550);
      const wood = this.resources.create(x, y, 'wood');
      wood.setData('type', 'wood');
      wood.setData('index', i % this.wordData.verbs.length);
    }
  }

  private moveVillager() {
    // Set initial velocity
    this.villager.setVelocity(0);

    // Check arrow keys
    if (this.cursors.left.isDown) {
      this.villager.setVelocityX(-150);
      this.villager.anims.play('walk', true);
      this.villager.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.villager.setVelocityX(150);
      this.villager.anims.play('walk', true);
      this.villager.flipX = false;
    }

    if (this.cursors.up.isDown) {
      this.villager.setVelocityY(-150);
      this.villager.anims.play('walk', true);
    } else if (this.cursors.down.isDown) {
      this.villager.setVelocityY(150);
      this.villager.anims.play('walk', true);
    }

    // Stop animation if not moving
    if (this.villager.body.velocity.x === 0 && this.villager.body.velocity.y === 0) {
      this.villager.anims.stop();
    }
  }

  private collectResource(villager: Phaser.GameObjects.GameObject, resource: Phaser.GameObjects.GameObject) {
    // Temporarily disable resource
    resource.setActive(false).setVisible(false);
    
    const resourceType = resource.getData('type');
    const index = resource.getData('index');
    
    if (resourceType === 'food') {
      // Show noun quiz
      this.languageQuiz.showNounQuiz(index, 
        // Callback for correct answer
        () => {
          this.food += 10;
          this.foodText.setText(this.food.toString());
          resource.destroy();
        },
        // Callback for wrong answer
        () => {
          // Re-enable resource
          resource.setActive(true).setVisible(true);
        }
      );
    } else if (resourceType === 'wood') {
      // Show verb quiz
      this.languageQuiz.showVerbQuiz(index,
        // Callback for correct answer
        () => {
          this.wood += 10;
          this.woodText.setText(this.wood.toString());
          resource.destroy();
        },
        // Callback for wrong answer
        () => {
          // Re-enable resource
          resource.setActive(true).setVisible(true);
        }
      );
    }
  }

  private showBuildMenu() {
    // Create menu background
    const menuBg = this.add.rectangle(400, 300, 300, 200, 0x000000, 0.8);
    menuBg.setInteractive();
    
    // Menu title
    this.add.text(400, 220, 'Build', { fontSize: '24px' }).setOrigin(0.5);
    
    // Build Town Center button
    const buildButton = this.add.image(400, 280, 'button')
      .setInteractive()
      .setScale(1.5);
    
    this.add.text(400, 280, 'Town Center (20 Food, 30 Wood)', { fontSize: '16px' }).setOrigin(0.5);
    
    // Close button
    const closeButton = this.add.text(540, 210, 'X', { fontSize: '24px' })
      .setInteractive()
      .setOrigin(0.5);
    
    // Handle build click
    buildButton.on('pointerdown', () => {
      if (this.food >= 20 && this.wood >= 30) {
        // Enough resources to build
        this.food -= 20;
        this.wood -= 30;
        this.foodText.setText(this.food.toString());
        this.woodText.setText(this.wood.toString());
        
        // Close menu
        menuBg.destroy();
        buildButton.destroy();
        closeButton.destroy();
        
        // Start build mode
        this.startBuildMode();
      } else {
        // Not enough resources
        this.add.text(400, 340, 'Not enough resources!', { fontSize: '18px', color: '#f44' }).setOrigin(0.5);
      }
    });
    
    // Handle close click
    closeButton.on('pointerdown', () => {
      menuBg.destroy();
      buildButton.destroy();
      closeButton.destroy();
    });
  }

  private startBuildMode() {
    // Create Town Center preview
    const preview = this.add.image(400, 300, 'townCenter').setAlpha(0.5);
    
    // Follow cursor
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      preview.x = pointer.x;
      preview.y = pointer.y;
    });
    
    // Handle click to place building
    this.input.once('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Create Town Center at click position
      const townCenter = this.buildings.create(pointer.x, pointer.y, 'townCenter');
      
      // Building effect
      this.tweens.add({
        targets: townCenter,
        alpha: { from: 0, to: 1 },
        duration: 1000,
        ease: 'Linear',
        onComplete: () => {
          // Show victory message
          this.showVictoryMessage();
        }
      });
      
      // Remove preview
      preview.destroy();
    });
  }

  private showVictoryMessage() {
    // Show demo completion message
    const bg = this.add.rectangle(400, 300, 600, 400, 0x000000, 0.8);
    
    this.add.text(400, 250, 'Congratulations!', { fontSize: '32px', color: '#ff0' }).setOrigin(0.5);
    this.add.text(400, 300, 'You have successfully built your first building', { fontSize: '20px' }).setOrigin(0.5);
    this.add.text(400, 350, 'Demo completed', { fontSize: '24px' }).setOrigin(0.5);
  }
} 