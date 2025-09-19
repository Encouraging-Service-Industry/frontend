type Props = {
  onQuickService?: (serviceId: string) => void;
};

export default function HomePage({ onQuickService }: Props) {
  return (
    <div className="p-4 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Good Afternoon, Anna</h2>
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

      <h3 className="font-semibold text-lg text-gray-800 mb-4">Popular Services</h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <button onClick={() => onQuickService?.('home_cleaning')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Clean" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Home Cleaning</span>
        </button>
        <button onClick={() => onQuickService?.('appliance_repair')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Repair" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Appliance Repair</span>
        </button>
        <button onClick={() => onQuickService?.('errands')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Errand" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Errand Service</span>
        </button>
        <button onClick={() => onQuickService?.('gardening')} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Garden" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Gardening</span>
        </button>
      </div>
    </div>
  );
}


