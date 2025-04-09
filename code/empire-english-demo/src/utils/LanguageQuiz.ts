export class LanguageQuiz {
  private scene: Phaser.Scene;
  private wordData: any;
  
  constructor(scene: Phaser.Scene, wordData: any) {
    this.scene = scene;
    this.wordData = wordData;
  }
  
  showNounQuiz(index: number, onCorrect: () => void, onWrong: () => void) {
    const nounData = this.wordData.nouns[index];
    this.showQuiz(nounData.question, nounData.word, onCorrect, onWrong);
  }
  
  showVerbQuiz(index: number, onCorrect: () => void, onWrong: () => void) {
    const verbData = this.wordData.verbs[index];
    this.showQuiz(verbData.question, verbData.word, onCorrect, onWrong);
  }
  
  private showQuiz(question: string, correctAnswer: string, onCorrect: () => void, onWrong: () => void) {
    // Create quiz background
    const bg = this.scene.add.rectangle(400, 300, 600, 400, 0x000000, 0.8);
    bg.setInteractive();
    
    // Show question
    const questionText = this.scene.add.text(400, 200, question, { fontSize: '24px', align: 'center', wordWrap: { width: 500 } });
    questionText.setOrigin(0.5);
    
    // Create input field
    const inputField = document.createElement('input');
    inputField.style.position = 'absolute';
    inputField.style.left = '300px';
    inputField.style.top = '300px';
    inputField.style.width = '200px';
    inputField.style.height = '30px';
    inputField.style.fontSize = '16px';
    document.body.appendChild(inputField);
    
    // Create submit button
    const submitButton = this.scene.add.text(400, 350, 'Submit', { fontSize: '24px', backgroundColor: '#4a4' });
    submitButton.setOrigin(0.5);
    submitButton.setInteractive({ useHandCursor: true });
    
    // Handle submit click
    submitButton.on('pointerdown', () => {
      const answer = inputField.value.trim().toLowerCase();
      
      // Check answer
      if (answer === correctAnswer.toLowerCase()) {
        // Correct answer
        this.scene.add.text(400, 400, 'Correct!', { fontSize: '24px', color: '#4f4' }).setOrigin(0.5);
        
        // After 1 second, close quiz and call callback
        this.scene.time.delayedCall(1000, () => {
          bg.destroy();
          questionText.destroy();
          submitButton.destroy();
          document.body.removeChild(inputField);
          onCorrect();
        });
      } else {
        // Wrong answer
        this.scene.add.text(400, 400, 'Wrong! Try again.', { fontSize: '24px', color: '#f44' }).setOrigin(0.5);
        
        // After 1 second, close quiz and call callback
        this.scene.time.delayedCall(1000, () => {
          bg.destroy();
          questionText.destroy();
          submitButton.destroy();
          document.body.removeChild(inputField);
          onWrong();
        });
      }
    });
  }
} 