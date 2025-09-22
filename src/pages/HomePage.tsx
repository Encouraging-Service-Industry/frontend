import { useState } from 'react';
import { servicesData } from '../data'; // Import servicesData

type Props = {
  onQuickService?: (serviceId: string, location: string) => void; // Update prop signature
  onOpenNotifications?: () => void; // Add onOpenNotifications prop
  onOpenValueDashboardDetail: () => void; // New prop for opening Value Dashboard detail
};

export default function HomePage({ onQuickService, onOpenNotifications, onOpenValueDashboardDetail }: Props) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleQuickSearch = () => {
    if (selectedService && selectedLocation) {
      onQuickService?.(selectedService, selectedLocation);
    } else if (selectedService) {
      onQuickService?.(selectedService, ''); // Search with service only
    } else if (selectedLocation) {
      // If only location is selected, how should we handle it? For now, we'll navigate to services with just location.
      // This would require a modification in App.tsx to handle location-only filtering when going to services page.
      // For current implementation, onQuickService expects serviceId as first arg, so we pass empty string if no service.
      onQuickService?.('', selectedLocation);
    } else {
      // If neither is selected, maybe navigate to services without filters or show a message
      // For now, let's just do nothing or maybe onQuickService?.('', '');
      onQuickService?.('', '');
    }
  };
  return (
    <div className="p-4 pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Good Afternoon, Anna</h2>
        <button onClick={onOpenNotifications} className="text-gray-500 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl mb-6 shadow-md">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Find Services Quickly</h3>
        <div className="space-y-4">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Select a Service</option>
            {Object.values(servicesData).map((service) => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">All Locations</option>
            <option>Helsinki</option>
            <option>Espoo</option>
            <option>Vantaa</option>
          </select>

          <button
            onClick={handleQuickSearch}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          >
            Search Services
          </button>
        </div>
      </div>
      <div className="bg-indigo-50 p-6 rounded-2xl mb-6 shadow-md relative">
        <button 
          onClick={onOpenValueDashboardDetail} 
          className="absolute top-4 right-4 text-indigo-700 hover:text-indigo-900 transition-colors"
          aria-label="View Value Dashboard details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
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
          <button onClick={() => onQuickService?.('home_cleaning', selectedLocation)} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800">Book Now →</button>
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
          <button onClick={() => onQuickService?.('errands', selectedLocation)} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800">Book Now →</button>
        </div>
      </div>

      <h3 className="font-semibold text-lg text-gray-800 mb-4">Popular Services</h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <button onClick={() => onQuickService?.('home_cleaning', selectedLocation)} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Clean" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Home Cleaning</span>
        </button>
        <button onClick={() => onQuickService?.('appliance_repair', selectedLocation)} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Repair" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Appliance Repair</span>
        </button>
        <button onClick={() => onQuickService?.('errands', selectedLocation)} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Errand" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Errand Service</span>
        </button>
        <button onClick={() => onQuickService?.('gardening', selectedLocation)} className="flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <img src="https://placehold.co/40x40/f1f5f9/4f46e5?text=Garden" className="mb-1 rounded-full" />
          <span className="text-xs text-gray-600">Gardening</span>
        </button>
      </div>
    </div>
  );
}


