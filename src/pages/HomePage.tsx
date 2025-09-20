type Props = {
  onQuickService?: (serviceId: string) => void;
};

export default function HomePage({ onQuickService }: Props) {
  return (
    <div className="p-4 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Good Afternoon, Anna</h2>
        <button className="text-gray-500 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl mb-6 shadow-md">
        <h3 className="font-semibold text-lg text-indigo-900 mb-2">Your Value Dashboard</h3>
        <div className="flex items-center mb-2">
          <span className="text-5xl font-bold text-indigo-700">5 hours</span>
          <span className="text-xl text-indigo-500 ml-2">saved</span>
        </div>
        <div className="w-full bg-indigo-200 rounded-full h-2.5 mb-4">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }} />
        </div>
        <p className="text-indigo-900 font-medium">
          This is equivalent to... <span className="text-indigo-600 font-bold">one family dinner + one bedtime story</span>
        </p>
      </div>

      <h3 className="font-semibold text-lg text-gray-800 mb-4">Smart Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Based on your order history</p>
          <h4 className="font-medium text-gray-800">You might need a deep clean</h4>
          <div className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-4">
              <li>Kitchen degreasing</li>
              <li>Bedroom decluttering</li>
            </ul>
          </div>
          <button onClick={() => onQuickService?.('Home Cleaning Providers')} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800">Book Now →</button>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">You've had a busy week</p>
          <h4 className="font-medium text-gray-800">Consider a meal delivery service?</h4>
          <div className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-4">
              <li>Save time on grocery shopping and cooking</li>
              <li>Ensure your family eats healthy meals</li>
            </ul>
          </div>
          <button onClick={() => onQuickService?.('Errand Service Providers')} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800">Book Now →</button>
        </div>
      </div>

      <h3 className="font-semibold text-lg text-gray-800 mb-4">Popular Services</h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <button onClick={() => onQuickService?.('Home Cleaning Providers')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Clean" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Home Cleaning</span>
        </button>
        <button onClick={() => onQuickService?.('Appliance Repair Providers')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Repair" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Appliance Repair</span>
        </button>
        <button onClick={() => onQuickService?.('Errand Service Providers')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Errand" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Errand Service</span>
        </button>
        <button onClick={() => onQuickService?.('Gardening Providers')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Garden" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Gardening</span>
        </button>
      </div>
    </div>
  );
}


