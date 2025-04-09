/**
 * QuizPopup class
 * Displays quiz questions and options
 */

class QuizPopup {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.currentQuestion = null;
        this.resourceType = null;
        this.isBuildingChallenge = false;
        
        // Create container for all quiz elements
        this.container = scene.add.container(x, y);
        this.container.setVisible(false);
        
        // Create background panel
        this.panel = scene.add.rectangle(
            0,
            0,
            CONSTANTS.QUIZ_WIDTH,
            CONSTANTS.QUIZ_HEIGHT,
            CONSTANTS.COLORS.PANEL_BACKGROUND,
            0.9
        ).setOrigin(0.5, 0.5);
        
        // Add border to panel
        this.panel.setStrokeStyle(2, CONSTANTS.COLORS.PANEL_BORDER);
        
        // Add panel to container
        this.container.add(this.panel);
        
        // Create question text
        this.questionText = scene.add.text(
            0,
            -CONSTANTS.QUIZ_HEIGHT / 2 + 40,
            '',
            {
                font: '20px Arial',
                fill: '#ffffff',
                align: 'center',
                wordWrap: { width: CONSTANTS.QUIZ_WIDTH - 40 }
            }
        ).setOrigin(0.5, 0.5);
        
        // Add question text to container
        this.container.add(this.questionText);
        
        // Create option buttons
        this.optionButtons = [];
        this.optionTexts = [];
        
        // Position for first option button
        const buttonY = -20;
        const buttonSpacing = 60;
        
        // Create three option buttons
        for (let i = 0; i < 3; i++) {
            // Create button
            const button = scene.add.rectangle(
                0,
                buttonY + i * buttonSpacing,
                CONSTANTS.QUIZ_WIDTH - 80,
                40,
                CONSTANTS.COLORS.BUTTON,
                1
            ).setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true });
            
            // Create button text
            const text = scene.add.text(
                0,
                buttonY + i * buttonSpacing,
                '',
                {
                    font: '16px Arial',
                    fill: '#ffffff',
                    align: 'center'
                }
            ).setOrigin(0.5, 0.5);
            
            // Add hover effect
            button.on('pointerover', () => {
                button.fillColor = CONSTANTS.COLORS.BUTTON_HOVER;
            });
            
            button.on('pointerout', () => {
                button.fillColor = CONSTANTS.COLORS.BUTTON;
            });
            
            // Add click handler
            button.on('pointerdown', () => {
                this.handleOptionClick(i);
            });
            
            // Add button and text to container
            this.container.add(button);
            this.container.add(text);
            
            // Store references
            this.optionButtons.push(button);
            this.optionTexts.push(text);
        }
        
        // Create feedback text (initially hidden)
        this.feedbackText = scene.add.text(
            0,
            CONSTANTS.QUIZ_HEIGHT / 2 - 40,
            '',
            {
                font: '18px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5, 0.5)
        .setVisible(false);
        
        // Add feedback text to container
        this.container.add(this.feedbackText);
    }
    
    /**
     * Show quiz popup with the specified question
     * @param {Object} question - Question object
     * @param {string} resourceType - Type of resource ('food' or 'wood')
     */
    show(question, resourceType) {
        this.currentQuestion = question;
        this.resourceType = resourceType;
        this.isBuildingChallenge = false;
        
        // Set question text
        this.questionText.setText(question.question);
        
        // Set option texts
        for (let i = 0; i < question.options.length; i++) {
            this.optionTexts[i].setText(question.options[i]);
        }
        
        // Hide feedback text
        this.feedbackText.setVisible(false);
        
        // Show container with scale animation
        this.container.setVisible(true);
        this.container.setScale(0.1);
        this.scene.tweens.add({
            targets: this.container,
            scale: 1,
            duration: 300,
            ease: 'Back.Out'
        });
    }
    
    /**
     * Show building challenge popup
     * @param {Object} question - Building challenge question object
     */
    showBuildingChallenge(question) {
        this.currentQuestion = question;
        this.isBuildingChallenge = true;
        
        // Set question text
        this.questionText.setText(question.question);
        
        // Set option texts
        for (let i = 0; i < question.options.length; i++) {
            this.optionTexts[i].setText(question.options[i]);
        }
        
        // Hide feedback text
        this.feedbackText.setVisible(false);
        
        // Show container with scale animation
        this.container.setVisible(true);
        this.container.setScale(0.1);
        this.scene.tweens.add({
            targets: this.container,
            scale: 1,
            duration: 300,
            ease: 'Back.Out'
        });
    }
    
    /**
     * Handle option click
     * @param {number} optionIndex - Index of the clicked option
     */
    handleOptionClick(optionIndex) {
        // Check if answer is correct
        const quizManager = new QuizManager();
        const isCorrect = quizManager.checkAnswer(this.currentQuestion, optionIndex);
        
        // Show feedback
        this.feedbackText.setVisible(true);
        
        if (isCorrect) {
            // Show success feedback
            this.feedbackText.setText('Correct!');
            this.feedbackText.setColor('#00ff00');
            
            // Highlight correct option
            this.optionButtons[optionIndex].fillColor = CONSTANTS.COLORS.SUCCESS;
            
            // Hide popup after delay
            this.scene.time.delayedCall(1000, () => {
                this.hide();
                
                // Emit appropriate event based on quiz type
                const gameScene = this.scene.scene.get('GameScene');
                
                if (this.isBuildingChallenge) {
                    gameScene.events.emit('build:complete', { success: true });
                } else {
                    gameScene.events.emit('quiz:end', { 
                        correct: true,
                        resourceType: this.resourceType
                    });
                }
            });
        } else {
            // Show error feedback
            this.feedbackText.setText('Wrong answer, try again!');
            this.feedbackText.setColor('#ff0000');
            
            // Highlight wrong option briefly
            this.optionButtons[optionIndex].fillColor = CONSTANTS.COLORS.ERROR;
            
            // Reset button color after delay
            this.scene.time.delayedCall(1000, () => {
                this.optionButtons[optionIndex].fillColor = CONSTANTS.COLORS.BUTTON;
                this.feedbackText.setVisible(false);
            });
        }
    }
    
    /**
     * Hide quiz popup
     */
    hide() {
        // Hide with scale animation
        this.scene.tweens.add({
            targets: this.container,
            scale: 0.1,
            duration: 300,
            ease: 'Back.In',
            onComplete: () => {
                this.container.setVisible(false);
            }
        });
    }
}
