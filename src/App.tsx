import { useState } from 'react';
import './App.css';
import VendorsPage from './pages/VendorsPage';
import ServicesPage from './pages/ServicesPage';
import HomePage from './pages/HomePage';
import StoryWallPage from './pages/StoryWallPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';
import { Provider } from './data';

type Tab = 'home' | 'story' | 'services' | 'vendor' | 'orders' | 'profile' | 'provider-detail';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 pb-16">
        {tab === 'home' && (
          <HomePage onQuickService={() => setTab('services')} />
        )}
        {tab === 'story' && (
          <StoryWallPage />
        )}
        {tab === 'services' && (
          <ServicesPage onOpenProvider={(p) => { setCurrentProvider(p); setTab('provider-detail'); }} />
        )}
        {tab === 'vendor' && (
          <VendorsPage onOpenCompany={() => { /* could navigate to company detail route */ }} />
        )}
        {tab === 'orders' && (
          <OrdersPage />
        )}
        {tab === 'profile' && (
          <ProfilePage />
        )}
        {tab === 'provider-detail' && currentProvider && (
          <div className="p-4">
            <button onClick={() => setTab('services')} className="mb-4 text-blue-600">Back</button>
            <div className="bg-white rounded-2xl shadow p-4">
              <div className="flex items-center mb-2">
                <img src={currentProvider.avatar} className="rounded-full mr-3" width={60} height={60} />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{currentProvider.name} ({currentProvider.service})</h2>
                  <div className="text-sm text-gray-500">Rating {currentProvider.rating} • {currentProvider.reviews} reviews</div>
                </div>
              </div>
              <p className="text-gray-600">{currentProvider.description}</p>
            </div>
          </div>
        )}
      </div>
      <BottomNav active={tab as any} onChange={(t) => setTab(t as Tab)} />
    </div>
  );
}
