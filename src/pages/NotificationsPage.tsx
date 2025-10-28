import type { Notification as NotificationType } from '../data';

type Props = {
  notifications: NotificationType[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
};

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function NotificationsPage({ notifications, onMarkAsRead, onDelete }: Props) {
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
                <p className="text-sm text-gray-500">{timeAgo(notification.createdAt)}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!notification.read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => onDelete(notification.id)}
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
