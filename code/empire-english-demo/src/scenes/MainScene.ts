import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    private villager!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private food: number = 0;
    private wood: number = 0;
    private foodText!: Phaser.GameObjects.Text;
    private woodText!: Phaser.GameObjects.Text;
    private resources!: Phaser.Physics.Arcade.Group;
    private buildings!: Phaser.Physics.Arcade.StaticGroup;
    private wordData: any = null;
    private highlightedResource: Phaser.Physics.Arcade.Sprite | null = null;

    constructor() {
        super('MainScene');
    }

    preload() {
        // Load optimized SVG assets
        this.load.svg('villager', 'assets/villager.svg');
        this.load.svg('food', 'assets/food.svg');
        this.load.svg('wood', 'assets/wood.svg');
        this.load.svg('townCenter', 'assets/townCenter.svg');
        this.load.svg('button', 'assets/button.svg');
        this.load.json('wordData', 'assets/data/wordData.json');
    }

    create() {
        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create villager
        this.villager = this.physics.add.sprite(400, 300, 'villager');
        this.villager.setCollideWorldBounds(true);
        this.villager.setScale(0.5);

        // Create groups
        this.resources = this.physics.add.group();
        this.buildings = this.physics.add.staticGroup();

        // Create UI and resources
        this.createUI();
        this.createResources();

        // Load word data
        this.wordData = this.cache.json.get('wordData');

        // Setup resource highlighting
        this.physics.add.overlap(
            this.villager,
            this.resources,
            this.highlightResource,
            undefined,
            this
        );

        // Enable click on resources
        this.input.on('gameobjectdown', (pointer: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
            if (obj instanceof Phaser.Physics.Arcade.Sprite && obj.getData('type')) {
                this.handleResourceClick(obj);
            }
        });
    }

    update() {
        this.moveVillager();
        this.updateResourceHighlights();
    }

    private createUI() {
        // Simple UI with emojis
        this.add.text(50, 30, '🍎', { fontSize: '24px' });
        this.foodText = this.add.text(80, 30, '0', { fontSize: '24px' }).setOrigin(0, 0.5);
        
        this.add.text(150, 30, '🌳', { fontSize: '24px' });
        this.woodText = this.add.text(180, 30, '0', { fontSize: '24px' }).setOrigin(0, 0.5);
        
        const buildBtn = this.add.text(700, 30, '🏠 Build', { 
            fontSize: '24px',
            backgroundColor: '#4a4',
            padding: { x: 10, y: 5 }
        })
        .setOrigin(0.5)
        .setInteractive();
        
        buildBtn.on('pointerdown', () => this.tryBuild());
    }

    private createResources() {
        // Create fewer resources
        for (let i = 0; i < 3; i++) {
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(100, 500);
            
            const food = this.resources.create(x, y, 'food')
                .setScale(0.25)
                .setInteractive();
            food.setData('type', 'food');
            food.setData('index', i % this.wordData.nouns.length);
            
            const wx = Phaser.Math.Between(100, 700);
            const wy = Phaser.Math.Between(100, 500);
            
            const wood = this.resources.create(wx, wy, 'wood')
                .setScale(0.25)
                .setInteractive();
            wood.setData('type', 'wood');
            wood.setData('index', i % this.wordData.verbs.length);
        }
    }

    private moveVillager() {
        const speed = 150;
        this.villager.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.villager.setVelocityX(-speed);
            this.villager.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.villager.setVelocityX(speed);
            this.villager.flipX = false;
        }
        if (this.cursors.up.isDown) {
            this.villager.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.villager.setVelocityY(speed);
        }
    }

    private highlightResource(villager: Phaser.Physics.Arcade.Sprite, resource: Phaser.Physics.Arcade.Sprite) {
        if (!resource.getData('highlighted')) {
            resource.setData('highlighted', true);
            this.tweens.add({
                targets: resource,
                scale: 0.35,
                duration: 200,
                ease: 'Quad.easeOut'
            });
        }
        this.highlightedResource = resource;
    }

    private updateResourceHighlights() {
        this.resources.getChildren().forEach((resource: any) => {
            if (resource.getData('highlighted') && resource !== this.highlightedResource) {
                resource.setData('highlighted', false);
                this.tweens.add({
                    targets: resource,
                    scale: 0.25,
                    duration: 200,
                    ease: 'Quad.easeIn'
                });
            }
        });
        this.highlightedResource = null;
    }

    private handleResourceClick(resource: Phaser.Physics.Arcade.Sprite) {
        if (!resource.getData('highlighted')) return;

        const type = resource.getData('type');
        const index = resource.getData('index');
        const data = type === 'food' ? this.wordData.nouns[index] : this.wordData.verbs[index];

        this.showQuizPopup(data, type, resource);
    }

    private showQuizPopup(data: any, type: string, resource: Phaser.Physics.Arcade.Sprite) {
        const bg = this.add.rectangle(400, 300, 500, 300, 0x000000, 0.8);
        
        const title = type === 'food' ? 'Which word is a NOUN?' : 'Which word is a VERB?';
        this.add.text(400, 200, title, { fontSize: '24px' }).setOrigin(0.5);

        // Create 3 options (1 correct, 2 wrong)
        const options = this.createQuizOptions(data.word, type);
        const buttonY = [250, 300, 350];
        
        options.forEach((option, i) => {
            const btn = this.add.text(400, buttonY[i], option, {
                fontSize: '20px',
                backgroundColor: '#4a4',
                padding: { x: 15, y: 10 }
            })
            .setOrigin(0.5)
            .setInteractive();

            btn.on('pointerdown', () => {
                if (option === data.word) {
                    // Correct answer
                    if (type === 'food') {
                        this.food += 10;
                        this.foodText.setText(this.food.toString());
                    } else {
                        this.wood += 10;
                        this.woodText.setText(this.wood.toString());
                    }
                    
                    // Success effect
                    this.tweens.add({
                        targets: resource,
                        alpha: 0,
                        scale: 0,
                        duration: 500,
                        onComplete: () => resource.destroy()
                    });

                    // Close popup
                    this.tweens.add({
                        targets: [bg, ...this.children.list.filter(c => c.getData('quiz'))],
                        alpha: 0,
                        duration: 300,
                        onComplete: () => {
                            bg.destroy();
                            this.children.list
                                .filter(c => c.getData('quiz'))
                                .forEach(c => c.destroy());
                        }
                    });
                } else {
                    // Wrong answer effect
                    btn.setBackgroundColor('#f44');
                    this.time.delayedCall(500, () => {
                        btn.setBackgroundColor('#4a4');
                    });
                }
            });

            btn.setData('quiz', true);
        });
    }

    private createQuizOptions(correct: string, type: string): string[] {
        const options = [correct];
        const pool = type === 'food' ? this.wordData.verbs : this.wordData.nouns;
        
        while (options.length < 3) {
            const word = pool[Phaser.Math.Between(0, pool.length - 1)].word;
            if (!options.includes(word)) {
                options.push(word);
            }
        }
        
        return Phaser.Utils.Array.Shuffle(options);
    }

    private tryBuild() {
        if (this.food >= 20 && this.wood >= 30) {
            this.food -= 20;
            this.wood -= 30;
            this.foodText.setText(this.food.toString());
            this.woodText.setText(this.wood.toString());
            
            const preview = this.add.image(400, 300, 'townCenter')
                .setScale(0.5)
                .setAlpha(0.5);
            
            const place = (pointer: Phaser.Input.Pointer) => {
                this.buildings.create(pointer.x, pointer.y, 'townCenter')
                    .setScale(0.5);
                preview.destroy();
                this.input.off('pointermove', move);
                this.input.off('pointerdown', place);
                this.showVictoryMessage();
            };
            
            const move = (pointer: Phaser.Input.Pointer) => {
                preview.x = pointer.x;
                preview.y = pointer.y;
            };
            
            this.input.on('pointermove', move);
            this.input.once('pointerdown', place);
        } else {
            this.add.text(400, 400, 'Need 20 food and 30 wood! 🏗️', {
                fontSize: '20px',
                backgroundColor: '#f44',
                padding: { x: 10, y: 5 }
            })
            .setOrigin(0.5)
            .destroy(2000);
        }
    }

    private showVictoryMessage() {
        const bg = this.add.rectangle(400, 300, 400, 200, 0x000000, 0.8);
        
        this.add.text(400, 250, '🎉 Victory! 🎉', { 
            fontSize: '32px' 
        }).setOrigin(0.5);
        
        const restartBtn = this.add.text(400, 350, 'Play Again 🔄', {
            fontSize: '24px',
            backgroundColor: '#4a4',
            padding: { x: 10, y: 5 }
        })
        .setOrigin(0.5)
        .setInteractive();
        
        restartBtn.on('pointerdown', () => {
            this.scene.restart();
        });
    }
} 
