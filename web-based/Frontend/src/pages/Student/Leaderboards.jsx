export default function Leaderboard() {
  const leaderboard = [
    { name: "Jashan", points: 96 },
    { name: "Harshit", points: 95 },
    { name: "Namish", points: 85 },
    { name: "Bhawik", points: 82 },
    { name: "LingLong", points: 80 },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
      <ul className="space-y-2">
        {leaderboard.map((student, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="flex items-center space-x-2">
              <span className="font-bold">
                {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "🎓"}
              </span>
              <span>
                {idx + 1}. {student.name}
              </span>
            </span>
            <span className="font-bold text-blue-600">{student.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
