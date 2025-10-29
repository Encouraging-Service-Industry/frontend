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
      image: "/assets/cleaning.jpg",
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
      image: "/assets/errand.jpg",
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
      image: "/assets/repair.jpg",
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
      image: "/assets/gardening.jpg",
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
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-8">
        {/* Hero Section - Revamped */}
      <div
        className="relative bg-cover bg-center h-96 rounded-2xl flex items-center justify-center text-white shadow-lg"
        style={{ backgroundImage: "url('/assets/cleaning.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Your Life, Simplified. Services, Delivered.
          </h1>
          <p className="text-base md:text-lg mb-8">
            Connect with trusted local providers for home cleaning, repairs,
            errands, and more. Reclaim your time, enhance your life.
          </p>
          <button
            onClick={() => onQuickService?.("", "")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-indigo-700 transition-colors shadow-xl"
          >
            Explore Services
          </button>
        </div>
      </div>

      {/* Search Section - Enhanced */}
      <div className="bg-white p-8 rounded-2xl shadow-xl mx-auto -mt-16 relative z-10 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Find Your Perfect Service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700 appearance-none transition-all duration-200 ease-in-out"
            >
              <option value="">Select a Service</option>
            {Object.values(servicesData).map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700 appearance-none transition-all duration-200 ease-in-out"
            >
              <option value="">All Locations</option>
            <option>Helsinki</option>
            <option>Espoo</option>
            <option>Vantaa</option>
            </select>
          </div>

          <button
            onClick={handleQuickSearch}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            Search Services
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Value Dashboard - Enhanced */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-2xl shadow-xl relative text-center flex flex-col justify-between">
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
          <h3 className="text-xl font-bold text-indigo-900 mb-2">My Time Value</h3>

          {(() => {
            const demoHistory: ServiceRecord[] = [
              { serviceName: 'Home Cleaning', category: 'homeCleaning', duration: 15, cost: 120, date: new Date().toISOString() },
              { serviceName: 'Errand Helper', category: 'errandService', duration: 8, cost: 60, date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() },
              { serviceName: 'Online Course', category: 'learning', duration: 6, cost: 200, date: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString() },
              { serviceName: 'Appliance Repair', category: 'applianceRepair', duration: 4, cost: 80, date: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString() },
              { serviceName: 'Gardening', category: 'gardening', duration: 2, cost: 40, date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() },
            ];
            const preview = calculateInvestmentPortfolio(demoHistory);
            const totalHoursSaved = preview.totalTimeCoins / 10;
            let dynamicMessage = "";
            if (totalHoursSaved >= 1 && totalHoursSaved <= 10) {
              dynamicMessage = "Time for a relaxing evening and a good book!";
            } else if (totalHoursSaved >= 11 && totalHoursSaved <= 25) {
              dynamicMessage = "That's multiple family dinners and bedtime stories!";
            } else if (totalHoursSaved >= 26) {
              dynamicMessage = "You've earned a full weekend — for your passions and people.";
            }
            return (
              <div className="flex flex-col items-center justify-center"> {/* Use flex-grow to occupy available space */}
                <div className="text-4xl font-extrabold text-indigo-700 leading-none mb-2">{preview.totalTimeCoins}</div>
                <div className="text-base text-indigo-500 mb-2">Time Coins Accumulated</div>

                <div className="text-lg font-semibold text-indigo-900 mb-4 text-center">
                  {dynamicMessage}
                </div>

                <p className="text-sm text-indigo-800 mb-4 text-center">That's <span className="font-bold">{totalHoursSaved} hours</span> of your life back.</p>

                <div className="mt-auto w-full text-center"> {/* CTA button at the bottom */}
                  <button onClick={onOpenValueDashboardDetail} className="px-8 py-3 bg-indigo-600 text-white rounded-full text-base font-semibold hover:bg-indigo-700 transition shadow-md w-fit">
                      See How You're Growing
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Supplier CTA - Enhanced */}
        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-2xl shadow-lg flex flex-col justify-between">
          <div className="text-center">
            <h3 className="text-xl font-bold text-emerald-900 mb-4">
              Become a Provider
            </h3>
            <p className="text-emerald-800 mb-6 text-base">
              Join our network of trusted service providers. Grow your business and reach more customers.
            </p>
            <button
              onClick={onOpenSupplierWelcome}
              className="bg-emerald-600 text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-emerald-700 transition-colors shadow-md"
            >
              Get Verified Now
            </button>
          </div>
        </div>


      </div>

      {/* Social Proof Banner - Enhanced */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-2xl shadow-md border border-blue-200 text-center lg:col-span-2 flex items-center justify-center space-x-3 mt-8">
        <span className="text-3xl">⭐</span>
        <p className="text-blue-800 font-semibold text-base">
          Join <span className="font-bold text-xl text-indigo-700">1200+ happy users</span> in
          Helsinki who outsource tasks! 🎉
        </p>
      </div>

      {/* Smart Recommendation - Differentiated */}
      <div className="lg:col-span-2 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Smart Recommendations
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-blue-100 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse-slow"></div>
          <div className="flex-shrink-0 relative z-10">
            <img
              src={currentRecommendation.image}
              alt={currentRecommendation.title}
              className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-white"
            />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              Personalized Recommendation
            </span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {currentRecommendation.title}
            </h3>
            <p className="text-base text-gray-600 mb-4">
              {currentRecommendation.description}
            </p>
            <button
              onClick={() =>
                onQuickService?.(
                  currentRecommendation.serviceId,
                  selectedLocation
                )
              }
              className="bg-indigo-600 text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-indigo-700 transition-colors shadow-md"
            >
              {currentRecommendation.buttonText} →
            </button>
          </div>
                  </div>
                </div>
        
                      
              {/* Popular Services - Enhanced */}      <div className="lg:col-span-2 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Discover Popular Services
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
        <div className="text-center mt-10">
          <button
            onClick={() => onQuickService?.("", "")}
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full text-base font-semibold hover:bg-gray-300 transition-colors shadow-md"
          >
            View All Services →
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
