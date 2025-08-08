import React from 'react';

type LobbyInfoProps = {
  lobbyId: string;
  isCreator: boolean;
  minPlayers: number;
  setMinPlayers: (num: number) => void;
  canStartGame: boolean;
  onStartGame: () => void;
  error?: string | null;
  shareUrl: string;
};

export const LobbyInfo: React.FC<LobbyInfoProps> = ({
                                                      lobbyId,
                                                      isCreator,
                                                      minPlayers,
                                                      setMinPlayers,
                                                      canStartGame,
                                                      onStartGame,
                                                      error,
                                                      shareUrl,
                                                    }) => {
  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <p className="mb-3 text-gray-700">
        <strong>ID лобби:</strong>{' '}
        <code className="bg-gray-100 px-2 py-1 rounded select-all">{lobbyId}</code>
      </p>

      <p className="mb-4">
        {isCreator ? (
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Вы создатель лобби
          </span>
        ) : (
          <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            Вы участник
          </span>
        )}
      </p>

      <div className="mb-6">
        <label className="block font-semibold mb-1 text-gray-700">Настройки лобби</label>
        <div className="flex items-center space-x-3 max-w-xs">
          <label className="text-gray-700 whitespace-nowrap">Мин. игроков:</label>
          <input
            type="number"
            min={2}
            max={10}
            value={minPlayers}
            onChange={(e) => setMinPlayers(Number(e.target.value))}
            className="border rounded px-3 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <button
        disabled={!canStartGame}
        onClick={onStartGame}
        className={`w-full py-2 rounded text-white transition ${
          canStartGame
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Начать игру
      </button>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      <p className="mt-6 text-sm text-gray-600 break-words">
        Поделитесь ссылкой с друзьями, чтобы они могли присоединиться:
      </p>
      <code className="block bg-gray-100 p-2 rounded break-all mt-1 select-all">{shareUrl}</code>
    </section>
  );
};
