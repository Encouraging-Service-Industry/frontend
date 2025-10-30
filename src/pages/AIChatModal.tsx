import { useEffect, useRef, useState } from "react";
import type { Provider } from "../data";

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProviderSelected: (provider: Provider) => void;
  allProviders: Record<string, Provider>;
  sessionKey?: number;
  chatHistory?: { sender: "ai" | "user"; text: string }[];
  setChatHistory?: (msgs: { sender: "ai" | "user"; text: string }[]) => void;
  result?: { provider: Provider; reason: string } | null;
  setResult?: (v: { provider: Provider; reason: string } | null) => void;
  awaitingAI?: boolean;
  setAwaitingAI?: (v: boolean) => void;
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

const initialAIMessage = `Hi! 👋 Describe your ideal helper (skills, personality, schedule, language…), and I’ll find your best match.\n\nTry examples like:\n• cheerful, detail-oriented, speaks English\n• eco-friendly, pet, child\n• quick, flexible, weekday mornings\n• appliance, repair, technician`;

export default function AIChatModal({ isOpen, onClose, onProviderSelected, allProviders, sessionKey,
  chatHistory,
  setChatHistory,
  result,
  setResult,
  awaitingAI,
  setAwaitingAI
}: AIChatModalProps) {
  // For the persistent demo: use props as canonical state!
  const chat = chatHistory || [];
  const setChat = setChatHistory!;
  const myResult = result;
  const mySetResult = setResult!;
  const awaiting = awaitingAI!;
  const setAwaiting = setAwaitingAI!;
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Session reset on logout only (or in future, on major tab change if desired)
  useEffect(() => {
    if (isOpen && chat.length === 0) {
      setChat([{ sender: "ai", text: initialAIMessage }]);
      setInput("");
      setAwaiting(false);
      mySetResult(null);
    }
    // eslint-disable-next-line
  }, [isOpen, sessionKey]);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, isOpen, awaiting]);

  function handleSend() {
    if (!input.trim() || awaiting || myResult) return;
    setChat([...chat, { sender: "user", text: input.trim() }]);
    setAwaiting(true);
    setTimeout(() => {
      const text = input.trim().toLowerCase();
      let found = MOCK_MATCH_KEYWORDS.find(({ keywords }) => keywords.some(k => text.includes(k)));
      if (!found) found = MOCK_MATCH_KEYWORDS[0];
      const provider = allProviders[found.providerId];
      if (provider) {
        mySetResult({ provider, reason: found.reason });
        setChat([...chat, { sender: "user", text: input.trim() }, { sender: "ai", text: `Here’s the best match for you!\n(${found.reason})` }]);
      } else {
        setChat([...chat, { sender: "user", text: input.trim() }, { sender: "ai", text: "Sorry, I couldn’t find a suitable match (demo only)." }]);
      }
      setAwaiting(false);
    }, 1200);
    setInput("");
  }

  function handleBgClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  if (!isOpen) return null;
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40" onMouseDown={handleBgClick}>
      <div className="relative bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl flex flex-col" style={{ minHeight: 480 }}>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold" onClick={onClose}>
          ×
        </button>
        <div className="flex flex-col flex-1 p-6 pb-4 overflow-y-auto max-h-[70vh]">
          {chat.map((msg, i) => (
            <div key={i} className={msg.sender === "ai" ? "mb-2 flex" : "mb-2 flex justify-end"}>
              {msg.sender === "ai" ? (
                <div className="rounded-lg bg-sky-100 text-sky-900 px-4 py-2 max-w-xs shadow whitespace-pre-line">
                  {msg.text.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}
                </div>
              ) : (
                <div className="rounded-lg bg-emerald-500 text-white px-4 py-2 max-w-xs shadow self-end">
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          {awaiting && (
            <div className="mb-2 flex">
              <div className="rounded-lg bg-sky-100 text-sky-900 px-4 py-2 max-w-xs shadow animate-pulse">
                AI is typing…
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
          {myResult && (
            <div className="mt-4 bg-gradient-to-br from-sky-50 via-teal-50 to-white p-4 rounded-xl shadow flex flex-col items-center">
              <img
                src={myResult.provider.avatar}
                alt={myResult.provider.name}
                className="rounded-full shadow w-20 h-20 mb-2 object-cover"
              />
              <div className="font-bold text-lg text-gray-800 mb-1">{myResult.provider.name}</div>
              <div className="text-sm text-gray-600 mb-2">{myResult.provider.service}</div>
              <div className="mb-1 text-emerald-700 font-semibold">Match reason: {myResult.reason}</div>
              <div className="text-gray-700 text-sm mb-2 text-center">{myResult.provider.description}</div>
              <button
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-full shadow-lg"
                onClick={() => {
                  onProviderSelected(myResult.provider);
                  onClose();
                }}
              >
                View Details
              </button>
            </div>
          )}
        </div>
        {!myResult && (
          <form
            className="flex p-4 gap-2 border-t"
            onSubmit={e => { e.preventDefault(); handleSend(); }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="eg: cheerful, eco, weekends..."
              disabled={awaiting}
              autoFocus
            />
            <button
              type="submit"
              className="bg-sky-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-sky-700 disabled:opacity-50"
              disabled={awaiting || !input.trim()}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
