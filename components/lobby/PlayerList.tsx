import React from 'react';
import { Player } from '../../hooks/useLobbySocket';

type PlayerListProps = {
  players: Player[];
  currentPlayerName: string;
  creatorId: string;
  currentSocketId?: string;
  onToggleReady: () => void;
};

export const PlayerList: React.FC<PlayerListProps> = ({
                                                        players,
                                                        currentPlayerName,
                                                        creatorId,
                                                        onToggleReady,
                                                      }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Игроки в лобби</h2>
      <ul className="border rounded max-h-64 overflow-y-auto divide-y divide-gray-200">
        {players.length === 0 && (
          <li className="p-3 text-gray-500 text-center">Пока нет игроков</li>
        )}
        {players.map((player) => {
          const isCurrent = player.name === currentPlayerName;
          const isCreator = player.id === creatorId;
          return (
            <li key={player.id} className="flex justify-between items-center p-3 hover:bg-gray-50">
              <div>
                <span className="font-medium">{player.name}</span>{' '}
                {isCreator && <span className="text-sm text-blue-600">(Создатель)</span>}
                {isCurrent && <span className="ml-2 text-xs text-gray-500">(Вы)</span>}
              </div>
              <button
                onClick={() => isCurrent && onToggleReady()}
                className={`text-sm font-semibold transition ${
                  player.ready ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                }`}
                aria-label={player.ready ? 'Отменить готовность' : 'Отметить готовность'}
              >
                {player.ready ? 'Готов' : 'Не готов'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
