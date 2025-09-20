import { useState } from 'react';
import './App.css';
import VendorsPage from './pages/VendorsPage';
import ServicesPage from './pages/ServicesPage';
import HomePage from './pages/HomePage';
import StoryWallPage from './pages/StoryWallPage';
import MinePage from './pages/MinePage';
import BottomNav from './components/BottomNav';
import type { Provider } from './data';

type Tab = 'home' | 'story' | 'services' | 'vendor' | 'mine' | 'provider-detail';
type MineOption = 'orders' | 'profile' | 'settings' | 'about';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const [mineOption, setMineOption] = useState<MineOption | null>(null);

  return (
    <div className="bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden relative">
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
        {tab === 'mine' && (
          <MinePage 
            activeOption={mineOption || undefined}
            onSelectOption={(option) => setMineOption(option)}
            onBack={() => setMineOption(null)}
          />
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
        <BottomNav active={tab as any} onChange={(t) => { setTab(t as Tab); setMineOption(null); }} />
      </div>
    </div>
  );
}
