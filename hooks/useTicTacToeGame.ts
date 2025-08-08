import { useEffect, useState, useCallback } from 'react';
import type { Socket } from 'socket.io-client';

export function useTicTacToeGame(socket: Socket | null) {
  const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null);
  const [yourSymbol, setYourSymbol] = useState<'X' | 'O' | null>(null);

  useEffect(() => {
    if (!socket) {
      console.log('socket отсутствует, подписка не происходит');
      return
    }
    console.log('useTicTacToeGame: подписка на gameStarted');


    function onGameStarted(data: { board: ('X' | 'O' | null)[]; currentTurn: 'X' | 'O'; yourSymbol: 'X' | 'O' }) {
      setBoard(data.board);
      setCurrentTurn(data.currentTurn);
      setWinner(null);
      setYourSymbol(data.yourSymbol);
    }

    function onGameUpdate(data: { board: ('X' | 'O' | null)[]; currentTurn: 'X' | 'O'; winner: 'X' | 'O' | 'Draw' | null }) {
      setBoard(data.board);
      setCurrentTurn(data.currentTurn);
      setWinner(data.winner);
    }

    socket.on('gameStarted', onGameStarted);
    socket.on('gameUpdate', onGameUpdate);

    return () => {
      socket.off('gameStarted', onGameStarted);
      socket.off('gameUpdate', onGameUpdate);
    };
  }, [socket]);

  const makeMove = useCallback(
    (index: number) => {
      if (!socket) return;
      if (winner) return;

      socket.emit('makeMove', { index });
    },
    [socket, winner]
  );

  return {
    board,
    currentTurn,
    winner,
    yourSymbol,
    makeMove,
  };
}
