import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type Player = {
  id: string;
  name: string;
  ready: boolean;
};

type PlayersUpdate = {
  creatorId: string;
  players: Player[];
};

export function useLobbySocket(lobbyId: string, playerName: string, joined: boolean) {
  const socketRef = useRef<Socket | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);
  const [creatorId, setCreatorId] = useState<string>('');
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lobbyId || !playerName || !joined) return;

    const socket = io('http://localhost:4000');
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('joinLobby', { lobbyId, playerName });
    });

    socket.on('playersUpdate', (data) => {
      setCreatorId(data.creatorId);
      setPlayers(data.players);
    });

    socket.on('gameStarted', (data) => {
      setGameStarted(true);
    });

    socket.on('errorMessage', (msg) => {
      setError(msg);
    });

    socket.on('disconnect', () => {
      setPlayers([]);
      setCreatorId('');
      setGameStarted(false);
      setError('Отключено от сервера');
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [lobbyId, playerName, joined]);

  const toggleReady = () => {
    if (!socketRef.current) return;

    const currentPlayer = players.find((p) => p.name === playerName);
    if (!currentPlayer) return;

    socketRef.current.emit('setReady', !currentPlayer.ready);
  };

  const startGame = () => {
    socketRef.current?.emit('startGame');
  };

  return {
    players,
    creatorId,
    gameStarted,
    error,
    toggleReady,
    startGame,
    socketRef,
  };
}
