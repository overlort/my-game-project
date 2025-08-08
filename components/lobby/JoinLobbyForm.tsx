import React from 'react';

type JoinLobbyFormProps = {
  playerName: string;
  setPlayerName: (name: string) => void;
  onJoin: () => void;
};

export const JoinLobbyForm: React.FC<JoinLobbyFormProps> = ({ playerName, setPlayerName, onJoin }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Вход в лобби</h1>
      <input
        type="text"
        placeholder="Введите ваше имя"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && playerName.trim() && onJoin()}
        className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onJoin}
        disabled={!playerName.trim()}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
      >
        Войти в лобби
      </button>
    </div>
  );
};
