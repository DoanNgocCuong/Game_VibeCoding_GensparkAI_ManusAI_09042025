// Game State Management
const gameState = {
    currentScreen: 'loading',
    character: {
        name: '',
        appearance: {
            skinColor: '#fed7aa',
            outfitColor: '#6366f1',
            hairColor: '#7c2d12',
            hairStyle: 'default',
            eyes: 'default',
            mouth: 'smile',
            accessory: 'none'
        }
    },
    progress: {
        level: 1,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        skills: {
            addition: 25,
            subtraction: 10,
            multiplication: 5,
            division: 0,
            fractions: 0,
            geometry: 0
        }
    },
    achievements: [],
    currentGame: null,
    timer: null,
    timeRemaining: 60
};

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('#gameScreens > div').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
    gameState.currentScreen = screenId;
}

// Loading Screen
function simulateLoading() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingMessage = document.getElementById('loadingMessage');
    const messages = [
        'Preparing your adventure...',
        'Loading math challenges...',
        'Setting up the game world...',
        'Almost ready...'
    ];
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        loadingBar.style.width = `${progress}%`;
        
        if (progress % 25 === 0) {
            loadingMessage.textContent = messages[progress / 25 - 1];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('loadingScreen').classList.add('hidden');
            document.getElementById('gameScreens').classList.remove('hidden');
            showScreen('mainMenuScreen');
        }
    }, 200);
}

// Character Customization
function updateCharacterPreview() {
    const preview = document.getElementById('characterPreview');
    const { appearance } = gameState.character;
    
    // Update colors
    document.getElementById('characterHead').setAttribute('fill', appearance.skinColor);
    document.getElementById('characterBody').setAttribute('fill', appearance.outfitColor);
    document.getElementById('characterTorso').setAttribute('fill', appearance.outfitColor);
    document.getElementById('characterLeftArm').setAttribute('stroke', appearance.outfitColor);
    document.getElementById('characterRightArm').setAttribute('stroke', appearance.outfitColor);
    document.getElementById('characterHair').setAttribute('fill', appearance.hairColor);
    
    // Update hair style
    updateHairStyle(appearance.hairStyle);
    
    // Update face features
    updateEyes(appearance.eyes);
    updateMouth(appearance.mouth);
    
    // Update accessory
    updateAccessory(appearance.accessory);
}

function updateHairStyle(style) {
    const hairPath = document.getElementById('characterHair');
    const paths = {
        default: 'M60,70 Q80,40 100,50 Q120,40 140,70',
        curly: 'M60,70 Q70,35 80,55 Q90,35 100,55 Q110,35 120,55 Q130,35 140,70',
        straight: 'M65,70 L75,35 L85,70 L95,35 L105,70 L115,35 L125,70 L135,35 L140,70',
        short: 'M70,70 Q85,55 100,55 Q115,55 130,70',
        bald: '',
        ponytail: 'M70,70 Q85,45 100,55 Q115,45 130,70 M100,55 Q100,80 100,100'
    };
    hairPath.setAttribute('d', paths[style] || paths.default);
}

function updateEyes(style) {
    const leftEye = document.getElementById('characterLeftEye');
    const rightEye = document.getElementById('characterRightEye');
    const eyesContainer = document.getElementById('characterEyes');
    
    if (style === 'default') {
        leftEye.setAttribute('r', '5');
        rightEye.setAttribute('r', '5');
    } else if (style === 'happy') {
        leftEye.setAttribute('d', 'M80,80 Q85,75 90,80');
        rightEye.setAttribute('d', 'M110,80 Q115,75 120,80');
    }
    // Add more eye styles as needed
}

function updateMouth(style) {
    const mouth = document.getElementById('characterMouth');
    const paths = {
        smile: 'M80,100 Q100,120 120,100',
        grin: 'M80,105 Q100,125 120,105',
        neutral: 'M80,105 L120,105',
        surprise: 'M100,105 A8,8 0 1,1 100,105',
        smirk: 'M90,105 Q100,115 120,105',
        tongue: 'M80,100 Q100,120 120,100 M100,115 A5,5 0 1,1 100,115'
    };
    mouth.setAttribute('d', paths[style] || paths.smile);
}

function updateAccessory(accessory) {
    const accessoryContainer = document.getElementById('characterAccessory');
    accessoryContainer.innerHTML = '';
    
    if (accessory === 'hat') {
        const hat = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        hat.setAttribute('d', 'M70,70 Q100,40 130,70');
        hat.setAttribute('fill', '#3b82f6');
        accessoryContainer.appendChild(hat);
    }
    // Add more accessories as needed
}

// Game Logic
function startGame(gameType) {
    gameState.currentGame = {
        type: gameType,
        score: 0,
        correct: 0,
        wrong: 0,
        currentProblem: 1,
        totalProblems: 10
    };
    
    showScreen('gameScreen');
    updateGameUI();
    startTimer();
    generateProblem();
}

