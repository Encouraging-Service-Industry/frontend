import { providers } from '../data';
import type { Provider } from '../data';

type Props = {
  serviceTitle: string;
  onBack: () => void;
  onSelectProvider: (provider: Provider) => void;
};

export default function ProviderListPage({ serviceTitle, onBack, onSelectProvider }: Props) {
  // Map service titles to actual service names
  const serviceMapping: { [key: string]: string } = {
    'Home Cleaning Providers': 'Home Cleaning',
    'Appliance Repair Providers': 'Appliance Repair',
    'Errand Service Providers': 'Errand Service',
    'Gardening Providers': 'Gardening'
  };

  const actualServiceName = serviceMapping[serviceTitle] || serviceTitle;
  
  const serviceProviders = Object.entries(providers)
    .filter(([, p]) => p.service === actualServiceName)
    .map(([id, p]) => ({ id, ...p }));

  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="mb-4 text-gray-500 hover:text-gray-800 transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{serviceTitle} Providers</h2>
      <div className="space-y-4">
        {serviceProviders.map(provider => (
          <button 
            key={provider.id} 
            onClick={() => onSelectProvider(provider)}
            className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
          >
            <img src={provider.avatar} className="rounded-full mr-4" width={60} height={60} alt={provider.name} />
            <div>
              <h3 className="font-semibold text-gray-800">{provider.name}</h3>
              <div className="flex items-center text-yellow-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-600 font-semibold text-sm">{provider.rating}</span>
                <span className="ml-2 text-gray-400 text-xs">({provider.reviews} Reviews)</span>
              </div>
              <p className="text-sm text-gray-500">{provider.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
