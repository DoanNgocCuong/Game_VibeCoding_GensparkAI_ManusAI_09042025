export default class LanguageQuiz {
    private scene: Phaser.Scene;
    
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
    
    showQuiz(question: string, correctAnswer: string, onCorrect: () => void, onWrong: () => void): void {
        // Create quiz background
        const bg = this.scene.add.rectangle(400, 300, 600, 400, 0x000000, 0.8);
        bg.setDepth(100);
        bg.setInteractive();
        
        // Display question
        const questionText = this.scene.add.text(400, 200, question, 
            { fontSize: '24px', align: 'center', wordWrap: { width: 500 } });
        questionText.setOrigin(0.5);
        questionText.setDepth(100);
        
        // Create input field
        const inputField = document.createElement('input');
        inputField.style.position = 'absolute';
        inputField.style.left = `${window.innerWidth / 2 - 100}px`;
        inputField.style.top = `${window.innerHeight / 2}px`;
        inputField.style.width = '200px';
        inputField.style.height = '30px';
        inputField.style.fontSize = '16px';
        inputField.style.zIndex = '1000';
        document.body.appendChild(inputField);
        
        // Create submit button
        const submitButton = this.scene.add.text(400, 350, 'Submit', 
            { fontSize: '24px', backgroundColor: '#4a4', padding: { x: 10, y: 5 } });
        submitButton.setOrigin(0.5);
        submitButton.setInteractive({ useHandCursor: true });
        submitButton.setDepth(100);
        
        // Handle submit click
        submitButton.on('pointerdown', () => {
            const answer = inputField.value.trim().toLowerCase();
            
            if (answer === correctAnswer.toLowerCase()) {
                // Correct answer
                const correct = this.scene.add.text(400, 400, 'Correct!', 
                    { fontSize: '24px', color: '#4f4' });
                correct.setOrigin(0.5);
                correct.setDepth(100);
                
                // Close quiz after 1 second
                this.scene.time.delayedCall(1000, () => {
                    bg.destroy();
                    questionText.destroy();
                    submitButton.destroy();
                    correct.destroy();
                    document.body.removeChild(inputField);
                    onCorrect();
                });
            } else {
                // Wrong answer
                const wrong = this.scene.add.text(400, 400, 'Wrong! Try again.', 
                    { fontSize: '24px', color: '#f44' });
                wrong.setOrigin(0.5);
                wrong.setDepth(100);
                
                // Remove wrong message after 1 second
                this.scene.time.delayedCall(1000, () => {
                    wrong.destroy();
                    onWrong();
                });
            }
        });
        
        // Focus input field
        setTimeout(() => inputField.focus(), 100);
    }
} 