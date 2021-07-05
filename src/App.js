import "./App.css";
import React from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = React.useState(true);

  const winner = calculateWinner(board);

  const handleClick = (i) => {
    const boardCopy = [...board];
    // if user click over a square or if there is a winner this function should return
    if (winner || boardCopy[i]) return;
    //put an X or O in the clickerd square
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  const restartGame = () => (
    <button
      onClick={() => {
        setBoard(Array(9).fill(null));
        setXisNext(true);
      }}
    >
      Restart Game
    </button>
  );

  const style = {
    width: "200px",
    margin: "20px auto",
  };

  return (
    <>
      <Board squares={board} onClick={handleClick} />
      <div sytle={style}>
        <p>
          {winner
            ? `The winner is ${winner}`
            : `Next player ${xIsNext ? "X" : "O"}`}
          {restartGame()}
        </p>
      </div>
    </>
  );
}

function Board({ squares, onClick }) {
  const style = {
    border: "10px solid darkblue",
    borderRadius: "10px",
    width: "250px",
    hieght: "250px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3,1fr)",
  };
  return (
    //podria usar fragment <></> y tendria lo mismo
    //pero sin el div
    //tmb si lo paso como en el primer caso podria usar
    //cualquier otro nombre para la propiedad
    <div style={style}>
      {squares.map((square, i) => (
        <Square key={i} value={square || "-"} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

function Square({ value, onClick }) {
  const style = {
    background: "lughtblue",
    border: "2px solid darkblue",
    fontSize: "30px",
    fontWeight: "800",
    cursor: "pointer",
    outline: "none",
  };
  return (
    <button style={style} onClick={onClick}>
      {value}
    </button>
  );
}

/*


const squares = [
  null, null, null,
  'X', 'X', 'X',
  null, null, null
];

console.log(winner(squares))

--------------

function Square({num, children}) {
  return ( 
    <button>
      {num ? num : children}    

    </button>
  )
}
*/

export default App;
