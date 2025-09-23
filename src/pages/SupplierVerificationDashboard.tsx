import React from "react";

type SectionStatus = "pending" | "in_review" | "approved" | "resubmit";

type Props = {
  onOpenQualificationReview: () => void;
  onOpenBackgroundCheck: () => void;
  onOpenPortfolioSetup: () => void;
  onBack?: () => void;
};

export default function SupplierVerificationDashboard({
  onOpenQualificationReview,
  onOpenBackgroundCheck,
  onOpenPortfolioSetup,
  onBack,
}: Props) {
  const completionPercent = 70;

  const badgeClass =
    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";

  const renderStatus = (status: SectionStatus) => {
    const map: Record<SectionStatus, { label: string; color: string }> = {
      pending: { label: "Pending", color: "bg-gray-100 text-gray-700" },
      in_review: { label: "In Review", color: "bg-amber-100 text-amber-800" },
      approved: { label: "Approved", color: "bg-green-100 text-green-800" },
      resubmit: { label: "Resubmit Needed", color: "bg-red-100 text-red-800" },
    };
    const { label, color } = map[status];
    return <span className={`${badgeClass} ${color}`}>{label}</span>;
  };

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
        Verification Dashboard
      </h1>
      <p className="text-gray-600 mb-6">
        Track your progress and upload required documents to earn trust badges.
      </p>

      <div className="bg-white rounded-2xl shadow p-5 mb-6 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-800">Profile Completion</span>
          <span className="text-sm text-gray-600">{completionPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">ID Verification</p>
              <p className="text-sm text-gray-600">
                Upload government ID and selfie check
              </p>
            </div>
            {renderStatus("approved")}
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">
                Business License / Qualification
              </p>
              <p className="text-sm text-gray-600">
                Upload certificates and licenses
              </p>
            </div>
            <button
              onClick={onOpenQualificationReview}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Manage
            </button>
          </div>
          <div className="mt-2">{renderStatus("in_review")}</div>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Background Check</p>
              <p className="text-sm text-gray-600">
                Criminal, financial and references
              </p>
            </div>
            <button
              onClick={onOpenBackgroundCheck}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Details
            </button>
          </div>
          <div className="mt-2">{renderStatus("pending")}</div>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Insurance Documents</p>
              <p className="text-sm text-gray-600">
                If relevant to your services
              </p>
            </div>
            <span>{renderStatus("resubmit")}</span>
          </div>
          <p className="text-xs text-red-700 mt-2">
            Please re-upload with a clearer scan. Policy number is missing.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-4 mt-6">
        <p className="text-sm text-indigo-900 font-medium mb-2">
          Badges Earned
        </p>
        <div className="flex flex-wrap gap-2">
          <span className={`${badgeClass} bg-green-100 text-green-800`}>
            ID Verified
          </span>
          <span className={`${badgeClass} bg-gray-100 text-gray-700`}>
            Background Clear (pending)
          </span>
          <span className={`${badgeClass} bg-gray-100 text-gray-700`}>
            Qualified Professional (in review)
          </span>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl border border-amber-100 p-4 mt-4">
        <p className="text-sm text-amber-900 font-medium">
          Pending Notifications
        </p>
        <ul className="list-disc list-inside text-sm text-amber-800 mt-2">
          <li>Insurance document requires resubmission</li>
          <li>Background check consent pending</li>
        </ul>
      </div>

      <button
        onClick={onOpenPortfolioSetup}
        className="w-full mt-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700"
      >
        Continue
      </button>
    </div>
  );
}
