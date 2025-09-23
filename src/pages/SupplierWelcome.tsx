import React, { useState } from "react";

type Props = {
  onStartVerification: () => void;
  onBack?: () => void;
};

export default function SupplierWelcome({
  onStartVerification,
  onBack,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    { email: false, password: false }
  );

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.trim().length > 0;
  const formValid = emailValid && passwordValid;

  const handleSubmit = () => {
    setTouched({ email: true, password: true });
    if (!formValid) return;
    onStartVerification();
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
        Grow your business with trust
      </h1>
      <p className="text-gray-600 mb-6">
        Join our trusted network. Verification builds credibility and brings
        more bookings.
      </p>

      <div className="bg-white rounded-2xl shadow-md p-5 mb-6 border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-3">Quick Sign-Up</h2>
        <div className="space-y-3">
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((v) => ({ ...v, email: true }))}
              aria-invalid={touched.email && !emailValid}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.email && !emailValid
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            {touched.email && !emailValid && (
              <p className="mt-1 text-xs text-red-600">
                Please enter a valid email address.
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((v) => ({ ...v, password: true }))}
              aria-invalid={touched.password && !passwordValid}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.password && !passwordValid
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            {touched.password && !passwordValid && (
              <p className="mt-1 text-xs text-red-600">Password is required.</p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!formValid}
            className={`w-full py-3 font-semibold rounded-xl shadow ${
              formValid
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Create account
          </button>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
        <h3 className="font-semibold text-indigo-900 mb-3">
          Your Verification Path
        </h3>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
              1
            </span>
            <div>
              <p className="font-medium text-gray-900">Basic Info</p>
              <p className="text-sm text-gray-600">
                Tell us about you and your business.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-800 text-xs flex items-center justify-center">
              2
            </span>
            <div>
              <p className="font-medium text-gray-900">Verification</p>
              <p className="text-sm text-gray-600">
                Upload IDs, licenses, and complete checks.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-800 text-xs flex items-center justify-center">
              3
            </span>
            <div>
              <p className="font-medium text-gray-900">Approval</p>
              <p className="text-sm text-gray-600">
                Get approved and start showcasing services.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        We protect your privacy and use bank-level encryption.
      </p>
    </div>
  );
}
