import { useState } from "react";
import type { Order } from "../data";

export type MineOption =
  | "orders"
  | "notifications"
  | "profile"
  | "settings"
  | "about"
  | "my-stories"
  | "my-achievements"
  | "value-dashboard"; // Added 'value-dashboard'

type Props = {
  activeOption?: MineOption;
  onSelectOption?: (option: MineOption) => void;
  onBack?: () => void;
  onLogout: () => void; // Add onLogout prop
  loggedInUserName: string; // New: logged-in user's name
  userStories: any[]; // New: array of stories posted by the user
  orders?: Order[]; // Temporary frontend orders
  onOpenOrder?: (order: Order) => void;
};
import MyStoriesPage from "./MyStoriesPage";
import MyAchievementsPage from "./MyAchievementsPage"; // Import MyAchievementsPage

function OrderListView({ orders, onOpenOrder }: { orders?: Order[], onOpenOrder?: (order: Order) => void }) {
  const [orderTab, setOrderTab] = useState<'services' | 'redemptions'>('services');

  const filteredOrders = orders?.filter(o => {
    if (orderTab === 'services') {
      return o.id.startsWith('order-');
    }
    if (orderTab === 'redemptions') {
      return o.id.startsWith('market-');
    }
    return false;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h2>
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setOrderTab('services')}
          className={`px-4 py-2 text-sm font-medium ${orderTab === 'services' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
          Service Orders
        </button>
        <button
          onClick={() => setOrderTab('redemptions')}
          className={`px-4 py-2 text-sm font-medium ${orderTab === 'redemptions' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
          Marketplace Redemptions
        </button>
      </div>
      <div className="space-y-4">
        {filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map((o: Order) => {
            const isRedemption = o.id.startsWith('market-');
            return (
              <button key={o.id} onClick={() => onOpenOrder?.(o)} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                {isRedemption ? (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">{o.service}</h3>
                      <span className="text-sm font-medium text-indigo-600">{o.price} TimeCoins</span>
                    </div>
                    <p className="text-sm text-gray-500">Redeemed on: {new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">{o.service}</h3>
                      <span className={`text-sm font-medium ${o.status === 'completed' ? 'text-green-600' : o.status === 'confirmed' ? 'text-blue-600' : 'text-gray-600'}`}>
                        {o.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Provider: {o.providerName}</p>
                    <p className="text-sm text-gray-500">Date: {o.date} · {o.timeSlot}</p>
                  </div>
                )}
              </button>
            )
          })
        ) : (
          <p className="text-gray-500 text-center">
            {orderTab === 'services' ? 'No service orders yet. Book a service to see it here.' : 'No marketplace redemptions yet.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MinePage({
  activeOption,
  onSelectOption,
  onBack,
  onLogout,
  loggedInUserName,
  userStories,
  orders,
  onOpenOrder,
}: Props) {
  if (activeOption) {
    return (
      <div className="p-4 pt-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300"
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
        {activeOption === "orders" && (
          <OrderListView orders={orders} onOpenOrder={onOpenOrder} />
        )}
        {activeOption === "profile" && (
          <div>
            <div className="flex items-center justify-center mb-6">
              <img
                src="/assets/Anna.jpg"
                alt="Anna"
                className="rounded-full mr-4 border-4 border-indigo-200 shadow-lg w-32 h-32 object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Anna</h2>
              <p className="text-gray-500 mb-6">Busy Marketing Manager</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">
                My Information
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">Email:</span> anna@example.com
                </li>
                <li>
                  <span className="font-medium">Location:</span> Helsinki,
                  Finland
                </li>
                <li>
                  <span className="font-medium">Status:</span> Verified User
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeOption === "settings" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            <div className="space-y-4">
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
        {activeOption === "about" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Us</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Our Mission
                </h3>
                <p className="text-sm text-gray-600">
                  Helping busy people reclaim their time through trusted service
                  providers.
                </p>
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
        {activeOption === "my-stories" && (
          <MyStoriesPage
            onBack={onBack!}
            loggedInUserName={loggedInUserName}
            userStories={userStories}
          />
        )}
        {activeOption === "my-achievements" && (
          <MyAchievementsPage onBack={onBack!} />
        )}
      </div>
    );
  }

  return (
    <div className="p-4 pt-6">
      <div className="flex items-center justify-center mb-8">
        <img
          src="/assets/Anna.jpg"
          alt="Anna"
          className="rounded-full border-4 border-indigo-200 shadow-lg w-32 h-32 object-cover"
        />
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Anna</h2>
        <p className="text-gray-500">Busy Marketing Manager</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onSelectOption?.("orders")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 12h.01"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">My Orders</h3>
            <p className="text-sm text-gray-500">View your service history</p>
          </div>
        </button>

        <button
          onClick={() => onSelectOption?.("profile")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">My Info</h3>
            <p className="text-sm text-gray-500">View and manage your personal information</p>
          </div>
        </button>

        <button
          onClick={() => onSelectOption?.("value-dashboard")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Value Dashboard</h3>
            <p className="text-sm text-gray-500">
              Track your time and cost savings
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelectOption?.("my-stories")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">My Stories</h3>
            <p className="text-sm text-gray-500">View your posted stories</p>
          </div>
        </button>

        <button
          onClick={() => onSelectOption?.("my-achievements")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">My Achievements</h3>
            <p className="text-sm text-gray-500">
              Track your progress and rewards
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelectOption?.("notifications")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            <p className="text-sm text-gray-500">View your notifications</p>
          </div>
        </button>

        <button
          onClick={() => onSelectOption?.("settings")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Settings</h3>
            <p className="text-sm text-gray-500">App preferences and account</p>
          </div>
        </button>

        <button
          onClick={() => onSelectOption?.("about")}
          className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">About Us</h3>
            <p className="text-sm text-gray-500">
              Learn more about our platform
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
