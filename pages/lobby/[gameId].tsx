import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLobbySocket } from '../../hooks/useLobbySocket';
import { JoinLobbyForm } from '@components/lobby/JoinLobbyForm';
import { PlayerList } from '@components/lobby/PlayerList';
import { LobbyInfo } from '@components/lobby/LobbyInfo';
import {TicTacToeGame} from "@games/TicTacToe";
import {useTicTacToeGame} from "../../hooks/useTicTacToeGame";

export default function LobbyPage() {
  const router = useRouter();
  const { gameId } = router.query;

  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [minPlayers, setMinPlayers] = useState(2);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const queryLobbyId = router.query.lobbyId as string | undefined;

    if (queryLobbyId) {
      setLobbyId(queryLobbyId);
      // Можно расширить логику проверки создателя через localStorage, если нужно
    } else {
      const newLobbyId = crypto.randomUUID();
      setLobbyId(newLobbyId);
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, lobbyId: newLobbyId },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router]);

  const {
    players,
    creatorId,
    gameStarted,
    error,
    toggleReady,
    startGame,
    socketRef
  } = useLobbySocket(lobbyId ?? '', playerName, joined);

  const socket = socketRef.current;

  const {
    board,
    currentTurn,
    winner,
    yourSymbol,
    makeMove
  } = useTicTacToeGame(socket);


  const isCreator = creatorId === players.find((p) => p.name === playerName)?.id;

  const canStartGame =
    isCreator &&
    players.length >= minPlayers &&
    players.length > 0 &&
    players.every((p) => p.ready);

  const shareUrl = typeof window !== 'undefined' && gameId && lobbyId
    ? `${window.location.origin}/lobby/${gameId}?lobbyId=${lobbyId}`
    : '';

  if (!router.isReady || !gameId || !lobbyId) {
    return <div className="p-6 text-center">Загрузка...</div>;
  }

  if (!joined) {
    return (
      <JoinLobbyForm
        playerName={playerName}
        setPlayerName={setPlayerName}
        onJoin={() => {
          if (!playerName.trim()) {
            alert('Введите имя');
            return;
          }
          setJoined(true);
        }}
      />
    );
  }

  if (gameStarted) {
    return (
      <TicTacToeGame
        board={board}
        currentTurn={currentTurn}
        winner={winner}
        yourSymbol={yourSymbol}
        onCellClick={(index) => makeMove(index)}
      />
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6 mt-10 space-y-8">
      <h1 className="text-3xl font-bold text-center capitalize">Лобби игры: {gameId}</h1>

      <LobbyInfo
        lobbyId={lobbyId}
        isCreator={isCreator}
        minPlayers={minPlayers}
        setMinPlayers={setMinPlayers}
        canStartGame={canStartGame}
        onStartGame={startGame}
        error={error}
        shareUrl={shareUrl}
      />

      <PlayerList
        players={players}
        currentPlayerName={playerName}
        creatorId={creatorId}
        onToggleReady={toggleReady}
      />
    </main>
  );
}
