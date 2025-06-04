# 🎮 Tic Tac Toe - Dark Edition

A beautiful, minimalist dark-themed Tic Tac Toe game with AI opponent. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### 🎯 Game Modes
- **Two Players**: Classic local multiplayer mode
- **vs AI**: Challenge the computer with multiple difficulty levels

### 🤖 AI Difficulty Levels
- **Easy**: Random moves for casual play
- **Medium**: Mix of strategic and random moves
- **Hard**: Unbeatable AI using minimax algorithm

### 🎨 Design Features
- **Minimalist Dark Theme**: Easy on the eyes with beautiful gradients
- **Mobile Responsive**: Optimized for all screen sizes
- **Smooth Animations**: Engaging visual feedback
- **Glassmorphism UI**: Modern design with backdrop blur effects

### 📊 Score Tracking
- Persistent score tracking (saved in browser localStorage)
- Separate counters for X wins, O wins, and draws
- Scores persist until manually reset or browser data is cleared

### 🔧 Interactive Features
- Real-time game state updates
- Winning cell highlighting
- Modal result display
- Touch-friendly mobile interface
- Keyboard navigation (ESC to close modals)

## 🚀 Live Demo

**[Live Demo](https://syrspondon.github.io/tiktaktoe/)**

## 🤖 How This Game Was Created

This Tic Tac Toe game was entirely created using **Cursor** IDE with **Claude 4.0** AI assistance. The development process was streamlined and efficient, demonstrating the power of AI-assisted coding.

### Original Prompt
```
I want to create a tik tak toe game with html css js. which will have a minimalist dark theme. 
will be mobile responsive. two players can play that game. also ai vs player mode. which will be tough. 
score will be visible untill refreshed. lets go.
```

### Development Process
1. **AI Understanding**: Claude 4.0 interpreted the requirements and created a comprehensive plan
2. **File Generation**: Complete HTML, CSS, and JavaScript files were generated from scratch
3. **Feature Implementation**: All requested features were implemented including:
   - Minimalist dark theme with glassmorphism effects
   - Mobile-responsive design
   - Two-player mode
   - Challenging AI opponent using minimax algorithm
   - Persistent score tracking
4. **Code Quality**: Clean, well-structured, and commented code was produced
5. **Documentation**: Comprehensive README with detailed instructions

### AI Capabilities Demonstrated
- **Complete Project Setup**: Generated all necessary files in one session
- **Advanced Algorithm Implementation**: Minimax algorithm for unbeatable AI
- **Modern UI/UX Design**: Contemporary dark theme with smooth animations
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Best Practices**: Clean code structure, accessibility features, and documentation

This project showcases how AI-assisted development can rapidly produce production-ready code with modern features and professional quality.

## 🚀 How to Play

1. **Choose Game Mode**:
   - Click "Two Players" for local multiplayer
   - Click "vs AI" to play against the computer

2. **Select AI Difficulty** (AI mode only):
   - Easy: Perfect for beginners
   - Medium: Balanced challenge
   - Hard: Maximum difficulty (nearly unbeatable)

3. **Make Your Move**:
   - Click any empty cell to place your mark
   - Player X always goes first
   - In AI mode, you are always X

4. **Win Conditions**:
   - Get three marks in a row (horizontal, vertical, or diagonal)
   - Game ends in a draw if all cells are filled with no winner

5. **Game Controls**:
   - **Reset Game**: Start a new game
   - **Reset Score**: Clear all score counters
   - **Play Again**: Quick restart after a game ends

## 🎯 Game Strategy (vs AI)

### Against Easy AI
- The AI makes random moves, so any basic strategy will work

### Against Medium AI
- The AI plays strategically 70% of the time
- Look for opportunities when it makes random moves

### Against Hard AI
- The AI uses the minimax algorithm and is nearly unbeatable
- Your best outcome is typically a draw
- Focus on defensive play to prevent the AI from winning

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with flexbox/grid
- **JavaScript (ES6+)**: Game logic and AI implementation

### Key Features
- **Minimax Algorithm**: Implements optimal AI strategy
- **Local Storage**: Persistent score tracking
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Keyboard navigation and high contrast support

### File Structure
```
tic-tac-toe/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Game logic and AI implementation
└── README.md           # Documentation
```

## 🎨 Customization

The game uses CSS custom properties for easy theming. Key color variables:
- Primary gradient: `#ff6b6b`, `#4ecdc4`, `#45b7d1`
- Background: `#0f0f23` to `#16213e`
- Player X color: `#ff6b6b`
- Player O color: `#4ecdc4`

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🚀 Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start playing!

No installation or build process required - just open and play!

## 🎮 Controls

### Desktop
- **Mouse**: Click cells to make moves
- **Keyboard**: 
  - ESC: Close result modal
  - Tab: Navigate through interactive elements

### Mobile
- **Touch**: Tap cells to make moves
- **Gestures**: Responsive touch feedback

## 🏆 Tips for Best Experience

1. **Use Hard difficulty** for the ultimate challenge
2. **Try different strategies** against the AI
3. **Play in fullscreen** on mobile for best experience
4. **Track your improvement** using the score counter

---

Enjoy the game and see if you can beat the AI! 🎯 
