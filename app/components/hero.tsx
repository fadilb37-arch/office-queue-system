export default function Hero() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col lg:flex-row gap-8 items-center">

        <img
          src="https://images.unsplash.com/photo-1606925797303-29f0cdd2d4e1"
          alt="Player"
          className="w-72 h-72 object-cover rounded-xl"
        />

        <div className="flex-1">
          <div className="bg-gradient-to-r from-green-400 to-lime-400 text-center text-white font-bold py-2 rounded-md mb-4">
            MATCHWEEK 27 WINNER
          </div>

          <h1 className="text-5xl font-extrabold text-purple-900 leading-tight">
            PLAYER OF THE MATCHWEEK
          </h1>

          <div className="mt-6 inline-block bg-gradient-to-r from-green-400 to-lime-400 px-6 py-3 rounded-lg font-bold text-xl">
            Viktor Gyökeres
          </div>

          <p className="mt-6 text-gray-600">
            Arsenal's Gyokeres voted Player of the Matchweek.
            The Swede tops our fan poll following his performance.
          </p>
        </div>

      </div>
    </div>
  )
}