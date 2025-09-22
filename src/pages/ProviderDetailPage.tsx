import type { Provider } from '../data';

type Props = {
  provider: Provider;
  onBack: () => void;
  onChat: () => void;
  onBook: () => void;
};

export default function ProviderDetailPage({ provider, onBack, onChat, onBook }: Props) {
  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Providers
      </button>
      
      <div className="flex items-center mb-4">
        <img src={provider.avatar} className="rounded-full mr-4 shadow-md" width={80} height={80} alt={provider.name} />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{provider.name} ({provider.service})</h2>
          <div className="flex items-center text-yellow-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-600 font-semibold">{provider.rating}</span>
            <span className="ml-2 text-gray-400 text-sm">({provider.reviews} Reviews)</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onChat}
        className="w-full py-3 mb-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Chat with {provider.name}
      </button>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">Identity Verified</span>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Background Check Passed</span>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">5 Years Experience</span>
      </div>

      <p className="text-gray-600 mb-6">{provider.description}</p>

      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Service Details</h3>
        <img src="https://placehold.co/400x200/f1f5f9/4f46e5?text=Service+Description" className="rounded-lg w-full mb-3" alt="Service Description" />
        <ul className="list-disc pl-6 text-gray-600">
          <li>Kitchen degreasing, wiping down appliances</li>
          <li>Vacuuming and mopping bedrooms and living room</li>
          <li>Bathroom sanitization, organizing toiletries</li>
        </ul>
      </div>
      
      <button 
        onClick={onBook}
        className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}
