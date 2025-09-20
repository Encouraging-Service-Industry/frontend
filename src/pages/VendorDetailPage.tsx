import { vendorsData, providers } from '../data';
import type { VendorCompany, Provider } from '../data';

type Props = {
  vendor: VendorCompany;
  onBack: () => void;
  onOpenProvider?: (provider: Provider) => void;
};

export default function VendorDetailPage({ vendor, onBack, onOpenProvider }: Props) {
  const employees = Object.entries(providers)
    .filter(([, p]) => p.vendorId === vendor.id)
    .map(([id, p]) => ({ id, ...p }));

  return (
    <div className="p-4 pt-6">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 flex items-start">
          <img src={vendor.logo} className="rounded-xl mr-4 shadow-md" width={80} height={80} alt={vendor.name} />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{vendor.name}</h2>
            <div className="flex items-center text-yellow-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="ml-1 text-gray-600 font-semibold">{vendor.rating}</span>
              <span className="ml-2 text-gray-400 text-sm">({vendor.reviews} Reviews)</span>
            </div>
            <p className="text-gray-600">{vendor.description}</p>
            <p className="text-gray-500 mt-2 text-sm">Services: {(vendor.services || []).join(', ')}</p>
          </div>
        </div>
        <div className="p-6 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Service Providers</h3>
          <div className="space-y-3">
            {employees.length === 0 ? (
              <p className="text-gray-500">No providers listed yet.</p>
            ) : (
              employees.map(emp => (
                <button 
                  key={emp.id} 
                  onClick={() => onOpenProvider?.(emp)} 
                  className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
                >
                  <img src={emp.avatar} className="rounded-full mr-4" width={60} height={60} alt={emp.name} />
                  <div>
                    <h4 className="font-semibold text-gray-800">{emp.name}</h4>
                    <p className="text-sm text-gray-500">{emp.service}</p>
                    <div className="flex items-center text-yellow-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="ml-1 text-gray-600 font-semibold text-sm">{emp.rating}</span>
                      <span className="ml-2 text-gray-400 text-xs">({emp.reviews} Reviews)</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
