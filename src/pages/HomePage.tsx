import { useState } from "react";
import { servicesData, type VendorCompany } from "../data"; // Import servicesData
import ServiceCategoryCard from "../components/ServiceCategoryCard";
import { calculateInvestmentPortfolio, type ServiceRecord } from "../hooks/useInvestmentCalculator";

type Props = {
  onQuickService?: (serviceId: string, location: string) => void; // Update prop signature
  onOpenNotifications?: () => void; // Add onOpenNotifications prop
  onOpenValueDashboardDetail: () => void; // New prop for opening Value Dashboard detail
  onOpenVendorDetail?: (vendor: VendorCompany) => void; // kept for compatibility
  onOpenSupplierWelcome?: () => void; // new: supplier entry
};

export default function HomePage({
  onQuickService,
  onOpenNotifications,
  onOpenValueDashboardDetail,
  onOpenSupplierWelcome,
}: Props) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock dynamic recommendations
  const recommendations = [
    {
      id: "rec-1",
      category: "deep_clean",
      title: "Time for a kitchen deep clean?",
      description:
        "Based on your recent activity, your kitchen might appreciate a thorough clean. Free up your weekend!",
      serviceId: "home_cleaning",
      buttonText: "Book Deep Clean",
      icon: "✨",
    },
    {
      id: "rec-2",
      category: "errands",
      title: "Free up your evening!",
      description:
        "Let someone handle your grocery shopping and errands this week. More time for yourself!",
      serviceId: "errands",
      buttonText: "Book Errands",
      icon: "🛍️",
    },
    {
      id: "rec-3",
      category: "appliance_check",
      title: "Appliance acting up?",
      description:
        "It might be time for a quick check-up for your washing machine. Prevent bigger issues!",
      serviceId: "appliance_repair",
      buttonText: "Schedule Repair",
      icon: "🔧",
    },
    {
      id: "rec-4",
      category: "gardening_help",
      title: "Your garden needs some love!",
      description:
        "With spring approaching, consider hiring a gardener for those heavy tasks. Enjoy the bloom without the backache.",
      serviceId: "gardening",
      buttonText: "Find a Gardener",
      icon: "🌳",
    },
  ];

  // Select a random recommendation for display, or more complex logic later
  const currentRecommendation =
    recommendations[Math.floor(Math.random() * recommendations.length)];

  const handleQuickSearch = () => {
    if (selectedService && selectedLocation) {
      onQuickService?.(selectedService, selectedLocation);
    } else if (selectedService) {
      onQuickService?.(selectedService, ""); // Search with service only
    } else if (selectedLocation) {
      // If only location is selected, how should we handle it? For now, we'll navigate to services with just location.
      // This would require a modification in App.tsx to handle location-only filtering when going to services page.
      // For current implementation, onQuickService expects serviceId as first arg, so we pass empty string if no service.
      onQuickService?.("", selectedLocation);
    } else {
      // If neither is selected, maybe navigate to services without filters or show a message
      // For now, let's just do nothing or maybe onQuickService?.('', '');
      onQuickService?.("", "");
    }
  };
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome back, Anna
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find the perfect service providers for your needs. Save time, get
          quality work done.
        </p>
      </div>

      {/* Search Section */}
      <div className="card p-8 mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Find Services Quickly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
          >
            <option value="">Select a Service</option>
            {Object.values(servicesData).map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
          >
            <option value="">All Locations</option>
            <option>Helsinki</option>
            <option>Espoo</option>
            <option>Vantaa</option>
          </select>

          <button
            onClick={handleQuickSearch}
            className="btn-primary py-3 text-lg font-semibold"
          >
            Search Services
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Value Dashboard */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-lg relative text-center">
          <button
            onClick={onOpenValueDashboardDetail}
            className="absolute top-4 right-4 text-indigo-700 hover:text-indigo-900 transition-colors"
            aria-label="View Value Dashboard details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">My Investment</h3>

            {/* Compact preview: left = coins, right = future value + CTA */}
            {(() => {
              const demoHistory: ServiceRecord[] = [
                { serviceName: 'Home Cleaning', category: 'homeCleaning', duration: 15, cost: 120, date: new Date().toISOString() },
                { serviceName: 'Errand Helper', category: 'errandService', duration: 8, cost: 60, date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() },
                { serviceName: 'Online Course', category: 'learning', duration: 6, cost: 200, date: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString() },
                { serviceName: 'Appliance Repair', category: 'applianceRepair', duration: 4, cost: 80, date: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString() },
                { serviceName: 'Gardening', category: 'gardening', duration: 2, cost: 40, date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() },
              ];
              const preview = calculateInvestmentPortfolio(demoHistory);
              return (
                <div>
                  <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                    <div className="text-center">
                      <div className="text-4xl font-extrabold text-indigo-700 leading-tight">{preview.totalTimeCoins}</div>
                      <div className="text-sm text-indigo-500">Time Coins</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-600">Estimated Future Value</div>
                      <div className="text-2xl font-bold text-indigo-600">${preview.estimatedFutureValue.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                      <button onClick={onOpenValueDashboardDetail} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                          View Investment
                      </button>
                  </div>
                </div>
              );
            })()}
        </div>

        {/* Supplier CTA */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              Are you a supplier?
            </h3>
            <p className="text-emerald-800 mb-6 text-lg">
              Get verified to earn trust badges and grow your bookings.
            </p>
            <button
              onClick={onOpenSupplierWelcome}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Get Verified
            </button>
          </div>
        </div>
      </div>

      {/* Social Proof Banner */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200 text-center lg:col-span-2">
        <p className="text-blue-800 font-medium text-lg">
          Join <span className="font-bold text-xl">1200+ happy users</span> in
          Helsinki who outsource tasks! 🎉
        </p>
      </div>

      {/* Smart Recommendation */}
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Smart Recommendations
        </h2>
        <div className="card p-8 text-center">
          <span className="text-6xl mb-6 block">
            {currentRecommendation.icon}
          </span>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {currentRecommendation.title}
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {currentRecommendation.description}
          </p>
          <button
            onClick={() =>
              onQuickService?.(
                currentRecommendation.serviceId,
                selectedLocation
              )
            }
            className="btn-primary px-8 py-3 text-lg"
          >
            {currentRecommendation.buttonText} →
          </button>
        </div>
      </div>

      {/* Popular Services */}
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Popular Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[ // Define popular services data
            { id: "home_cleaning", name: "Home Cleaning", icon: "/assets/cleaning.jpg" },
            { id: "appliance_repair", name: "Appliance Repair", icon: "/assets/repair.jpg" },
            { id: "errands", name: "Errand Service", icon: "/assets/errand.jpg" },
            { id: "gardening", name: "Gardening", icon: "/assets/gardening.jpg" },
          ].map((service) => (
            <ServiceCategoryCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={servicesData[service.id]?.description || ""}
              icon={service.icon}
              providersCount={0}
              onClick={() => onQuickService?.(service.id, selectedLocation)}
              showProvidersCount={false}
              showDescription={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
