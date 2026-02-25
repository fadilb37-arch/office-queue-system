export default function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="text-2xl font-bold text-purple-800">
          Premier League
        </div>

        <div className="hidden lg:flex gap-6 text-gray-700 font-medium">
          <span>Matches</span>
          <span>Table</span>
          <span>Statistics</span>
          <span>Fantasy</span>
          <span>News</span>
          <span>Transfers</span>
          <span>Players</span>
          <span>Clubs</span>
          <span>Video</span>
        </div>
      </div>

      <button className="border rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-100">
        Sign in
      </button>
    </div>
  )
}