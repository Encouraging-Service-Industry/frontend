export default function StoryWallPage() {
  return (
    <div className="p-4 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Community Stories</h2>
        <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Post Your Story
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-xl mb-4 text-center border-l-4 border-indigo-500">
        <p className="text-gray-800 font-medium"><span className="text-indigo-600 font-bold">80%</span> of families in your area use home cleaning services!</p>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-3">
            <img src="https://placehold.co/40x40/e0e7ff/4f46e5?text=Ava" className="rounded-full mr-3" />
            <div>
              <h4 className="font-semibold text-gray-800">Ava</h4>
              <p className="text-xs text-gray-500">First time outsourcing, relaxing weekend!</p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-medium ml-auto px-2 py-1 rounded-full">First-Timer</span>
          </div>
          <p className="text-gray-600 mb-3">After using the weekly cleaning service, I finally have time to take the kids to the park on weekends! The house is clean and I feel great!</p>
          <img src="https://placehold.co/400x200/e0e7ff/4f46e5?text=Clean+House" className="rounded-lg w-full mb-3" />
        </div>
      </div>
    </div>
  );
}



