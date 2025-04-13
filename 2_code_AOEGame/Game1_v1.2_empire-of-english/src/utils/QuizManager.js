/**
 * Quiz Manager
 * Handles quiz questions, answers, and validation
 */

class QuizManager {
    constructor() {
        // Quiz questions for food resources (nouns)
        this.foodQuestions = [
            {
                question: "Which word is a noun?",
                options: ["apple", "run", "paint"],
                correctAnswer: 0
            },
            {
                question: "Which word is a noun?",
                options: ["house", "jump", "beautiful"],
                correctAnswer: 0
            },
            {
                question: "Which word is a noun?",
                options: ["happy", "book", "swim"],
                correctAnswer: 1
            },
            {
                question: "Which word is a noun?",
                options: ["quickly", "green", "teacher"],
                correctAnswer: 2
            },
            {
                question: "Which word is a noun?",
                options: ["computer", "write", "slowly"],
                correctAnswer: 0
            }
        ];

        // Quiz questions for wood resources (verbs)
        this.woodQuestions = [
            {
                question: "Which of these is a verb?",
                options: ["walk", "gift", "bed"],
                correctAnswer: 0
            },
            {
                question: "Which of these is a verb?",
                options: ["table", "run", "happy"],
                correctAnswer: 1
            },
            {
                question: "Which of these is a verb?",
                options: ["car", "blue", "jump"],
                correctAnswer: 2
            },
            {
                question: "Which of these is a verb?",
                options: ["eat", "chair", "tall"],
                correctAnswer: 0
            },
            {
                question: "Which of these is a verb?",
                options: ["small", "read", "door"],
                correctAnswer: 1
            }
        ];

        // Building command challenges
        this.buildingChallenges = [
            {
                question: "Form a command to build a Town Center:",
                options: ["Build the Town Center now", "I want Town Center", "Please Town Center build"],
                correctAnswer: 0
            },
            {
                question: "Which is the correct command to construct a Town Center?",
                options: ["Town Center build please", "Construct the Town Center", "Town Center now"],
                correctAnswer: 1
            }
        ];
    }

    /**
     * Get a random quiz question for the specified resource type
     * @param {string} resourceType - 'food' or 'wood'
     * @returns {Object} Quiz question object
     */
    getRandomQuestion(resourceType) {
        const questions = resourceType === 'food' ? this.foodQuestions : this.woodQuestions;
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }

    /**
     * Get a random building challenge
     * @returns {Object} Building challenge question object
     */
    getRandomBuildingChallenge() {
        const randomIndex = Math.floor(Math.random() * this.buildingChallenges.length);
        return this.buildingChallenges[randomIndex];
    }

    /**
     * Check if the answer is correct
     * @param {Object} question - Question object
     * @param {number} answerIndex - Index of the selected answer
     * @returns {boolean} Whether the answer is correct
     */
    checkAnswer(question, answerIndex) {
        return question.correctAnswer === answerIndex;
    }
}
