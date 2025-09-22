type Tab = 'home' | 'story' | 'services' | 'mine';

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function BottomNav({ active, onChange }: Props) {
  const itemClass = (t: Tab) => `flex flex-col items-center ${active === t ? 'text-indigo-600 active-nav' : 'text-gray-400 hover:text-indigo-600'} transition-colors`;
  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 shadow-lg flex justify-around items-center h-16">
      <button onClick={() => onChange('home')} className={itemClass('home')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-xs mt-1">Home</span>
      </button>
      <button onClick={() => onChange('story')} className={itemClass('story')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v2m0 4v2m0 4v2m0 4v2m4-18h-2m-4 18h-2" />
        </svg>
        <span className="text-xs mt-1">Story Wall</span>
      </button>
      <button onClick={() => onChange('services')} className={itemClass('services')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10" />
        </svg>
        <span className="text-xs mt-1">Services</span>
      </button>
      <button onClick={() => onChange('mine')} className={itemClass('mine')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-xs mt-1">Mine</span>
      </button>
    </div>
  );
}


