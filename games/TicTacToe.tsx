import React from 'react';

type GameSymbol = 'X' | 'O' | null;

type Props = {
  board: GameSymbol[];
  currentTurn: GameSymbol;
  winner: GameSymbol | 'Draw' | null;
  onCellClick: (index: number) => void;
  yourSymbol: GameSymbol;
};

export const TicTacToeGame: React.FC<Props> = ({
                                                 board,
                                                 currentTurn,
                                                 winner,
                                                 onCellClick,
                                                 yourSymbol,
                                               }) => {
  const isYourTurn = currentTurn === yourSymbol;
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Крестики-нолики</h2>

      <p className="mb-4">
        {winner
          ? winner === 'Draw'
            ? 'Ничья!'
            : `Победитель: ${winner}`
          : isYourTurn
            ? 'Ваш ход'
            : `Ходит: ${currentTurn}`}
      </p>

      <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => onCellClick(idx)}
            disabled={!!cell || !!winner || !isYourTurn}
            className="h-16 w-16 border border-gray-400 rounded text-4xl font-bold flex items-center justify-center hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};
