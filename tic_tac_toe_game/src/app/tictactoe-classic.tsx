"use client";
import React, { useState } from "react";

// Color palette from config:
const COLORS = {
  primary: "#dcf41f", // For highlights and main accents
  secondary: "#FFFFFF", // For background or neutral areas
  accent: "#ff00d0",   // For win lines/status
};

const EMPTY_BOARD = Array(9).fill(null);

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
function checkWinner(board) {
  /** Returns 'X', 'O' if winner exists, or null if no winner */
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function checkDraw(board) {
  /** Returns true if all cells filled and no winner */
  return board.every(cell => cell) && !checkWinner(board);
}

// PUBLIC_INTERFACE
export default function TicTacToeClassicContainer() {
  /**
   * Main container for Two-player TicTacToe game.
   * Handles board state, turn, win/draw detection, and restart.
   */
  const [board, setBoard] = useState([...EMPTY_BOARD]);
  const [isXNext, setIsXNext] = useState(true);
  const winner = checkWinner(board);
  const isDraw = checkDraw(board);
  const currentPlayer = isXNext ? "X" : "O";

  // For highlighting win cells
  let winningLine = null;
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winningLine = pattern;
      break;
    }
  }

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    /** Handles clicking a cell in the board. */
    if (winner || isDraw || board[idx]) return; // no move if terminal or occupied
    const nextBoard = [...board];
    nextBoard[idx] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    /** Resets the board and player turn. */
    setBoard([...EMPTY_BOARD]);
    setIsXNext(true);
  }

  // Render helpers
  function renderCell(idx) {
    const cellValue = board[idx];
    const isWinningCell = winningLine && winningLine.includes(idx);
    return (
      <button
        key={idx}
        aria-label={`Cell ${idx + 1}`}
        className={`w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl font-bold flex items-center justify-center border-2 rounded-lg transition 
          ${isWinningCell
            ? `border-[${COLORS.accent}] bg-[${COLORS.primary}] text-[${COLORS.accent}] shadow-lg`
            : `border-gray-300 bg-[${COLORS.secondary}] hover:bg-[${COLORS.primary}] hover:text-[${COLORS.accent}]`
          }`}
        style={{
          cursor: cellValue || winner ? "default" : "pointer",
          color: isWinningCell ? COLORS.accent : "#333",
          background: isWinningCell
            ? COLORS.primary
            : COLORS.secondary,
          borderColor: isWinningCell
            ? COLORS.accent
            : "#ccc",
        }}
        disabled={!!cellValue || winner || isDraw}
        onClick={() => handleCellClick(idx)}
        data-testid={`cell-${idx}`}
      >
        {cellValue}
      </button>
    );
  }

  function renderStatus() {
    let status, color;
    if (winner) {
      status = `Player ${winner} wins! 🎉`;
      color = COLORS.accent;
    } else if (isDraw) {
      status = "It's a draw!";
      color = COLORS.primary;
    } else {
      status = `Player ${currentPlayer}'s turn`;
      color = COLORS.primary;
    }
    return (
      <div
        className="text-xl sm:text-2xl font-semibold py-2 mb-2"
        style={{
          color,
        }}
        data-testid="game-status"
      >
        {status}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center">
      {/* Current turn or winner status above board */}
      {renderStatus()}
      {/* Game Board */}
      <div
        className="grid grid-cols-3 grid-rows-3 gap-4 p-4 mb-4 bg-white rounded-2xl shadow-lg"
        style={{
          background: COLORS.secondary,
        }}
        data-testid="tic-tac-toe-board"
      >
        {Array.from({ length: 9 }, (_, idx) => renderCell(idx))}
      </div>
      {/* Game controls */}
      <button
        type="button"
        className="px-6 py-2 rounded-lg font-semibold text-lg shadow transition
        border-2 mt-2
        text-white"
        style={{
          background: COLORS.primary,
          borderColor: COLORS.primary,
          color: "#222",
          boxShadow: `0 2px 16px 0 ${COLORS.primary}22`,
        }}
        onClick={handleRestart}
        data-testid="restart-button"
      >
        Restart Game
      </button>
      {/* Accessibility & attribution */}
      <div className="sr-only">
        TicTacToe Classic. Two players. 3x3 grid. Players take turns, first to align three marks wins.
      </div>
    </div>
  );
}
