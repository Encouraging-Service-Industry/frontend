import React, { useState, useEffect } from "react";

type LocationStatus = "en_route" | "arrived" | "working" | "completed";

type ProviderLocation = {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  eta: string;
  distance: string;
  status: LocationStatus;
  coordinates: {
    lat: number;
    lng: number;
  };
};

type Props = {
  provider: {
    name: string;
    avatar: string;
    phone: string;
    rating: number;
    service: string;
  };
  bookingId: string;
  onBack: () => void;
  onComplete: () => void;
};

export default function LocationTrackingPage({
  provider,
  bookingId,
  onBack,
  onComplete,
}: Props) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [providerLocation, setProviderLocation] = useState<ProviderLocation>({
    id: "1",
    name: provider.name,
    avatar: provider.avatar,
    phone: provider.phone,
    eta: "15 min",
    distance: "2.3 km",
    status: "en_route",
    coordinates: {
      lat: 60.1699 + Math.random() * 0.01,
      lng: 24.9384 + Math.random() * 0.01,
    },
  });

  const [nearbyOptions, setNearbyOptions] = useState([
    {
      id: "1",
      name: "Home Cleaning",
      provider: "Kimalle Puhdistus Oy",
      estimatedTime: "15 min",
      price: "€45/hr",
      icon: "🧹",
      rating: 4.7,
      coordinates: { lat: 60.1699 + 0.008, lng: 24.9384 - 0.006 },
    },
    {
      id: "2",
      name: "Appliance Repair",
      provider: "Kodinkone Gurut",
      estimatedTime: "30 min",
      price: "from €30",
      icon: "🔧",
      rating: 4.5,
      coordinates: { lat: 60.175 + 0.004, lng: 24.94 + 0.004 },
    },
    {
      id: "3",
      name: "Grocery Delivery",
      provider: "Market Fresh",
      estimatedTime: "20 min",
      price: "€15",
      icon: "🛒",
      rating: 4.3,
      coordinates: { lat: 60.165 - 0.006, lng: 24.935 + 0.003 },
    },
  ]);

  // Geolocate user (best-effort) and fallback to Helsinki center if denied/unavailable
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported");
      setUserLocation({ lat: 60.1699, lng: 24.9384 });
      return;
    }
    const timeoutId = window.setTimeout(() => {
      if (!userLocation) {
        setUserLocation({ lat: 60.1699, lng: 24.9384 });
      }
    }, 4000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.clearTimeout(timeoutId);
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        window.clearTimeout(timeoutId);
        setGeoError(err.message || "Geolocation failed");
        setUserLocation({ lat: 60.1699, lng: 24.9384 });
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 3500 }
    );
  }, []);

  const toKm = (meters: number) => `${(meters / 1000).toFixed(1)} km`;
  const haversine = (
    a: { lat: number; lng: number },
    b: { lat: number; lng: number }
  ) => {
    const R = 6371000; // meters
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const sinDLat = Math.sin(dLat / 2);
    const sinDLng = Math.sin(dLng / 2);
    const h =
      sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return R * c;
  };

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProviderLocation((prev) => ({
        ...prev,
        eta: Math.max(1, parseInt(prev.eta) - 1) + " min",
        distance: (parseFloat(prev.distance) - 0.1).toFixed(1) + " km",
        coordinates: {
          lat: prev.coordinates.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.coordinates.lng + (Math.random() - 0.5) * 0.001,
        },
      }));

      // Simulate status changes
      if (Math.random() < 0.1) {
        const statuses: LocationStatus[] = ["en_route", "arrived", "working"];
        const currentIndex = statuses.indexOf(providerLocation.status);
        if (currentIndex < statuses.length - 1) {
          setProviderLocation((prev) => ({
            ...prev,
            status: statuses[currentIndex + 1],
          }));
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [providerLocation.status]);

  const getStatusColor = (status: LocationStatus) => {
    switch (status) {
      case "en_route":
        return "text-blue-600 bg-blue-50";
      case "arrived":
        return "text-green-600 bg-green-50";
      case "working":
        return "text-orange-600 bg-orange-50";
      case "completed":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: LocationStatus) => {
    switch (status) {
      case "en_route":
        return "On the way";
      case "arrived":
        return "Arrived";
      case "working":
        return "Working";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="w-full h-full max-w-full p-4 md:p-6 overflow-auto">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300"
        aria-label="Back"
      >
        <svg
          className="w-4 h-4 mr-2"
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
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Service Tracking
      </h1>
      <p className="text-gray-600 mb-6">
        Track your service provider in real-time
      </p>

      {/* Provider Status Card */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 mb-6">
        <div className="flex items-center mb-4">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
            <p className="text-sm text-gray-600">{provider.service}</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm text-gray-600 ml-1">
                {provider.rating}
              </span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              providerLocation.status
            )}`}
          >
            {getStatusText(providerLocation.status)}
          </div>
        </div>

        {/* ETA and Distance */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">ETA</p>
            <p className="text-xl font-bold text-gray-900">
              {providerLocation.eta}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Distance</p>
            <p className="text-xl font-bold text-gray-900">
              {providerLocation.distance}
            </p>
          </div>
        </div>

        {/* Contact Provider */}
        <button className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          📞 Call Provider
        </button>
      </div>

      {/* Live Finland Map (shows user's location) */}
      <div className="bg-gray-100 rounded-xl h-48 md:h-64 w-full mb-4 overflow-hidden">
        <iframe
          title="Finland Map"
          className="w-full h-full border-0"
          src={(() => {
            const west = 19.0;
            const south = 59.5;
            const east = 32.0;
            const north = 70.2;
            const lat = (userLocation?.lat ?? 60.1699).toFixed(5);
            const lng = (userLocation?.lng ?? 24.9384).toFixed(5);
            const bbox = `${west}%2C${south}%2C${east}%2C${north}`;
            const marker = `${lat}%2C${lng}`;
            return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
          })()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {geoError && (
        <div className="text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded px-2 py-1 mb-4">
          Location permission unavailable. Using default Helsinki location.
        </div>
      )}

      {/* Available providers nearby (mock) */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Available providers nearby
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Showing mock providers based on your current location
        </p>
        <div className="space-y-3">
          {nearbyOptions.map((option) => {
            const user = userLocation || { lat: 60.1699, lng: 24.9384 };
            const meters = haversine(user, option.coordinates);
            const distance = toKm(meters);
            return (
              <div
                key={option.id}
                className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{option.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {option.name}
                      </h3>
                      <p className="text-sm text-gray-600">{option.provider}</p>
                      <p className="text-xs text-gray-500">
                        ⭐ {option.rating}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {option.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      {option.estimatedTime}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    📍 {distance} away
                  </span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complete Service Button */}
      {providerLocation.status === "completed" && (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          ✅ Service Completed
        </button>
      )}

      {/* Safety Features */}
      <div className="bg-blue-50 rounded-lg p-4 mt-6 text-center">
        <h3 className="font-bold text-blue-900 mb-2 text-2xl">
          Safety Features
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-center text-lg font-bold text-blue-800">
            <span className="mr-2">🔒</span>
            <span>Verified provider with background check</span>
          </div>
          <div className="flex items-center justify-center text-lg font-bold text-blue-800">
            <span className="mr-2">📱</span>
            <span>Real-time location sharing</span>
          </div>
          <div className="flex items-center justify-center text-lg font-bold text-blue-800">
            <span className="mr-2">🚨</span>
            <span>Emergency contact available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
