import React from "react";

type Props = {
  onBack?: () => void;
};

export default function SupplierBackgroundCheck({ onBack }: Props) {
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
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Background Check
      </h1>
      <p className="text-gray-600 mb-6">
        More trust = more bookings. Here’s what we check and how we keep your
        data safe.
      </p>

      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-900 mb-2">Why it matters</h2>
        <p className="text-sm text-gray-700">
          Customers choose verified professionals more often. Completing your
          background check increases booking chances significantly.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-900 mb-3">Checklist</h2>
        <ul className="space-y-2 text-sm text-gray-800">
          <li>• Criminal history (where legally permitted)</li>
          <li>• Work history and references</li>
          <li>• Financial checks (where applicable)</li>
        </ul>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 mb-5">
        <h2 className="font-semibold text-indigo-900 mb-2">
          Security & Privacy
        </h2>
        <p className="text-sm text-indigo-900">
          We use encryption, follow privacy laws, and only request what’s
          necessary.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-900">Status</p>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
}
