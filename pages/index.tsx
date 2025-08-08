import Link from 'next/link';

const games = [
  { id: 'tic-tac-toe', name: 'Крестики-нолики' },
  // Добавляй сюда новые игры по мере развития проекта
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Выберите игру</h1>
      <ul className="space-y-4 w-full max-w-md">
        {games.map((game) => (
          <li key={game.id}>
            <Link href={`/lobby/${game.id}`} className="block w-full bg-white shadow-md rounded-lg py-4 text-center text-xl font-semibold text-blue-700 hover:bg-blue-100 transition">
              {game.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
