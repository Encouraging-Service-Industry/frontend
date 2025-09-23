import React from "react";

type Props = {
  onBack?: () => void;
};

export default function SupplierPortfolioSetup({ onBack }: Props) {
  const trustScore = 68;
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
        Set up your portfolio
      </h1>
      <p className="text-gray-600 mb-6">
        Showcase your verified badges, best work and qualifications.
      </p>

      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 mb-5">
        <p className="text-sm text-indigo-900 font-medium mb-3">
          Verified Badges
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ID Verified
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            Background Clear (pending)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            Qualified Professional (in review)
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-900 mb-3">Service media</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            +
          </div>
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            +
          </div>
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            +
          </div>
        </div>
        <button className="w-full py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
          Upload photos/videos
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-900 mb-3">Certifications</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
            Licensed Electrician
          </span>
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
            First Aid
          </span>
        </div>
        <button className="w-full py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
          Add certification
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-900 mb-2">Trust score</h2>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-emerald-600 h-2 rounded-full"
            style={{ width: `${trustScore}%` }}
          />
        </div>
        <p className="text-sm text-gray-700">
          Your trust score reflects verification, reviews and experience.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-3">Reviews</h2>
        <p className="text-sm text-gray-600 mb-3">
          Collect your first reviews by inviting past clients.
        </p>
        <button className="w-full py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
          Invite past clients
        </button>
      </div>
    </div>
  );
}
