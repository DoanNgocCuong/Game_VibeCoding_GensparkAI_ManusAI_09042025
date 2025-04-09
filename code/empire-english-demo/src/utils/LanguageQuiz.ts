export default class LanguageQuiz {
    private scene: Phaser.Scene;
    private background?: Phaser.GameObjects.Rectangle;
    private questionText?: Phaser.GameObjects.Text;
    private inputElement?: HTMLInputElement;
    private submitButton?: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    showQuiz(question: string, correctAnswer: string, onCorrect: () => void, onWrong: () => void) {
        try {
            // Clean up any existing quiz elements
            this.cleanup();
            
            // Create background
            this.background = this.scene.add.rectangle(400, 300, 600, 300, 0x000000, 0.8);
            
            // Add question text
            this.questionText = this.scene.add.text(400, 200, question, {
                fontSize: '24px',
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: 500 }
            }).setOrigin(0.5);
            
            // Create input element
            this.inputElement = document.createElement('input');
            this.inputElement.style.position = 'absolute';
            this.inputElement.style.left = '300px';
            this.inputElement.style.top = '280px';
            this.inputElement.style.width = '200px';
            this.inputElement.style.padding = '8px';
            this.inputElement.style.fontSize = '16px';
            document.body.appendChild(this.inputElement);
            this.inputElement.focus();
            
            // Create submit button
            this.submitButton = this.scene.add.text(400, 350, 'Submit', {
                fontSize: '24px',
                backgroundColor: '#4a4',
                padding: { x: 15, y: 8 }
            })
            .setOrigin(0.5)
            .setInteractive();
            
            // Handle submit
            const handleSubmit = () => {
                if (!this.inputElement) return;
                
                const answer = this.inputElement.value.trim().toLowerCase();
                if (answer === correctAnswer.toLowerCase()) {
                    this.showFeedback('Correct!', '#4a4');
                    this.cleanup();
                    onCorrect();
                } else {
                    this.showFeedback('Try again!', '#f44');
                    this.cleanup();
                    onWrong();
                }
            };
            
            // Add submit button click handler
            this.submitButton.on('pointerdown', handleSubmit);
            
            // Add enter key handler
            this.inputElement.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSubmit();
                }
            });

        } catch (error) {
            console.error('Error showing quiz:', error);
            this.cleanup();
            onWrong(); // Default to wrong answer on error
        }
    }

    private showFeedback(message: string, color: string) {
        try {
            const feedbackText = this.scene.add.text(400, 250, message, {
                fontSize: '32px',
                color: color
            }).setOrigin(0.5);
            
            this.scene.time.delayedCall(1000, () => {
                feedbackText.destroy();
            });
        } catch (error) {
            console.error('Error showing feedback:', error);
        }
    }

    private cleanup() {
        try {
            this.background?.destroy();
            this.questionText?.destroy();
            this.submitButton?.destroy();
            if (this.inputElement && document.body.contains(this.inputElement)) {
                this.inputElement.remove();
            }
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }
} 