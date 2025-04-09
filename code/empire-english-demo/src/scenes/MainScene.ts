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

    constructor() {
        super('MainScene');
    }

    preload() {
        // Load assets
        this.load.image('background', 'assets/background.png');
        this.load.image('villager', 'assets/villager.png');
        this.load.image('food', 'assets/food.png');
        this.load.image('wood', 'assets/wood.png');
        this.load.image('townCenter', 'assets/townCenter.png');
        this.load.image('button', 'assets/button.png');
        
        // Load word data
        this.load.json('wordData', 'assets/data/wordData.json');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Setup keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create villager
        this.villager = this.physics.add.sprite(400, 300, 'villager');
        this.villager.setCollideWorldBounds(true);

        // Create resource groups
        this.resources = this.physics.add.group();
        this.buildings = this.physics.add.staticGroup();

        // Create UI
        this.createUI();

        // Create initial resources
        this.createResources();

        // Setup collisions
        this.physics.add.overlap(this.villager, this.resources, this.collectResource, undefined, this);

        // Load word data
        this.wordData = this.cache.json.get('wordData');
    }

    update() {
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
        // Create food resources
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(100, 550);
            const food = this.resources.create(x, y, 'food');
            food.setData('type', 'food');
            food.setData('index', i % this.wordData.nouns.length);
        }
        
        // Create wood resources
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(100, 550);
            const wood = this.resources.create(x, y, 'wood');
            wood.setData('type', 'wood');
            wood.setData('index', i % this.wordData.verbs.length);
        }
    }

    private moveVillager() {
        this.villager.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.villager.setVelocityX(-150);
        } else if (this.cursors.right.isDown) {
            this.villager.setVelocityX(150);
        }

        if (this.cursors.up.isDown) {
            this.villager.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.villager.setVelocityY(150);
        }
    }

    private collectResource(villager: Phaser.Physics.Arcade.Sprite, resource: Phaser.Physics.Arcade.Sprite) {
        resource.setActive(false).setVisible(false);
        
        const resourceType = resource.getData('type');
        const index = resource.getData('index');
        
        if (resourceType === 'food') {
            const nounData = this.wordData.nouns[index];
            this.showQuiz(nounData.question, nounData.word, () => {
                this.food += 10;
                this.foodText.setText(this.food.toString());
                resource.destroy();
            }, () => {
                resource.setActive(true).setVisible(true);
            });
        } else if (resourceType === 'wood') {
            const verbData = this.wordData.verbs[index];
            this.showQuiz(verbData.question, verbData.word, () => {
                this.wood += 10;
                this.woodText.setText(this.wood.toString());
                resource.destroy();
            }, () => {
                resource.setActive(true).setVisible(true);
            });
        }
    }

    private showQuiz(question: string, correctAnswer: string, onCorrect: () => void, onWrong: () => void) {
        // Create quiz UI
        const bg = this.add.rectangle(400, 300, 600, 400, 0x000000, 0.8);
        bg.setInteractive();
        
        const questionText = this.add.text(400, 200, question, 
            { fontSize: '24px', align: 'center', wordWrap: { width: 500 } })
            .setOrigin(0.5);
        
        const inputField = document.createElement('input');
        inputField.style.position = 'absolute';
        inputField.style.left = '300px';
        inputField.style.top = '300px';
        inputField.style.width = '200px';
        inputField.style.height = '30px';
        inputField.style.fontSize = '16px';
        document.body.appendChild(inputField);
        
        const submitButton = this.add.text(400, 350, 'Submit', 
            { fontSize: '24px', backgroundColor: '#4a4' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        
        submitButton.on('pointerdown', () => {
            const answer = inputField.value.trim().toLowerCase();
            
            if (answer === correctAnswer.toLowerCase()) {
                const correct = this.add.text(400, 400, 'Correct!', 
                    { fontSize: '24px', color: '#4f4' })
                    .setOrigin(0.5);
                
                this.time.delayedCall(1000, () => {
                    bg.destroy();
                    questionText.destroy();
                    submitButton.destroy();
                    correct.destroy();
                    document.body.removeChild(inputField);
                    onCorrect();
                });
            } else {
                const wrong = this.add.text(400, 400, 'Wrong! Try again.', 
                    { fontSize: '24px', color: '#f44' })
                    .setOrigin(0.5);
                
                this.time.delayedCall(1000, () => {
                    wrong.destroy();
                    onWrong();
                });
            }
        });
        
        setTimeout(() => inputField.focus(), 100);
    }

    private showBuildMenu() {
        const menuBg = this.add.rectangle(400, 300, 300, 200, 0x000000, 0.8);
        menuBg.setInteractive();
        
        this.add.text(400, 220, 'Build', { fontSize: '24px' }).setOrigin(0.5);
        
        const buildButton = this.add.image(400, 280, 'button')
            .setInteractive()
            .setScale(1.5);
        
        this.add.text(400, 280, 'Town Center (20 Food, 30 Wood)', 
            { fontSize: '16px' }).setOrigin(0.5);
        
        const closeButton = this.add.text(540, 210, 'X', { fontSize: '24px' })
            .setInteractive()
            .setOrigin(0.5);
        
        buildButton.on('pointerdown', () => {
            if (this.food >= 20 && this.wood >= 30) {
                this.food -= 20;
                this.wood -= 30;
                this.foodText.setText(this.food.toString());
                this.woodText.setText(this.wood.toString());
                
                menuBg.destroy();
                buildButton.destroy();
                closeButton.destroy();
                
                this.startBuildMode();
            } else {
                this.add.text(400, 340, 'Not enough resources!', 
                    { fontSize: '18px', color: '#f44' }).setOrigin(0.5);
            }
        });
        
        closeButton.on('pointerdown', () => {
            menuBg.destroy();
            buildButton.destroy();
            closeButton.destroy();
        });
    }

    private startBuildMode() {
        const preview = this.add.image(400, 300, 'townCenter').setAlpha(0.5);
        
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            preview.x = pointer.x;
            preview.y = pointer.y;
        });
        
        this.input.once('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const townCenter = this.buildings.create(pointer.x, pointer.y, 'townCenter');
            
            this.tweens.add({
                targets: townCenter,
                alpha: { from: 0, to: 1 },
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.showVictoryMessage();
                }
            });
            
            preview.destroy();
        });
    }

    private showVictoryMessage() {
        const bg = this.add.rectangle(400, 300, 600, 400, 0x000000, 0.8);
        
        this.add.text(400, 250, 'Congratulations!', 
            { fontSize: '32px', color: '#ff0' }).setOrigin(0.5);
        this.add.text(400, 300, 'You have successfully built your first building', 
            { fontSize: '20px' }).setOrigin(0.5);
        this.add.text(400, 350, 'Demo completed', 
            { fontSize: '24px' }).setOrigin(0.5);
    }
} 