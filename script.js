// Game State
class TicTacToeGame {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameMode = 'twoPlayer'; // 'twoPlayer' or 'ai'
        this.aiDifficulty = 'hard';
        this.scores = {
            X: parseInt(localStorage.getItem('scoreX')) || 0,
            O: parseInt(localStorage.getItem('scoreO')) || 0,
            draws: parseInt(localStorage.getItem('scoreDraw')) || 0
        };

        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.bindEvents();
        this.updateScoreDisplay();
        this.updateCurrentPlayerDisplay();
    }

    bindEvents() {
        // Game mode buttons
        document.getElementById('twoPlayerMode').addEventListener('click', () => this.setGameMode('twoPlayer'));
        document.getElementById('aiMode').addEventListener('click', () => this.setGameMode('ai'));

        // Difficulty selector
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.aiDifficulty = e.target.value;
        });

        // Game board cells
        document.querySelectorAll('.cell').forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });

        // Control buttons
        document.getElementById('resetGame').addEventListener('click', () => this.resetGame());
        document.getElementById('resetScore').addEventListener('click', () => this.resetScore());
        document.getElementById('playAgain').addEventListener('click', () => this.playAgain());
    }

    setGameMode(mode) {
        this.gameMode = mode;

        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(mode === 'twoPlayer' ? 'twoPlayerMode' : 'aiMode').classList.add('active');

        // Show/hide difficulty selector
        const difficultySelector = document.getElementById('difficultySelector');
        if (mode === 'ai') {
            difficultySelector.style.display = 'flex';
        } else {
            difficultySelector.style.display = 'none';
        }

        this.resetGame();
    }

    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== '') return;

        this.makeMove(index, this.currentPlayer);

        if (this.gameMode === 'ai' && this.gameActive && this.currentPlayer === 'O') {
            // Disable board temporarily to prevent clicks during AI thinking
            this.disableBoard();

            setTimeout(() => {
                const aiMove = this.getAIMove();
                if (aiMove !== -1) {
                    this.makeMove(aiMove, 'O');
                }
                this.enableBoard();
            }, 500); // Add slight delay for better UX
        }
    }

    makeMove(index, player) {
        this.board[index] = player;
        this.updateCellDisplay(index, player);

        if (this.checkWinner()) {
            this.endGame(player);
        } else if (this.board.every(cell => cell !== '')) {
            this.endGame('draw');
        } else {
            this.currentPlayer = player === 'X' ? 'O' : 'X';
            this.updateCurrentPlayerDisplay();
        }
    }

    updateCellDisplay(index, player) {
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        cell.style.pointerEvents = 'none';
    }

    checkWinner() {
        return this.winningConditions.find(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlightWinningCells(condition);
                return true;
            }
            return false;
        });
    }

    highlightWinningCells(winningIndices) {
        winningIndices.forEach(index => {
            document.querySelector(`[data-index="${index}"]`).classList.add('winning');
        });
    }

    endGame(result) {
        this.gameActive = false;

        if (result === 'draw') {
            this.scores.draws++;
            this.showResult('It\'s a Draw!');
        } else {
            this.scores[result]++;
            const playerName = this.gameMode === 'ai' ?
                (result === 'X' ? 'You Win!' : 'AI Wins!') :
                `Player ${result} Wins!`;
            this.showResult(playerName);
        }

        this.updateScoreDisplay();
        this.saveScores();
    }

    showResult(message) {
        document.getElementById('resultText').textContent = message;
        document.getElementById('gameResult').classList.add('show');
    }

    updateScoreDisplay() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
        document.getElementById('scoreDraw').textContent = this.scores.draws;
    }

    updateCurrentPlayerDisplay() {
        const currentPlayerText = document.getElementById('currentPlayerText');
        if (this.gameMode === 'ai') {
            currentPlayerText.textContent = this.currentPlayer === 'X' ? 'Your Turn' : 'AI Thinking...';
        } else {
            currentPlayerText.textContent = `Player ${this.currentPlayer}'s Turn`;
        }
    }

    saveScores() {
        localStorage.setItem('scoreX', this.scores.X);
        localStorage.setItem('scoreO', this.scores.O);
        localStorage.setItem('scoreDraw', this.scores.draws);
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        // Reset UI
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
            cell.style.pointerEvents = 'auto';
        });

        this.updateCurrentPlayerDisplay();
        document.getElementById('gameResult').classList.remove('show');
    }

    resetScore() {
        this.scores = { X: 0, O: 0, draws: 0 };
        this.updateScoreDisplay();
        this.saveScores();
    }

    playAgain() {
        this.resetGame();
    }

    disableBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            if (!cell.textContent) {
                cell.style.pointerEvents = 'none';
                cell.style.opacity = '0.6';
            }
        });
    }

    enableBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            if (!cell.textContent) {
                cell.style.pointerEvents = 'auto';
                cell.style.opacity = '1';
            }
        });
    }

    // AI Logic
    getAIMove() {
        const availableMoves = this.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(val => val !== null);

        if (availableMoves.length === 0) return -1;

        switch (this.aiDifficulty) {
            case 'easy':
                return this.getRandomMove(availableMoves);
            case 'medium':
                return Math.random() < 0.7 ? this.getBestMove() : this.getRandomMove(availableMoves);
            case 'hard':
            default:
                return this.getBestMove();
        }
    }

    getRandomMove(availableMoves) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    getBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                const score = this.minimax(this.board, 0, false);
                this.board[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing) {
        const winner = this.evaluateBoard(board);

        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (board.every(cell => cell !== '')) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = this.minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = this.minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    evaluateBoard(board) {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});

// Add some visual enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effect (optional - you can remove this if you don't want sound)
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            if (!cell.textContent && cell.style.pointerEvents !== 'none') {
                cell.style.transform = 'scale(1.05)';
            }
        });

        cell.addEventListener('mouseleave', () => {
            if (!cell.textContent) {
                cell.style.transform = 'scale(1)';
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const gameResult = document.getElementById('gameResult');
            if (gameResult.classList.contains('show')) {
                gameResult.classList.remove('show');
            }
        }
    });

    // Add touch feedback for mobile
    cells.forEach(cell => {
        cell.addEventListener('touchstart', () => {
            cell.style.transform = 'scale(0.95)';
        });

        cell.addEventListener('touchend', () => {
            setTimeout(() => {
                if (!cell.textContent) {
                    cell.style.transform = 'scale(1)';
                }
            }, 150);
        });
    });
}); 