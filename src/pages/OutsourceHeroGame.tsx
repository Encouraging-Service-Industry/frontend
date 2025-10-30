import { useMemo, useState } from "react";

type Props = {
  onBack?: () => void;
  onClaimReward?: () => void;
};

type Choice = "outsource" | "diy";

const SCENES = [
  {
    id: 1,
    title: "Thursday Evening: Friends or Floor Mop?",
    text:
      "You’re invited to a casual meetup by the seaside. Your flat needs a deep clean. What do you do?",
    outsourceEffect: { energy: +2, happiness: +2, shame: -1 },
    diyEffect: { energy: -2, happiness: -1, shame: +1 },
  },
  {
    id: 2,
    title: "Saturday Morning: Rain or Windows?",
    text:
      "It’s rare sunshine this week in Helsinki. Your windows are overdue. What’s your move?",
    outsourceEffect: { energy: +2, happiness: +1, shame: -1 },
    diyEffect: { energy: -2, happiness: 0, shame: +1 },
  },
  {
    id: 3,
    title: "Sunday Family Time: Forest Walk or Laundry Mountain?",
    text:
      "Kids want a forest walk and berries. Laundry basket is overflowing. Choose wisely!",
    outsourceEffect: { energy: +2, happiness: +2, shame: -1 },
    diyEffect: { energy: -2, happiness: -1, shame: +1 },
  },
];

export default function OutsourceHeroGame({ onBack, onClaimReward }: Props) {
  const [step, setStep] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [shame, setShame] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);

  const scene = step < SCENES.length ? SCENES[step] : null;
  const complete = step >= SCENES.length;

  const summary = useMemo(() => {
    const vibe = happiness >= 3 ? "Sauna-time serenity" : happiness >= 1 ? "Balanced week" : "Stressed week";
    const copy =
      happiness >= 3
        ? "You embraced help and unlocked more of what makes Finnish life joyful — nature, family, and calm."
        : happiness >= 1
        ? "You found a better balance by asking for help when it mattered."
        : "Tough week. Next time, try outsourcing one more task — it’s smart, not shameful.";
    return { vibe, copy };
  }, [happiness]);

  const handlePick = (pick: Choice) => {
    if (!scene) return;
    const eff = pick === "outsource" ? scene.outsourceEffect : scene.diyEffect;
    setEnergy((e) => e + eff.energy);
    setHappiness((h) => h + eff.happiness);
    setShame((s) => s + eff.shame);
    setChoices((c) => [...c, pick]);
    setStep((i) => i + 1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2"><path fillRule="evenodd" d="M9.53 4.47a.75.75 0 010 1.06L5.81 9.25H21a.75.75 0 010 1.5H5.81l3.72 3.72a.75.75 0 11-1.06 1.06l-5-5a.75.75 0 010-1.06l5-5a.75.75 0 011.06 0z" clipRule="evenodd"/></svg>
          Back
        </button>
        <div className="text-sm text-gray-500">Progress: <span className="font-semibold text-indigo-600">{Math.min(step, SCENES.length)}/{SCENES.length}</span></div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-2xl shadow mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-900">Outsource Hero: Life Transformation Journey</h1>
        <p className="text-gray-700 mt-2">Normalize asking for help. Celebrate what you unlock by doing so.</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <div className="text-xs text-gray-500">Energy</div>
            <div className="text-xl font-bold text-emerald-600">{energy}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <div className="text-xs text-gray-500">Happiness</div>
            <div className="text-xl font-bold text-amber-600">{happiness}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <div className="text-xs text-gray-500">Shame</div>
            <div className="text-xl font-bold text-rose-600">{shame}</div>
          </div>
        </div>
      </div>

      {!complete && scene && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{scene.title}</h2>
          <p className="text-gray-700 mb-6">{scene.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handlePick("outsource")}
              className="rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold p-4 text-left shadow-sm"
            >
              ✅ Outsource
              <div className="text-xs text-emerald-700 mt-1">Energy +{scene.outsourceEffect.energy}, Happiness +{scene.outsourceEffect.happiness}, Shame {scene.outsourceEffect.shame}</div>
            </button>
            <button
              onClick={() => handlePick("diy")}
              className="rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold p-4 text-left shadow-sm"
            >
              🧹 Do It Yourself
              <div className="text-xs text-gray-600 mt-1">Energy {scene.diyEffect.energy}, Happiness {scene.diyEffect.happiness}, Shame +{Math.abs(scene.diyEffect.shame)}</div>
            </button>
          </div>
        </div>
      )}

      {complete && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-2xl font-extrabold text-indigo-900 mb-2">{summary.vibe}</h2>
          <p className="text-gray-700 mb-4">{summary.copy}</p>
          <div className="text-sm text-gray-500 mb-6">Your choices: {choices.map((c, i) => (c === "outsource" ? "Outsource" : "DIY")).join(" • ")}</div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClaimReward}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md"
            >
              Claim 50 Time Coins
            </button>
            <button
              onClick={onBack}
              className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold border border-gray-200"
            >
              Back Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


