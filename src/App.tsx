import { useState } from "react";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import StoryWallPage, { type Story } from "./pages/StoryWallPage"; // Import Story type and StoryWallPage
import ServicesPage from "./pages/ServicesPage";
import ProviderListPage from "./pages/ProviderListPage";
import ProviderDetailPage from "./pages/ProviderDetailPage"; // Updated import for ProviderDetailPage
import ChatPage from "./pages/ChatPage";
import BookingFlowPage from "./pages/BookingFlowPage";
import MinePage from "./pages/MinePage";
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import NotificationsPage from "./pages/NotificationsPage"; // Import NotificationsPage
import type { Provider, VendorCompany } from "./data"; // Re-import VendorCompany
import ValueDashboardDetailPage from "./pages/ValueDashboardDetailPage"; // Import ValueDashboardDetailPage
import { type MineOption } from "./pages/MinePage"; // Import MineOption type
import VendorDetailPage from "./pages/VendorDetailPage"; // Import VendorDetailPage
import SupplierWelcome from "./pages/SupplierWelcome";
import SupplierVerificationDashboard from "./pages/SupplierVerificationDashboard";
import SupplierQualificationReview from "./pages/SupplierQualificationReview";
import SupplierBackgroundCheck from "./pages/SupplierBackgroundCheck";
import SupplierPortfolioSetup from "./pages/SupplierPortfolioSetup";
import SupplierNotifications from "./pages/SupplierNotifications";
import LocationTrackingPage from "./pages/LocationTrackingPage";

type Tab =
  | "splash"
  | "home"
  | "story"
  | "services"
  | "provider-list"
  | "provider-detail"
  | "chat"
  | "booking"
  | "mine"
  | "login"
  | "notifications"
  | "value-dashboard-detail"
  | "vendor-detail-view"
  | "supplier-welcome"
  | "supplier-dashboard"
  | "supplier-qualification"
  | "supplier-background"
  | "supplier-portfolio"
  | "supplier-notifications"
  | "location-tracking";

