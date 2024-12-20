import { useState } from "react";
import "./App.css";

function Square() {
  const [square, setSquare] = useState([Array(9).fill(null)]); // Flat array
  console.log(square);
  const [currentMove, setCurrentmove] = useState(0);
  const [isXNext, setIsXNext] = useState(true); // State to track the current player
  const [winner, setWinner] = useState(null); // State to track the winner

  const currentSquares = square[currentMove]; // Get the board state for the current move
  console.log("currentSquares: " + currentSquares);

  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  function winningChack(board) {
    for (let Conditions of winConditions) {
      const [a, b, c] = Conditions;
      console.log(a);

      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        console.log("Board A: " + board[a]);
        return board[a];
      }
    }
    return null;
  }

  function player(i) {
    // Prevent double adding by checking if the square is already occupied or winner
    if (currentSquares[i] || winner) return;

    const copiedSquare = [...currentSquares]; // Create a new copy of the array
    copiedSquare[i] = isXNext ? "X" : "O"; // Update the desired index

    // setSquare(copiedSquare); // Update state with the new array'

    // update history to reflect new move
    const newHistory = square.slice(0, currentMove + 1);
    console.log("NewHistory: " + newHistory);

    newHistory.push(copiedSquare);

    setSquare(newHistory);
    setCurrentmove(newHistory.length - 1);

    let result = winningChack(copiedSquare);
    console.log("Winner: " + result);

    if (result) {
      setWinner(result);
    } else {
      setIsXNext(!isXNext);
    }
  }

  function jumpTo(move) {
    setCurrentmove(move);
    setIsXNext(move % 2 === 0);
    setWinner(null);
  }

  function reStartGame() {
    setSquare([Array(9).fill(null)]);
    setCurrentmove(0);
    setIsXNext(true);
    setWinner(null);
  }

  return (
    <>
      <div className="states">
        {winner ? `Winner Is: ${winner}` : `Next Plyer: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board-row">
        <button className="square" onClick={() => player(0)}>
          {currentSquares[0]}
        </button>
        <button className="square" onClick={() => player(1)}>
          {currentSquares[1]}
        </button>
        <button className="square" onClick={() => player(2)}>
          {currentSquares[2]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => player(3)}>
          {currentSquares[3]}
        </button>
        <button className="square" onClick={() => player(4)}>
          {currentSquares[4]}
        </button>
        <button className="square" onClick={() => player(5)}>
          {currentSquares[5]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => player(6)}>
          {currentSquares[6]}
        </button>
        <button className="square" onClick={() => player(7)}>
          {currentSquares[7]}
        </button>
        <button className="square" onClick={() => player(8)}>
          {currentSquares[8]}
        </button>
      </div>
      <div>
        <button className="reset-btn" onClick={reStartGame}>Restart Game</button>
        <div>
          {square.map((_, move) => {
            return (
              <button
                className="historyBtn"
                key={move}
                onClick={() => {
                  jumpTo(move);
                }}
              >
                {move === 0 ? "Go to start" : `Go to move #${move}`}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function GameBoard() {
  return (
    <div className="gameBoard">
      <Square />
    </div>
  );
}
