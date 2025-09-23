import React from "react";

type ReviewStatus =
  | "received"
  | "in_review"
  | "approved"
  | "resubmit"
  | "pending";

type Props = {
  onBack?: () => void;
  onContactSupport?: () => void;
};

export default function SupplierQualificationReview({
  onBack,
  onContactSupport,
}: Props) {
  const items = [
    {
      id: "license",
      name: "Business License",
      status: "in_review" as ReviewStatus,
      eta: "2–3 business days",
    },
    {
      id: "cert",
      name: "Professional Certification",
      status: "received" as ReviewStatus,
      eta: "1–2 business days",
    },
    {
      id: "insurance",
      name: "Insurance Policy",
      status: "resubmit" as ReviewStatus,
      eta: "—",
    },
  ];

  const chip = (status: ReviewStatus) => {
    const map: Record<ReviewStatus, string> = {
      received: "bg-blue-100 text-blue-800",
      in_review: "bg-amber-100 text-amber-800",
      approved: "bg-green-100 text-green-800",
      resubmit: "bg-red-100 text-red-800",
      pending: "bg-gray-100 text-gray-700",
    };
    const label: Record<ReviewStatus, string> = {
      received: "Received",
      in_review: "In Review",
      approved: "Approved",
      resubmit: "Resubmit Needed",
      pending: "Pending",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${map[status]}`}
      >
        {label[status]}
      </span>
    );
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
        Qualification Review
      </h1>
      <p className="text-gray-600 mb-6">
        We’ve received your documents. You’ll see status updates here.
      </p>

      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="bg-white rounded-xl border p-4 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-gray-900">{it.name}</p>
              <p className="text-xs text-gray-600">Estimated: {it.eta}</p>
            </div>
            {chip(it.status)}
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-4 mt-6">
        <p className="text-sm text-indigo-900 font-medium mb-2">
          What happens next?
        </p>
        <ol className="list-decimal list-inside text-sm text-indigo-900 space-y-1">
          <li>We confirm receipt automatically after upload.</li>
          <li>Our team reviews within the estimated timeframe.</li>
          <li>We’ll notify you: Approved, Resubmit Needed, or Pending.</li>
        </ol>
      </div>

      <button
        onClick={onContactSupport}
        className="w-full mt-6 py-3 bg-white border border-indigo-200 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50"
      >
        Ask Verification Support
      </button>
    </div>
  );
}
