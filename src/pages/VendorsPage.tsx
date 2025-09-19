import { useMemo, useState } from 'react';
import { vendorsData, VendorCompany } from '../data';

type Props = {
  onOpenCompany?: (vendor: VendorCompany) => void;
};

export default function VendorsPage({ onOpenCompany }: Props) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'name-asc' | 'name-desc' | 'rating-desc' | 'rating-asc'>('name-asc');
  const [location, setLocation] = useState('');

  const list = useMemo(() => {
    const arr = Object.values(vendorsData).map(v => ({
      ...v,
      ratingNum: typeof v.rating === 'number' ? v.rating : parseFloat(String(v.rating)) || 0,
    }));
    const q = query.trim().toLowerCase();
    const filtered = arr
      .filter(v =>
        !q ||
        v.name.toLowerCase().includes(q) ||
        (v.description || '').toLowerCase().includes(q) ||
        (v.services || []).join(', ').toLowerCase().includes(q)
      )
      .filter(v => !location || (v.coverageAreas || []).map(a => a.toLowerCase()).includes(location.toLowerCase()));
    const sorted = filtered.sort((a, b) => {
      switch (sort) {
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return b.ratingNum - a.ratingNum;
        case 'rating-asc':
          return a.ratingNum - b.ratingNum;
        case 'name-asc':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return sorted;
  }, [query, sort, location]);

  return (
    <div className="p-4">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Explore Vendors</h1>
        <p className="text-md text-gray-600 max-w-2xl mx-auto">Discover trusted companies and their service providers.</p>
      </header>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-2/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search vendors..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
        </div>
        <div className="w-full sm:w-1/3 flex gap-2">
          <select value={sort} onChange={e => setSort(e.target.value as any)} className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none cursor-pointer bg-white">
            <option value="name-asc">Sort by Name (Asc)</option>
            <option value="name-desc">Sort by Name (Desc)</option>
            <option value="rating-desc">Sort by Rating (Desc)</option>
            <option value="rating-asc">Sort by Rating (Asc)</option>
          </select>
          <select value={location} onChange={e => setLocation(e.target.value)} className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none cursor-pointer bg-white">
            <option value="">All Locations</option>
            <option>Beijing</option>
            <option>Chaoyang</option>
            <option>Haidian</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {list.length === 0 && (
          <div className="text-center text-gray-500 mt-10 text-lg">No matching vendors found.</div>
        )}
        {list.map(v => (
          <button key={v.id} onClick={() => onOpenCompany?.(v)} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
            <img src={v.logo} className="rounded-full mr-4" width={60} height={60} alt={v.name} />
            <div>
              <h3 className="font-semibold text-gray-800">{v.name}</h3>
              <p className="text-sm text-gray-500">{(v.services || []).join(', ')}</p>
              <div className="flex items-center text-yellow-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span className="ml-1 text-gray-600 font-semibold text-sm">{v.rating}</span>
                <span className="ml-2 text-gray-400 text-xs">({v.reviews} Reviews)</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


