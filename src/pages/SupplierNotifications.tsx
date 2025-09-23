import React from "react";

type Props = { onBack?: () => void };

export default function SupplierNotifications({ onBack }: Props) {
  const items = [
    {
      id: 1,
      title: "Insurance document rejected",
      body: "Please re-upload with full policy number visible.",
      time: "2h ago",
    },
    {
      id: 2,
      title: "Background check consent pending",
      body: "Complete consent to begin processing.",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Congrats! ID Verified",
      body: "You earned the ID Verified badge.",
      time: "2d ago",
    },
  ];
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300"
        aria-label="Back"
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
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
      <div className="space-y-3">
        {items.map((n) => (
          <div key={n.id} className="bg-white rounded-xl border p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="font-semibold text-gray-900">{n.title}</p>
              <span className="text-xs text-gray-500">{n.time}</span>
            </div>
            <p className="text-sm text-gray-700">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
