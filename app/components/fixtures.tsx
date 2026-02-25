const fixtures = [
  "Wolves vs Aston Villa - 00:00",
  "Bournemouth vs Sunderland - 16:30",
  "Burnley vs Brentford - 19:00",
  "Liverpool vs West Ham - 19:00",
  "Newcastle vs Everton - 19:00",
  "Leeds vs Man City - 21:30"
]

export default function Fixtures() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="font-bold text-lg mb-6">Premier League</h2>

      <div className="space-y-4 text-sm">
        {fixtures.map((match, index) => (
          <div
            key={index}
            className="border-b pb-3 last:border-none"
          >
            {match}
          </div>
        ))}
      </div>
    </div>
  )
}