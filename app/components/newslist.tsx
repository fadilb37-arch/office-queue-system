const news = [
  "Predict the final top six",
  "Alan Shearer's Team of the Week",
  "Will PL have FIVE Champions League spots?",
  "PL stars pay tribute to Milner",
  "Latest player injuries"
]

export default function NewsList() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="font-bold text-lg mb-6">Latest News</h2>

      <div className="space-y-5">
        {news.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="text-sm font-medium">{item}</div>
          </div>
        ))}
      </div>
    </div>
  )
}