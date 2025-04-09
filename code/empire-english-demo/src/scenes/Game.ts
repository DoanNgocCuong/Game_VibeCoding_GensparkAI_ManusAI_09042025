import Phaser from 'phaser';
import LanguageQuiz from '../utils/LanguageQuiz';

interface Resource extends Phaser.Physics.Arcade.Sprite {
    resourceType: string;
    resourceIndex: number;
}

export default class Game extends Phaser.Scene {
    private villager!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private resources!: Phaser.Physics.Arcade.Group;
    private buildings!: Phaser.Physics.Arcade.StaticGroup;
    private foodText!: Phaser.GameObjects.Text;
    private woodText!: Phaser.GameObjects.Text;
    
    // Game state
    private food: number = 0;
    private wood: number = 0;
    private wordData: any;
    private quiz!: LanguageQuiz;
    private isQuizActive: boolean = false;
    private isBuildMode: boolean = false;

    constructor() {
        super('Game');
    }

    create() {
        // Load word data
        this.wordData = this.cache.json.get('wordData');
        if (!this.wordData) {
            console.error('Failed to load word data');
            return;
        }
        
        // Add background
        this.add.image(400, 300, 'background').setScale(2);
        
        // Create quiz helper
        this.quiz = new LanguageQuiz(this);
        
        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Create villager with appropriate scale
        this.villager = this.physics.add.sprite(400, 300, 'villager');
        this.villager.setScale(0.5);
        this.villager.setCollideWorldBounds(true);
        
        // Create resource groups
        this.resources = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite
        });
        
        // Create building groups
        this.buildings = this.physics.add.staticGroup();
        
        // Create UI
        this.createUI();
        
        // Create resources
        this.createResources();
        
        // Setup collisions
        this.physics.add.overlap(
            this.villager, 
            this.resources, 
            this.handleResourceCollection, 
            undefined, 
            this
        );
    }

    update() {
        // Don't move during quiz or build mode
        if (!this.isQuizActive && !this.isBuildMode) {
            this.moveVillager();
        }
    }

    createUI() {
        // UI background
        this.add.rectangle(400, 30, 800, 60, 0x000000, 0.5).setOrigin(0.5, 0.5);
        
        // Resource display
        this.add.image(100, 30, 'food').setScale(0.3);
        this.foodText = this.add.text(130, 30, '0', { fontSize: '24px' }).setOrigin(0, 0.5);
        
        this.add.image(200, 30, 'wood').setScale(0.3);
        this.woodText = this.add.text(230, 30, '0', { fontSize: '24px' }).setOrigin(0, 0.5);
        
        // Build button
        const buildButton = this.add.image(700, 30, 'button')
            .setInteractive()
            .setScale(0.3);
        
        this.add.text(700, 30, 'Build', { fontSize: '16px' }).setOrigin(0.5);
        
        buildButton.on('pointerdown', () => {
            if (!this.isQuizActive && !this.isBuildMode) {
                this.showBuildMenu();
            }
        });
    }

    createResources() {
        // Create food resources
        for(let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(100, 550);
            const food = this.resources.create(x, y, 'food') as Resource;
            food.resourceType = 'food';
            food.resourceIndex = i % this.wordData.nouns.length;
            food.setScale(0.3);
        }
        
        // Create wood resources
        for(let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(100, 550);
            const wood = this.resources.create(x, y, 'wood') as Resource;
            wood.resourceType = 'wood';
            wood.resourceIndex = i % this.wordData.verbs.length;
            wood.setScale(0.3);
        }
    }

    moveVillager() {
        // Reset velocity
        this.villager.setVelocity(0);

        // Check arrow keys
        if (this.cursors.left.isDown) {
            this.villager.setVelocityX(-150);
            this.villager.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.villager.setVelocityX(150);
            this.villager.flipX = false;
        }

        if (this.cursors.up.isDown) {
            this.villager.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.villager.setVelocityY(150);
        }
    }

    handleResourceCollection(villager: Phaser.Types.Physics.Arcade.GameObjectWithBody, resource: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        if (this.isQuizActive || this.isBuildMode) return;
        
        this.isQuizActive = true;
        
        // Disable resource temporarily
        const resourceSprite = resource as Phaser.GameObjects.Sprite;
        resourceSprite.setActive(false);
        resourceSprite.setVisible(false);
        
        const resourceObj = resource as Resource;
        
        if (resourceObj.resourceType === 'food') {
            // Show noun quiz
            const nounData = this.wordData.nouns[resourceObj.resourceIndex];
            this.quiz.showQuiz(
                nounData.question,
                nounData.word,
                // On correct answer
                () => {
                    this.food += 10;
                    this.foodText.setText(this.food.toString());
                    resourceObj.destroy();
                    this.isQuizActive = false;
                },
                // On wrong answer
                () => {
                    // Reactivate resource
                    resourceObj.setActive(true).setVisible(true);
                    this.isQuizActive = false;
                }
            );
        } else if (resourceObj.resourceType === 'wood') {
            // Show verb quiz
            const verbData = this.wordData.verbs[resourceObj.resourceIndex];
            this.quiz.showQuiz(
                verbData.question,
                verbData.word,
                // On correct answer
                () => {
                    this.wood += 10;
                    this.woodText.setText(this.wood.toString());
                    resourceObj.destroy();
                    this.isQuizActive = false;
                },
                // On wrong answer
                () => {
                    // Reactivate resource
                    resourceObj.setActive(true).setVisible(true);
                    this.isQuizActive = false;
                }
            );
        }
    }

    showBuildMenu() {
        // Create menu background
        const menuBg = this.add.rectangle(400, 300, 300, 200, 0x000000, 0.8);
        menuBg.setInteractive();
        
        // Menu title
        this.add.text(400, 220, 'Build', { fontSize: '24px' }).setOrigin(0.5);
        
        // Town Center build button
        const buildButton = this.add.image(400, 280, 'button')
            .setInteractive()
            .setScale(1.5);
        
        this.add.text(400, 280, 'Town Center (20 Food, 30 Wood)', 
            { fontSize: '16px' }).setOrigin(0.5);
        
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
                const errorText = this.add.text(400, 340, 'Not enough resources!', 
                    { fontSize: '18px', color: '#f44' }).setOrigin(0.5);
                    
                // Remove error after 2 seconds
                this.time.delayedCall(2000, () => {
                    errorText.destroy();
                });
            }
        });
        
        // Handle close button
        closeButton.on('pointerdown', () => {
            menuBg.destroy();
            buildButton.destroy();
            closeButton.destroy();
        });
    }

    startBuildMode() {
        this.isBuildMode = true;
        
        // Create Town Center preview
        const preview = this.add.image(400, 300, 'townCenter')
            .setAlpha(0.5)
            .setScale(0.5);
        
        // Follow pointer
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            preview.x = pointer.x;
            preview.y = pointer.y;
        });
        
        // Handle click to place building
        this.input.once('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Create Town Center at click position
            const townCenter = this.buildings.create(pointer.x, pointer.y, 'townCenter');
            
            // Build effect
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
            this.isBuildMode = false;
        });
    }

    showVictoryMessage() {
        // Show completion message
        const bg = this.add.rectangle(400, 300, 600, 400, 0x000000, 0.8);
        
        this.add.text(400, 250, 'Congratulations!', 
            { fontSize: '32px', color: '#ff0' }).setOrigin(0.5);
        this.add.text(400, 300, 'You have successfully built your first building', 
            { fontSize: '20px' }).setOrigin(0.5);
        this.add.text(400, 350, 'Demo completed', 
            { fontSize: '24px' }).setOrigin(0.5);
            
        // Add restart button
        const restartButton = this.add.text(400, 400, 'Restart Demo', 
            { fontSize: '24px', backgroundColor: '#4a4', padding: { x: 10, y: 5 } })
            .setOrigin(0.5)
            .setInteractive();
            
        restartButton.on('pointerdown', () => {
            this.scene.restart();
        });
    }
}
