import { useState } from "react";
import "./App.css";

function Square() {
  const [square, setSquare] = useState(Array(9).fill(null)); // Flat array
  console.log(square);
  const [isXNext, setIsXNext] = useState(true); // State to track the current player
  const [winner, setWinner] = useState(null); // State to track the winner

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
      console.log(a );

      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        console.log("Board A: " + board[a]);
        return board[a];
      }
    }
  }

  function player(i) {
    // Prevent double adding by checking if the square is already occupied
    if (square[i] || winner) return;

    const copiedSquare = [...square]; // Create a new copy of the array
    copiedSquare[i] = isXNext ? "X" : "O"; // Update the desired index
    setSquare(copiedSquare); // Update state with the new array'

    let result = winningChack(copiedSquare);
    console.log("Winner: " + result);

    if (result) {
      setWinner(result);
    } else {
      setIsXNext(!isXNext);
    }
  }

  return (
    <>
      <div>
        {winner ? `Winner Is: ${winner}` : `Next Plyer: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board-row">
        <button className="square" onClick={() => player(0)}>
          {square[0]}
        </button>
        <button className="square" onClick={() => player(1)}>
          {square[1]}
        </button>
        <button className="square" onClick={() => player(2)}>
          {square[2]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => player(3)}>
          {square[3]}
        </button>
        <button className="square" onClick={() => player(4)}>
          {square[4]}
        </button>
        <button className="square" onClick={() => player(5)}>
          {square[5]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => player(6)}>
          {square[6]}
        </button>
        <button className="square" onClick={() => player(7)}>
          {square[7]}
        </button>
        <button className="square" onClick={() => player(8)}>
          {square[8]}
        </button>
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
