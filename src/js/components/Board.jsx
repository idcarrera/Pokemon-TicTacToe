import React, { useState, useEffect } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ players, avatars, onRestart }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const isBoardFull = board.every(cell => cell !== null);
  const isDraw = !winner && isBoardFull;

  const currentPlayer = xIsNext ? "player1" : "player2";

  // ✅ Mostrar "Líder de Gimnasio" si es IA
  function displayName(playerKey) {
    const name = players[playerKey];
    return name === "IA" ? "Líder de Gimnasio" : name;
  }

  function handleClick(index) {
    if (board[index] || winner || isDraw) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // ✅ IA mejorada
  useEffect(() => {
    if (!xIsNext && players.player2 === "IA" && !winner && !isDraw) {
      const makeMove = (index) => {
        setTimeout(() => handleClick(index), 500);
      };

      const getBestMove = () => {
        const empty = board
          .map((cell, idx) => (cell === null ? idx : null))
          .filter((i) => i !== null);

        const tryWinOrBlock = (player) => {
          for (let [a, b, c] of [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
          ]) {
            const line = [board[a], board[b], board[c]];
            const count = line.filter(x => x === player).length;
            const emptyIndex = [a, b, c].find(i => board[i] === null);
            if (count === 2 && emptyIndex !== undefined) return emptyIndex;
          }
          return null;
        };

        const win = tryWinOrBlock("player2");
        if (win !== null) return win;

        const block = tryWinOrBlock("player1");
        if (block !== null) return block;

        if (board[4] === null) return 4;

        const corners = [0, 2, 6, 8].filter(i => board[i] === null);
        if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

        return empty[Math.floor(Math.random() * empty.length)];
      };

      const move = getBestMove();
      makeMove(move);
    }
  }, [xIsNext, board, winner, isDraw, players]);

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  function getCellContent(value) {
    if (!value) return null;
    return <img src={avatars[value].image} alt="" width="60" />;
  }

  return (
    <div className="console-frame text-center">
      {winner || isDraw ? (
        <div className="winner-box">
          {winner
            ? `Ha GANADO ${displayName(winner)} con ${avatars[winner].name.toUpperCase()}!`
            : "¡EMPATE! Ambos entrenadores lo dieron todo!"}
        </div>
      ) : (
        <h2 className="mb-3">Turno de: {displayName(currentPlayer)}</h2>
      )}

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="square d-flex align-items-center justify-content-center"
            onClick={() => handleClick(index)}
          >
            {getCellContent(cell)}
          </button>
        ))}
      </div>

      <div className="d-flex flex-column align-items-center mt-4">
        <button className="mb-2" onClick={resetGame}>
          Reiniciar Combate
        </button>
        <button onClick={onRestart}>
          Nuevo Combate
        </button>
      </div>
    </div>
  );
}

export default Board;
