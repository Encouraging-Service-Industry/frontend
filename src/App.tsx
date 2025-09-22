import { useState } from 'react';
import './App.css';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import StoryWallPage from './pages/StoryWallPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProviderListPage from './pages/ProviderListPage';
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

type Tab = 'splash' | 'home' | 'story' | 'services' | 'service-detail' | 'provider-list' | 'vendor' | 'vendor-detail' | 'provider-detail' | 'chat' | 'booking' | 'mine' | 'login' | 'notifications' | 'value-dashboard-detail'; // Add 'value-dashboard-detail' to Tab type
type MineOption = 'orders' | 'profile' | 'settings' | 'about';

export default function App() {
  const [tab, setTab] = useState<Tab>('login'); // Start at login page initially
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication
  const [loggedInUserName, setLoggedInUserName] = useState<string | null>(null); // New state for logged-in user's name
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const [currentVendor, setCurrentVendor] = useState<VendorCompany | null>(null);
  const [currentService, setCurrentService] = useState<string>('');
  const [mineOption, setMineOption] = useState<MineOption | null>(null);

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
                  onQuickService={(service) => { setCurrentService(service); setTab('services'); }} 
                  onOpenNotifications={handleOpenNotifications}
                  onOpenValueDashboardDetail={handleOpenValueDashboardDetail}
                />
              )}
              {tab === 'story' && (
                <StoryWallPage loggedInUserName={loggedInUserName || "Guest"} />
              )}
              {tab === 'services' && (
                <ServicesPage 
                  onOpenProvider={(p) => { setCurrentProvider(p); setTab('service-detail'); }} 
                  preselectedService={currentService}
                />
              )}
              {tab === 'service-detail' && currentProvider && (
                <ServiceDetailPage 
                  provider={currentProvider}
                  onBack={() => setTab('services')}
                  onChat={() => setTab('chat')}
                  onBook={() => setTab('booking')}
                />
              )}
              {tab === 'provider-list' && (
                <ProviderListPage 
                  serviceTitle={currentService}
                  onBack={() => setTab('home')}
                  onSelectProvider={(provider) => { setCurrentProvider(provider); setTab('service-detail'); }}
                />
              )}
              {tab === 'vendor' && (
                <VendorsPage onOpenCompany={(vendor) => { setCurrentVendor(vendor); setTab('vendor-detail'); }} />
              )}
              {tab === 'vendor-detail' && currentVendor && (
                <VendorDetailPage 
                  vendor={currentVendor} 
                  onBack={() => setTab('vendor')}
                  onOpenProvider={(provider) => { setCurrentProvider(provider); setTab('service-detail'); }}
                />
              )}
              {tab === 'chat' && currentProvider && (
                <ChatPage 
                  providerName={currentProvider.name}
                  onBack={() => setTab('service-detail')}
                />
              )}
              {tab === 'booking' && currentProvider && (
                <BookingFlowPage 
                  provider={currentProvider}
                  onBack={() => setTab('service-detail')}
                  onComplete={() => setTab('home')}
                />
              )}
              {tab === 'mine' && (
                <MinePage 
                  activeOption={mineOption || undefined}
                  onSelectOption={(option) => setMineOption(option)}
                  onBack={() => setMineOption(null)}
                  onLogout={handleLogout} // Pass the handleLogout function
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
