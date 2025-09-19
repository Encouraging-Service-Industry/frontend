type Tab = 'home' | 'story' | 'services' | 'vendor' | 'orders' | 'profile';

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function BottomNav({ active, onChange }: Props) {
  const itemClass = (t: Tab) => `flex flex-col items-center ${active === t ? 'text-indigo-600' : 'text-gray-400'}`;
  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 shadow-lg flex justify-around items-center h-16">
      <button onClick={() => onChange('home')} className={itemClass('home')}>
        <span className="text-xs mt-1">Home</span>
      </button>
      <button onClick={() => onChange('story')} className={itemClass('story')}>
        <span className="text-xs mt-1">Story Wall</span>
      </button>
      <button onClick={() => onChange('services')} className={itemClass('services')}>
        <span className="text-xs mt-1">Services</span>
      </button>
      <button onClick={() => onChange('vendor')} className={itemClass('vendor')}>
        <span className="text-xs mt-1">Vendor</span>
      </button>
      <button onClick={() => onChange('orders')} className={itemClass('orders')}>
        <span className="text-xs mt-1">My Orders</span>
      </button>
      <button onClick={() => onChange('profile')} className={itemClass('profile')}>
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
}


