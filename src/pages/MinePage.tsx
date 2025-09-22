type MineOption = 'orders' | 'profile' | 'settings' | 'about';

type Props = {
  activeOption?: MineOption;
  onSelectOption?: (option: MineOption) => void;
  onBack?: () => void;
  onLogout: () => void; // Add onLogout prop
};

export default function MinePage({ activeOption, onSelectOption, onBack, onLogout }: Props) {
  if (activeOption) {
    return (
      <div className="p-4 pt-6">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        {activeOption === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">Home Cleaning</h3>
                  <span className="text-sm text-green-600 font-medium">Completed</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Provider: Jane</p>
                <p className="text-sm text-gray-500">Date: October 28, 2024</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">Meal Delivery</h3>
                  <span className="text-sm text-blue-600 font-medium">In Progress</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Provider: Leo</p>
                <p className="text-sm text-gray-500">Date: November 5, 2024</p>
              </div>
            </div>
          </div>
        )}
        {activeOption === 'profile' && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <img src="https://placehold.co/120x120/e0e7ff/4f46e5?text=Anna" className="rounded-full mr-4 border-4 border-indigo-200 shadow-lg" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Anna</h2>
              <p className="text-gray-500 mb-6">Busy Marketing Manager</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">My Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-medium">Email:</span> anna@example.com</li>
                <li><span className="font-medium">Location:</span> Beijing, China</li>
                <li><span className="font-medium">Status:</span> Verified User</li>
              </ul>
            </div>
          </div>
        )}
        {activeOption === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Notifications</h3>
                <p className="text-sm text-gray-500">Manage your notification preferences</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Privacy</h3>
                <p className="text-sm text-gray-500">Control your privacy settings</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Payment Methods</h3>
                <p className="text-sm text-gray-500">Manage your payment information</p>
              </div>
              <button 
                onClick={onLogout} // Call onLogout when clicked
                className="w-full py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
        {activeOption === 'about' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Us</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Our Mission</h3>
                <p className="text-sm text-gray-600">Helping busy people reclaim their time through trusted service providers.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600">support@serviceapp.com</p>
                <p className="text-sm text-gray-600">+86 123-456-7890</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Version</h3>
                <p className="text-sm text-gray-600">1.0.0</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 pt-6">
      <div className="flex items-center justify-center mb-8">
        <img src="https://placehold.co/120x120/e0e7ff/4f46e5?text=Anna" className="rounded-full border-4 border-indigo-200 shadow-lg" />
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Anna</h2>
        <p className="text-gray-500">Busy Marketing Manager</p>
      </div>
      
      <div className="space-y-3">
        <button onClick={() => onSelectOption?.('orders')} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 12h.01" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">My Orders</h3>
            <p className="text-sm text-gray-500">View your service history</p>
          </div>
        </button>
        
        <button onClick={() => onSelectOption?.('profile')} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">My Profile</h3>
            <p className="text-sm text-gray-500">Manage your personal information</p>
          </div>
        </button>
        
        <button onClick={() => onSelectOption?.('settings')} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Settings</h3>
            <p className="text-sm text-gray-500">App preferences and account</p>
          </div>
        </button>
        
        <button onClick={() => onSelectOption?.('about')} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">About Us</h3>
            <p className="text-sm text-gray-500">Learn more about our platform</p>
          </div>
        </button>
      </div>
    </div>
  );
}

