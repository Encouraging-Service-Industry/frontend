import React from 'react';

interface Notification {
  id: string;
  type: 'order' | 'chat' | 'reminder' | 'general';
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    message: 'Your home cleaning service is confirmed for tomorrow.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'chat',
    message: 'New message from Jane (Home Cleaning Provider).',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '3',
    type: 'reminder',
    message: 'Don\'t forget to book your weekly grocery delivery!',
    time: 'Yesterday',
    read: false,
  },
  {
    id: '4',
    type: 'general',
    message: 'New service category: Pet Care now available!',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="p-4 pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No new notifications.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white p-4 rounded-xl shadow-sm border ${notification.read ? 'border-gray-200' : 'border-indigo-400 bg-indigo-50'} flex items-center justify-between`}
            >
              <div>
                <p className="font-semibold text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
