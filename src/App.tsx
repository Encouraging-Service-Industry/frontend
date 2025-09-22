import { useState } from 'react';
import './App.css';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import StoryWallPage, { type Story } from './pages/StoryWallPage'; // Import Story type and StoryWallPage
import ServicesPage from './pages/ServicesPage';
import ProviderListPage from './pages/ProviderListPage';
import ProviderDetailPage from './pages/ProviderDetailPage'; // Updated import for ProviderDetailPage
import VendorsPage from './pages/VendorsPage';
import VendorDetailPage from './pages/VendorDetailPage';
import ChatPage from './pages/ChatPage';
import BookingFlowPage from './pages/BookingFlowPage';
import MinePage from './pages/MinePage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import NotificationsPage from './pages/NotificationsPage'; // Import NotificationsPage
import BottomNav from './components/BottomNav';
import type { Provider, VendorCompany } from './data';
import ValueDashboardDetailPage from './pages/ValueDashboardDetailPage'; // Import ValueDashboardDetailPage
import { type MineOption } from './pages/MinePage'; // Import MineOption type

type Tab = 'splash' | 'home' | 'story' | 'services' | 'provider-list' | 'vendor' | 'vendor-detail' | 'provider-detail' | 'chat' | 'booking' | 'mine' | 'login' | 'notifications' | 'value-dashboard-detail'; // Add 'value-dashboard-detail' to Tab type

export default function App() {
  const [tab, setTab] = useState<Tab>('login'); // Start at login page initially
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication
  const [loggedInUserName, setLoggedInUserName] = useState<string | null>(null); // New state for logged-in user's name
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const [currentVendor, setCurrentVendor] = useState<VendorCompany | null>(null);
  const [currentService, setCurrentService] = useState<string>('');
  const [preselectedLocation, setPreselectedLocation] = useState<string>(''); // New state for preselected location
  const [mineOption, setMineOption] = useState<MineOption | null>(null);

  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      name: "Aino",
      title: "First time outsourcing, relaxing weekend!",
      content:
        "After using the weekly cleaning service, I finally have time to take the kids to the park on weekends! The house is clean and I feel great!", // Reverted to English
      type: 'consumer',
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
      type: 'provider',
      avatar: "https://placehold.co/40x40/dbeafe/3b82f6?text=Emily",
      serviceCategory: "home_cleaning",
      timestamp: Date.now() - 3600000 * 24 * 1, // 1 day ago
      image: "https://placehold.co/400x200/fee2e2/ef4444?text=Sparkle+Clean+Result",
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
      type: 'provider',
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
       type: 'consumer',
       avatar: "https://placehold.co/40x40/f1f5f9/4f46e5?text=Mark",
       serviceCategory: "appliance_repair",
       timestamp: Date.now() - 3600000 * 24 * 2, // 2 days ago
       likes: 10,
       comments: 2,
     },
   ]);

  const addStory = (story: Omit<Story, "id" | "timestamp" | "avatar" | "likes" | "comments"> & { type: 'consumer' | 'provider'; serviceCategory?: string; image?: string; badge?: string; }) => {
    const defaultAvatar = story.type === 'consumer' ? "https://placehold.co/40x40/e0e7ff/4f46e5?text=User" : "https://placehold.co/40x40/dbeafe/3b82f6?text=Provider";
    setStories([...stories, { id: Date.now(), timestamp: Date.now(), avatar: defaultAvatar, likes: 0, comments: 0, ...story }]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTab('login');
    setLoggedInUserName(null);
  };

  const handleOpenNotifications = () => {
    setTab('notifications');
  };

  const handleOpenValueDashboardDetail = () => {
    setTab('value-dashboard-detail');
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden relative">
        <div className="flex-1 pb-16">
          {!isAuthenticated ? (
            <LoginPage onLoginSuccess={() => { setIsAuthenticated(true); setTab('splash'); setLoggedInUserName("Anna"); }} />
          ) : (
            <>
              {tab === 'splash' && (
                <SplashScreen onStart={() => setTab('home')} />
              )}
              {tab === 'home' && (
                <HomePage 
                  onQuickService={(serviceId: string, location: string) => { setCurrentService(serviceId); setPreselectedLocation(location); setTab('services'); }} 
                  onOpenNotifications={handleOpenNotifications}
                  onOpenValueDashboardDetail={handleOpenValueDashboardDetail}
                />
              )}
              {tab === 'story' && (
                <StoryWallPage loggedInUserName={loggedInUserName || "Guest"} stories={stories} addStory={addStory} />
              )}
              {tab === 'services' && (
                <ServicesPage 
                  onOpenProvider={(p) => { setCurrentProvider(p); setTab('provider-detail'); }} 
                  preselectedService={currentService}
                  preselectedLocation={preselectedLocation}
                />
              )}
              {tab === 'provider-detail' && currentProvider && (
                <ProviderDetailPage 
                  provider={currentProvider}
                  onBack={() => setTab('services')}
                  onChat={() => setTab('chat')}
                  onBook={() => setTab('booking')}
                  stories={stories} // Pass the global stories state
                />
              )}
              {tab === 'provider-list' && (
                <ProviderListPage 
                  serviceTitle={currentService}
                  onBack={() => setTab('home')}
                  onSelectProvider={(provider) => { setCurrentProvider(provider); setTab('provider-detail'); }}
                />
              )}
              {tab === 'vendor' && (
                <VendorsPage onOpenCompany={(vendor) => { setCurrentVendor(vendor); setTab('vendor-detail'); }} />
              )}
              {tab === 'vendor-detail' && currentVendor && (
                <VendorDetailPage 
                  vendor={currentVendor} 
                  onBack={() => setTab('vendor')}
                  onOpenProvider={(provider) => { setCurrentProvider(provider); setTab('provider-detail'); }}
                />
              )}
              {tab === 'chat' && currentProvider && (
                <ChatPage 
                  providerName={currentProvider.name}
                  onBack={() => setTab('provider-detail')}
                />
              )}
              {tab === 'booking' && currentProvider && (
                <BookingFlowPage 
                  provider={currentProvider}
                  onBack={() => setTab('provider-detail')}
                  onComplete={() => setTab('home')}
                />
              )}
              {tab === 'mine' && (
                <MinePage
                  activeOption={mineOption || undefined}
                  onSelectOption={(option) => setMineOption(option)}
                  onBack={() => setMineOption(null)}
                  onLogout={handleLogout}
                  loggedInUserName={loggedInUserName || "Guest"}
                  userStories={stories} // Pass the global stories state
                />
              )}
              {tab === 'notifications' && (
                <NotificationsPage />
              )}
              {tab === 'value-dashboard-detail' && (
                <ValueDashboardDetailPage onBack={() => setTab('home')} />
              )}
            </>
          )}
        </div>
        {isAuthenticated && tab !== 'splash' && <BottomNav active={tab as any} onChange={(t) => { setTab(t as Tab); setMineOption(null); if (t !== 'services') setCurrentService(''); }} />}
      </div>
    </div>
  );
}
