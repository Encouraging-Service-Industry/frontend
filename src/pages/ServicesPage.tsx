import { useMemo, useState, useEffect } from 'react';
import { servicesData, providers, vendorsData } from '../data';
import type { Provider } from '../data';

type Props = {
  onOpenProvider?: (provider: Provider) => void;
  preselectedService?: string;
  preselectedLocation?: string; // New prop for preselected location
};

export default function ServicesPage({ onOpenProvider, preselectedService, preselectedLocation }: Props) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'name-asc' | 'name-desc' | 'providers-desc' | 'providers-asc'>('name-asc');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(preselectedService || null);
  const [vendorFilter, setVendorFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState(preselectedLocation || '');

  const services = useMemo(() => {
    const arr = Object.values(servicesData).map(svc => ({
      ...svc,
      providersCount: Object.values(providers).filter(p => (p.service && p.service.toLowerCase() === svc.name.toLowerCase()) || (p.services || []).includes(svc.id)).length,
    }));
    const q = query.trim().toLowerCase();
    const filtered = arr.filter(s => !q || s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q));
    const sorted = filtered.sort((a, b) => {
      switch (sort) {
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'providers-desc':
          return (b as any).providersCount - (a as any).providersCount;
        case 'providers-asc':
          return (a as any).providersCount - (b as any).providersCount;
        case 'name-asc':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return sorted;
  }, [query, sort]);

  // Auto-select preselected service
  useEffect(() => {
    if (preselectedService) {
      const service = Object.values(servicesData).find(s => s.id === preselectedService);
      if (service) {
        setActiveServiceId(service.id);
      }
    }
  }, [preselectedService]);

  const activeService = activeServiceId ? servicesData[activeServiceId] : null;
  const vendorOptions = Object.values(vendorsData);

  const providerList = useMemo(() => {
    if (!activeService) return [] as Provider[];
    const base = Object.values(providers).filter(
      p => (p.service && p.service.toLowerCase() === activeService.name.toLowerCase()) || (p.services || []).includes(activeService.id)
    );
    const minRating = parseFloat(ratingFilter || '0');
    return base.filter(p => {
      const vOk = !vendorFilter || p.vendorId === vendorFilter;
      const rOk = (parseFloat(p.rating) || 0) >= minRating;
      const lOk = !locationFilter || (p.location || '').toLowerCase().includes(locationFilter.toLowerCase());
      return vOk && rOk && lOk;
    });
  }, [activeService, vendorFilter, ratingFilter, locationFilter]);

  return (
    <div className="p-4">
      {!activeService && (
        <>
          <header className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Explore Services</h1>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">Browse available service categories and find providers across vendors.</p>
          </header>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-2/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
            <div className="w-full sm:w-1/3">
              <select value={sort} onChange={e => setSort(e.target.value as any)} className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none cursor-pointer bg-white">
                <option value="name-asc">Sort by Name (Asc)</option>
                <option value="name-desc">Sort by Name (Desc)</option>
                <option value="providers-desc">Sort by Providers (Desc)</option>
                <option value="providers-asc">Sort by Providers (Asc)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {services.length === 0 && (
              <div className="text-center text-gray-500 mt-10 text-lg">No matching services found.</div>
            )}
            {services.map(svc => (
              <button key={svc.id} onClick={() => setActiveServiceId(svc.id)} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
                <img src={svc.icon} className="rounded-full mr-4" width={40} height={40} alt={svc.name} />
                <div>
                  <h3 className="font-semibold text-gray-800">{svc.name}</h3>
                  <p className="text-sm text-gray-500">{svc.description}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {activeService && (
        <>
          <button onClick={() => setActiveServiceId(null)} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </button>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 mb-4">
            <div className="flex items-start">
              <img src={activeService.icon} className="rounded-full mr-4 shadow-md" width={60} height={60} alt={activeService.name} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{activeService.name}</h2>
                <p className="text-gray-600">{activeService.description}</p>
                <p className="text-gray-500 mt-2 text-sm">Providers available: {providerList.length}</p>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <select value={vendorFilter} onChange={e => setVendorFilter(e.target.value)} className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">All Vendors</option>
              {vendorOptions.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
            <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">All Ratings</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
            </select>
            <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">All Locations</option>
              <option>Helsinki</option>
              <option>Espoo</option>
              <option>Vantaa</option>
            </select>
          </div>
          <div className="space-y-3">
            {providerList.length === 0 && (
              <div className="text-gray-500">No providers match filters.</div>
            )}
            {providerList.map(p => (
              <button key={p.id} onClick={() => onOpenProvider?.(p)} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
                <img src={p.avatar} className="rounded-full mr-4" width={60} height={60} alt={p.name} />
                <div>
                  <h4 className="font-semibold text-gray-800">{p.name}</h4>
                  <p className="text-sm text-gray-500">{p.service} • ¥{p.price ?? '-'} • {(p.location || '').split(',')[0] || ''}</p>
                  {p.description && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{p.description}</p>}
                  <div className="flex items-center text-yellow-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <span className="ml-1 text-gray-600 font-semibold text-sm">{p.rating}</span>
                    <span className="ml-2 text-gray-400 text-xs">({p.reviews} Reviews)</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


