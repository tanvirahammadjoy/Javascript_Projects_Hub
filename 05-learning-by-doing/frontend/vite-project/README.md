# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Tic-Tac-Toe Game
A simple, interactive Tic-Tac-Toe game built with React. This project implements basic game logic, alternating turns, and winning conditions. It is a great starting point for beginners to learn React's state management and event handling.

Features
Turn-Based Gameplay: Players alternate between "X" and "O".
Winning Logic: Automatically detects and announces the winner when a player satisfies any of the winning conditions.
Valid Move Enforcement: Prevents double-clicks or moves on already filled squares.
Dynamic Status Updates: Displays the current player or the winner dynamically.

Getting Started
Prerequisites
Ensure you have the following installed on your system:
Node.js (v14 or later)
npm (or yarn as an alternative package manager)

Installation
Clone this repository:
git clone <repository_url>

Navigate into the project directory:
cd tic-tac-toe

Install dependencies:
npm install

Start the development server:
npm start

Open your browser and navigate to:
<http://localhost:3000>

Gameplay Overview
The game begins with Player "X".
Players take turns clicking on an empty square to mark their move.
The game checks for winning conditions after each move.
If a player wins, the winner is announced, and the game prevents further moves.
If all squares are filled and no winner is determined, the game ends in a draw.

Winning Conditions
The game uses the following winning conditions:
[ [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal wins
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical wins
  [0, 4, 8], [2, 4, 6] ]           // Diagonal wins

Technologies Used
React: For building the user interface and managing state.
CSS: For styling the game board and buttons.

Future Enhancements
Add a "Restart Game" button to reset the board.
Implement a scoring system to track multiple rounds.
Add AI for single-player mode.
Improve the UI/UX with animations and themes.

License
This project is licensed under the MIT License.

Acknowledgments
Inspired by the React documentation's Tic-Tac-Toe example and personal interest in building interactive games.
