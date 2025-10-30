import { useState } from "react";
import type { Provider } from "../data";

interface AISearchPageProps {
  allProviders: Record<string, Provider>;
  onProviderSelected: (provider: Provider) => void;
}

const MOCK_MATCH_KEYWORDS = [
  {
    keywords: ["friendly", "cheerful", "kind", "detail", "deep clean"],
    providerId: "jane",
    reason: "Matches personality (friendly, detail-oriented)"
  },
  {
    keywords: ["eco", "organic", "pet", "child", "green"],
    providerId: "sarah",
    reason: "Eco-friendly, great for kids and pets"
  },
  {
    keywords: ["flexible", "quick", "efficient", "short notice", "apartment", "weekday"],
    providerId: "mike",
    reason: "Flexible and quick, ideal for busy schedules"
  },
  {
    keywords: ["appliance", "repair", "tech", "fix"],
    providerId: "other_service",
    reason: "Certified and trustworthy technician"
  }
];

export default function AISearchPage({ allProviders, onProviderSelected }: AISearchPageProps) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ provider: Provider; reason: string } | null>(null);
  const [error, setError] = useState("");

  function handleSearch() {
    if (!query.trim()) {
      setResult(null);
      setError("Please describe your ideal provider!");
      return;
    }
    // Lowercase for matching
    const text = query.trim().toLowerCase();
    let found = MOCK_MATCH_KEYWORDS.find(({ keywords }) => keywords.some(k => text.includes(k)));

    // fallback: return friendly cleaner for demo
    if (!found) {
      found = MOCK_MATCH_KEYWORDS[0];
    }
    const provider = allProviders[found.providerId];
    if (provider) {
      setResult({ provider, reason: found.reason });
      setError("");
    } else {
      setResult(null);
      setError("No mock providers found (demo data missing)");
    }
  }

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-sky-800 mb-6 text-center">AI Provider Search (Demo)</h1>
      <div className="bg-white p-6 rounded-xl shadow-xl mb-8">
        <label htmlFor="ai-provider-text" className="block font-semibold mb-2 text-gray-800">
          What qualities and schedule do you want in a provider?
        </label>
        <textarea
          id="ai-provider-text"
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="eg: friendly, speaks English, available Saturdays, pet-friendly, eco certified..."
          rows={3}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded shadow-md float-right"
        >
          AI Search
        </button>
        <div className="clear-both"></div>
        {error && <div className="text-red-600 mt-4">{error}</div>}
      </div>
      {result && (
        <div className="bg-gradient-to-br from-sky-50 via-teal-50 to-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
          <img
            src={result.provider.avatar}
            alt={result.provider.name}
            className="rounded-full shadow-md w-24 h-24 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{result.provider.name}</h2>
            <div className="mb-2 text-sm text-gray-600">{result.provider.service}</div>
            <div className="mb-3 text-emerald-700 font-semibold">Match reason: {result.reason}</div>
            <p className="mb-3 text-gray-700">{result.provider.description}</p>
            <button
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-full shadow-lg"
              onClick={() => onProviderSelected(result.provider)}
            >
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
