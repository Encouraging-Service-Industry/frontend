import { useMemo, useState, useEffect } from "react";
import { servicesData, providers, vendorsData } from "../data";
import type { Provider, VendorCompany } from "../data"; // Import VendorCompany

type Props = {
  onOpenProvider?: (provider: Provider) => void;
  preselectedService?: string;
  preselectedLocation?: string; // New prop for preselected location
  onOpenVendorDetail: (vendor: VendorCompany) => void; // New prop for opening vendor detail
};

export default function ServicesPage({
  onOpenProvider,
  preselectedService,
  preselectedLocation,
  onOpenVendorDetail,
}: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<
    "name-asc" | "name-desc" | "providers-desc" | "providers-asc"
  >("name-asc");
  const [activeServiceId, setActiveServiceId] = useState<string | null>(
    preselectedService || null
  );
  const [vendorFilter, setVendorFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState(
    preselectedLocation || ""
  );

  const services = useMemo(() => {
    const arr = Object.values(servicesData).map((svc) => ({
      ...svc,
      providersCount: Object.values(providers).filter(
        (p) =>
          (p.service && p.service.toLowerCase() === svc.name.toLowerCase()) ||
          (p.services || []).includes(svc.id)
      ).length,
    }));
    const q = query.trim().toLowerCase();
    const filtered = arr.filter(
      (s) =>
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
    );
    const sorted = filtered.sort((a, b) => {
      switch (sort) {
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "providers-desc":
          return (b as any).providersCount - (a as any).providersCount;
        case "providers-asc":
          return (a as any).providersCount - (b as any).providersCount;
        case "name-asc":
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return sorted;
  }, [query, sort]);

  // Auto-select preselected service
  useEffect(() => {
    if (preselectedService) {
      const service = Object.values(servicesData).find(
        (s) => s.id === preselectedService
      );
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
      (p) =>
        (p.service &&
          p.service.toLowerCase() === activeService.name.toLowerCase()) ||
        (p.services || []).includes(activeService.id)
    );
    const minRating = parseFloat(ratingFilter || "0");
    return base.filter((p) => {
      const vOk = !vendorFilter || p.vendorId === vendorFilter;
      const rOk = (parseFloat(p.rating) || 0) >= minRating;
      const lOk =
        !locationFilter ||
        (p.location || "").toLowerCase().includes(locationFilter.toLowerCase());
      return vOk && rOk && lOk;
    });
  }, [activeService, vendorFilter, ratingFilter, locationFilter]);

  return (
    <div className="space-y-8">
      {!activeService && (
        <>
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse available service categories and find providers across
              vendors.
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none cursor-pointer bg-white"
                >
                  <option value="name-asc">Sort by Name (Asc)</option>
                  <option value="name-desc">Sort by Name (Desc)</option>
                  <option value="providers-desc">
                    Sort by Providers (Desc)
                  </option>
                  <option value="providers-asc">Sort by Providers (Asc)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.length === 0 && (
                <div className="col-span-full text-center text-gray-500 mt-10 text-xl">
                  No matching services found.
                </div>
              )}
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => setActiveServiceId(svc.id)}
                  className="card p-6 text-left hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={svc.icon}
                      className="rounded-full mr-4 w-14 h-14 object-cover"
                      width={56}
                      height={56}
                      alt={svc.name}
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">
                        {svc.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {(svc as any).providersCount} providers
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{svc.description}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {activeService && (
        <>
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setActiveServiceId(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Services
            </button>

            <div className="card p-8 mb-8">
              <div className="flex items-start">
                <img
                  src={activeService.icon}
                  className="rounded-full mr-6 shadow-md w-20 h-20 object-cover"
                  width={80}
                  height={80}
                  alt={activeService.name}
                />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {activeService.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    {activeService.description}
                  </p>
                  <p className="text-gray-500 text-lg">
                    Providers available:{" "}
                    <span className="font-semibold text-indigo-600">
                      {providerList.length}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <select
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Vendors</option>
                {vendorOptions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Locations</option>
                <option>Helsinki</option>
                <option>Espoo</option>
                <option>Vantaa</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerList.length === 0 && (
                <div className="col-span-full text-center text-gray-500 text-xl py-12">
                  No providers match the current filters.
                </div>
              )}
              {providerList.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onOpenProvider?.(p)}
                  className="card p-6 text-left hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={p.avatar}
                      className="rounded-full mr-4 w-15 h-15 object-cover"
                      width={60}
                      height={60}
                      alt={p.name}
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-1">
                        {p.service} • ¥{p.price ?? "-"} •{" "}
                        {(p.location || "").split(",")[0] || ""}
                      </p>
                      {p.vendorId && vendorsData[p.vendorId] && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent opening provider detail when clicking vendor
                            onOpenVendorDetail(vendorsData[p.vendorId]);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                        >
                          {vendorsData[p.vendorId].name}
                        </button>
                      )}
                    </div>
                  </div>
                  {p.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {p.description}
                    </p>
                  )}
                  <div className="flex items-center text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600 font-semibold">
                      {p.rating}
                    </span>
                    <span className="ml-2 text-gray-400 text-sm">
                      ({p.reviews} Reviews)
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