function generateProblem() {
    const gameContent = document.getElementById('gameContent');
    const { type } = gameState.currentGame;
    
    // Hide all game types
    document.querySelectorAll('.game-type-container').forEach(container => {
        container.classList.add('hidden');
    });
    
    // Show selected game type
    const gameContainer = document.getElementById(`${type}Game`);
    gameContainer.classList.remove('hidden');
    
    // Generate problem based on type
    switch (type) {
        case 'multipleChoice':
            generateMultipleChoiceProblem();
            break;
        case 'sequence':
            generateSequenceProblem();
            break;
        case 'fraction':
            generateFractionProblem();
            break;
        case 'geometry':
            generateGeometryProblem();
            break;
        case 'bubble':
            generateBubbleProblem();
            break;
    }
}

function generateMultipleChoiceProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    
    document.getElementById('mc-num1').textContent = num1;
    document.getElementById('mc-num2').textContent = num2;
    
    const options = [correctAnswer];
    while (options.length < 4) {
        const option = Math.floor(Math.random() * 20) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    const optionCards = document.querySelectorAll('#multipleChoiceGame .option-card');
    optionCards.forEach((card, index) => {
        card.textContent = options[index];
        card.onclick = () => checkAnswer(options[index] === correctAnswer, card);
    });
}

function checkAnswer(isCorrect, element) {
    const { currentGame } = gameState;
    
    if (isCorrect) {
        element.classList.add('correct-answer');
        currentGame.correct++;
        currentGame.score += 100;
        showEmoji('😊');
    } else {
        element.classList.add('wrong-answer');
        currentGame.wrong++;
        showEmoji('😢');
    }
    
    updateGameStats();
    
    setTimeout(() => {
        currentGame.currentProblem++;
        if (currentGame.currentProblem <= currentGame.totalProblems) {
            generateProblem();
        } else {
            endGame();
        }
    }, 1000);
}

function showEmoji(emoji) {
    const container = document.getElementById('emojiContainer');
    container.textContent = emoji;
    container.classList.add('animate');
    
    setTimeout(() => {
        container.classList.remove('animate');
    }, 2000);
}

function updateGameStats() {
    const { currentGame } = gameState;
    document.getElementById('gameScore').textContent = currentGame.score;
    document.getElementById('gameCorrect').textContent = currentGame.correct;
    document.getElementById('gameWrong').textContent = currentGame.wrong;
    document.getElementById('gameProgress').textContent = currentGame.currentProblem;
}

function startTimer() {
    gameState.timeRemaining = 60;
    updateTimerDisplay();
    
    gameState.timer = setInterval(() => {
        gameState.timeRemaining--;
        updateTimerDisplay();
        
        if (gameState.timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerBar = document.getElementById('timerBar');
    const timeDisplay = document.getElementById('timeDisplay');
    
    timeDisplay.textContent = gameState.timeRemaining;
    timerBar.style.width = `${(gameState.timeRemaining / 60) * 100}%`;
}

function endGame() {
    clearInterval(gameState.timer);
    showScreen('resultScreen');
    
    const { currentGame } = gameState;
    document.getElementById('resultScore').textContent = currentGame.score;
    document.getElementById('resultCorrect').textContent = `${currentGame.correct}/${currentGame.totalProblems}`;
    
    // Calculate time bonus
    const timeBonus = Math.floor(gameState.timeRemaining * 2);
    document.getElementById('resultTimeBonus').textContent = `+${timeBonus}`;
    
    // Calculate streak bonus
    const streakBonus = Math.floor(currentGame.correct / 3) * 50;
    document.getElementById('resultStreakBonus').textContent = `+${streakBonus}`;
    
    // Update total score
    currentGame.score += timeBonus + streakBonus;
    document.getElementById('resultScore').textContent = currentGame.score;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    simulateLoading();
    
    // Character customization
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            const target = option.dataset.target;
            const color = option.dataset.color;
            gameState.character.appearance[target] = color;
            updateCharacterPreview();
        });
    });
    
    document.querySelectorAll('.avatar-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.parentElement.id.replace('Tab', '');
            const value = item.dataset[type];
            gameState.character.appearance[type] = value;
            updateCharacterPreview();
        });
    });
    
    // Game mode selection
    document.querySelectorAll('.game-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            if (mode === 'story') {
                showScreen('characterScreen');
            } else if (mode === 'skill') {
                showScreen('skillScreen');
            } else if (mode === 'challenge') {
                showScreen('challengeScreen');
            }
        });
    });
    
    // Start game button
    document.getElementById('startGameBtn').addEventListener('click', () => {
        showScreen('mapScreen');
    });
    
    // Play level button
    document.getElementById('playLevelBtn').addEventListener('click', () => {
        startGame('multipleChoice');
    });
    
    // Navigation buttons
    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        showScreen('mainMenuScreen');
    });
    
    document.getElementById('gameQuitBtn').addEventListener('click', () => {
        showScreen('mapScreen');
    });
    
    document.getElementById('resultMapBtn').addEventListener('click', () => {
        showScreen('mapScreen');
    });
    
    document.getElementById('resultNextLevelBtn').addEventListener('click', () => {
        gameState.progress.level++;
        showScreen('mapScreen');
    });
}); 