export default function App() {
  const [tab, setTab] = useState<Tab>("login"); // Start at login page initially
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication
  const [loggedInUserName, setLoggedInUserName] = useState<string | null>(null); // New state for logged-in user's name
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const [currentVendor, setCurrentVendor] = useState<VendorCompany | null>(
    null
  ); // Re-introduce currentVendor state
  const [currentService, setCurrentService] = useState<string>("");
  const [preselectedLocation, setPreselectedLocation] = useState<string>(""); // New state for preselected location
  const [mineOption, setMineOption] = useState<MineOption | null>(null);
  const [isSupplierMode, setIsSupplierMode] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string>(""); // New state for booking ID
  const isSupplierTab =
    tab === "supplier-welcome" ||
    tab === "supplier-dashboard" ||
    tab === "supplier-qualification" ||
    tab === "supplier-background" ||
    tab === "supplier-portfolio" ||
    tab === "supplier-notifications";

  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      name: "Aino",
      title: "First time outsourcing, relaxing weekend!",
      content:
        "After using the weekly cleaning service, I finally have time to take the kids to the park on weekends! The house is clean and I feel great!", // Reverted to English
      type: "consumer",
      avatar: "https://placehold.co/40x40/e0e7ff/4f46e5?text=Ava", // Keep for now, but good to remember for a more complete change
      serviceCategory: "home_cleaning",
      timestamp: Date.now() - 3600000 * 24 * 3, // 3 days ago
      image: "https://placehold.co/400x200/e0e7ff/4f46e5?text=Clean+House",
      badge: "First-Timer",
      likes: 15,
      comments: 3,
    },
    // Mock Provider Story
    {
      id: 2,
      name: "Elina (Kimalle Puhdistus Oy)", // Finnish provider name
      title: "Our latest deep clean transformation!",
      content:
        "Check out the amazing results from our team's deep clean project today. We love making homes sparkle! #HomeCleaning #DeepClean #SatisfactionGuaranteed", // Reverted to English
      type: "provider",
      avatar: "https://placehold.co/40x40/dbeafe/3b82f6?text=Emily",
      serviceCategory: "home_cleaning",
      timestamp: Date.now() - 3600000 * 24 * 1, // 1 day ago
      image:
        "https://placehold.co/400x200/fee2e2/ef4444?text=Sparkle+Clean+Result",
      likes: 25,
      comments: 5,
    },
    // Mock Provider Story for Jane
    {
      id: 4, // Unique ID
      name: "Johanna (Kimalle Puhdistus Oy)", // Finnish provider name
      title: "Making homes sparkle, one brushstroke at a time!",
      content:
        "Just finished a fantastic deep clean in Helsinki city center. The client was thrilled! It's so rewarding to bring freshness to homes. #CleaningLife #HappyClient #HelsinkiServices", // Reverted to English, location updated
      type: "provider",
      avatar: "https://placehold.co/40x40/e0e7ff/4f46e5?text=Jane",
      serviceCategory: "home_cleaning",
      timestamp: Date.now() - 3600000 * 24 * 0.5, // Half a day ago
      likes: 18,
      comments: 2,
    },
    // Original Mark story (now ID 3)
    {
      id: 3,
      name: "Mika",
      title: "Appliance fixed, saved a fortune!",
      content:
        "My washing machine broke down, but Kodinkone Gurut fixed it quickly and professionally. Saved me from buying a new one! Highly recommend!", // Reverted to English
      type: "consumer",
      avatar: "https://placehold.co/40x40/f1f5f9/4f46e5?text=Mark",
      serviceCategory: "appliance_repair",
      timestamp: Date.now() - 3600000 * 24 * 2, // 2 days ago
      likes: 10,
      comments: 2,
    },
  ]);

  const addStory = (
    story: Omit<Story, "id" | "timestamp" | "avatar" | "likes" | "comments"> & {
      type: "consumer" | "provider";
      serviceCategory?: string;
      image?: string;
      badge?: string;
    }
  ) => {
    const defaultAvatar =
      story.type === "consumer"
        ? "https://placehold.co/40x40/e0e7ff/4f46e5?text=User"
        : "https://placehold.co/40x40/dbeafe/3b82f6?text=Provider";
    setStories([
      ...stories,
      {
        id: Date.now(),
        timestamp: Date.now(),
        avatar: defaultAvatar,
        likes: 0,
        comments: 0,
        ...story,
      },
    ]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTab("login");
    setLoggedInUserName(null);
  };

  const handleOpenNotifications = () => {
    setTab("notifications");
  };

  const handleOpenValueDashboardDetail = () => {
    setTab("value-dashboard-detail");
  };

  const handleOpenVendorDetail = (vendor: VendorCompany) => {
    setCurrentVendor(vendor);
    setTab("vendor-detail-view");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Header */}
      {isAuthenticated && tab !== "splash" && !isSupplierTab && (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Brand */}
              <div className="flex items-center">
                <button
                  onClick={() => setTab("home")}
                  className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  ServiceHub
                </button>
              </div>

              {/* Main Navigation */}
              <div className="hidden md:flex space-x-8">
                <button
                  onClick={() => {
                    setTab("home");
                    setMineOption(null);
                    setCurrentService("");
                  }}
                  className={`px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                    tab === "home"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setTab("story");
                    setMineOption(null);
                    setCurrentService("");
                  }}
                  className={`px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                    tab === "story"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  Story Wall
                </button>
                <button
                  onClick={() => {
                    setTab("services");
                    setMineOption(null);
                  }}
                  className={`px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                    tab === "services"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => {
                    setTab("mine");
                    setMineOption(null);
                    setCurrentService("");
                  }}
                  className={`px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                    tab === "mine"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  Profile
                </button>
              </div>

              {/* Right side - Notifications & User Menu */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleOpenNotifications}
                  className="text-gray-500 hover:text-gray-800 transition-colors relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {/* Notification badge */}
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Welcome, {loggedInUserName || "Guest"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-600 hover:text-gray-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <LoginPage
              onLoginSuccess={() => {
                setIsAuthenticated(true);
                setTab("splash");
                setLoggedInUserName("Anna");
              }}
            />
          </div>
        ) : (
          <div className="w-full">
            {tab === "splash" && (
              <SplashScreen onStart={() => setTab("home")} />
            )}
            {tab === "home" && (
              <HomePage
                onQuickService={(serviceId: string, location: string) => {
                  setCurrentService(serviceId);
                  setPreselectedLocation(location);
                  setTab("services");
                }}
                onOpenNotifications={handleOpenNotifications}
                onOpenValueDashboardDetail={handleOpenValueDashboardDetail}
                onOpenVendorDetail={handleOpenVendorDetail} // Pass the new handler
                onOpenSupplierWelcome={() => setTab("supplier-welcome")}
              />
            )}
            {tab === "supplier-welcome" && (
              <SupplierWelcome
                onStartVerification={() => {
                  setIsSupplierMode(true);
                  setTab("supplier-dashboard");
                }}
                onBack={() => setTab("home")}
              />
            )}
            {tab === "supplier-dashboard" && (
              <SupplierVerificationDashboard
                onOpenQualificationReview={() =>
                  setTab("supplier-qualification")
                }
                onOpenBackgroundCheck={() => setTab("supplier-background")}
                onOpenPortfolioSetup={() => setTab("supplier-portfolio")}
                onBack={() => setTab("supplier-welcome")}
              />
            )}
            {tab === "supplier-qualification" && (
              <SupplierQualificationReview
                onBack={() => setTab("supplier-dashboard")}
                onContactSupport={() => setTab("supplier-notifications")}
              />
            )}
            {tab === "supplier-background" && (
              <SupplierBackgroundCheck
                onBack={() => setTab("supplier-dashboard")}
              />
            )}
            {tab === "supplier-portfolio" && (
              <SupplierPortfolioSetup
                onBack={() => setTab("supplier-dashboard")}
              />
            )}
            {tab === "supplier-notifications" && (
              <SupplierNotifications
                onBack={() => setTab("supplier-dashboard")}
              />
            )}
            {tab === "story" && (
              <StoryWallPage
                loggedInUserName={loggedInUserName || "Guest"}
                stories={stories}
                addStory={addStory}
              />
            )}
            {tab === "services" && (
              <ServicesPage
                onOpenProvider={(p) => {
                  setCurrentProvider(p);
                  setTab("provider-detail");
                }}
                preselectedService={currentService}
                preselectedLocation={preselectedLocation}
                onOpenVendorDetail={handleOpenVendorDetail} // Pass the new handler
              />
            )}
            {tab === "provider-detail" && currentProvider && (
              <ProviderDetailPage
                provider={currentProvider}
                onBack={() => setTab("services")}
                onChat={() => setTab("chat")}
                onBook={() => setTab("booking")}
                stories={stories} // Pass the global stories state
                onOpenVendorDetail={handleOpenVendorDetail} // Pass the new handler
              />
            )}
            {tab === "provider-list" && (
              <ProviderListPage
                serviceTitle={currentService}
                onBack={() => setTab("home")}
                onSelectProvider={(provider) => {
                  setCurrentProvider(provider);
                  setTab("provider-detail");
                }}
              />
            )}
            {tab === "chat" && currentProvider && (
              <ChatPage
                providerName={currentProvider.name}
                onBack={() => setTab("provider-detail")}
              />
            )}
            {tab === "booking" && currentProvider && (
              <BookingFlowPage
                provider={currentProvider}
                onBack={() => setTab("provider-detail")}
                onComplete={() => setTab("home")}
                onStartTracking={() => {
                  setCurrentBookingId("booking-" + Date.now());
                  setTab("location-tracking");
                }}
              />
            )}
            {tab === "mine" && (
              <MinePage
                activeOption={mineOption || undefined}
                onSelectOption={(option) => setMineOption(option)}
                onBack={() => setMineOption(null)}
                onLogout={handleLogout}
                loggedInUserName={loggedInUserName || "Guest"}
                userStories={stories} // Pass the global stories state
              />
            )}
            {tab === "notifications" && <NotificationsPage />}
            {tab === "value-dashboard-detail" && (
              <ValueDashboardDetailPage onBack={() => setTab("home")} />
            )}
            {tab === "vendor-detail-view" && currentVendor && (
              <VendorDetailPage
                vendor={currentVendor}
                onBack={() => setTab("services")} // Go back to services after viewing vendor detail
                onOpenProvider={(provider) => {
                  setCurrentProvider(provider);
                  setTab("provider-detail");
                }} // Allow drilling down to provider from vendor page
              />
            )}
            {tab === "location-tracking" && currentProvider && (
              <LocationTrackingPage
                provider={{
                  name: currentProvider.name,
                  avatar: currentProvider.avatar,
                  phone: currentProvider.phone || "+358 40 123 4567",
                  rating: currentProvider.rating,
                  service: currentProvider.service || "Service",
                }}
                bookingId={currentBookingId}
                onBack={() => setTab("home")}
                onComplete={() => setTab("home")}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
