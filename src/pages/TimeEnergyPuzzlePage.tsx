import { useEffect, useMemo, useState } from "react";

type Task = {
  id: number;
  text: string;
  emoji: string;
  type: "drain" | "boost";
};

type Props = {
  onBack?: () => void;
  onClaimReward?: () => void;
};

const GAME_CONFIG: { negativeTasks: Task[]; positiveTasks: Task[] } = {
  negativeTasks: [
    { id: 1, text: "Deep Clean Bathroom", emoji: "🚽", type: "drain" },
    { id: 2, text: "Weekend Laundry", emoji: "👕", type: "drain" },
    { id: 3, text: "Queue for Errands", emoji: "🏦", type: "drain" },
    { id: 4, text: "Fix Appliances", emoji: "🔧", type: "drain" },
    { id: 5, text: "Grocery Shopping", emoji: "🛒", type: "drain" },
    { id: 6, text: "Full House Cleaning", emoji: "🧹", type: "drain" },
  ],
  positiveTasks: [
    { id: 7, text: "Time with Kids", emoji: "📚", type: "boost" },
    { id: 8, text: "Learn New Skills", emoji: "💻", type: "boost" },
    { id: 9, text: "Gym Workout", emoji: "💪", type: "boost" },
    { id: 10, text: "Friends Gathering", emoji: "🍻", type: "boost" },
    { id: 11, text: "Forest Hike", emoji: "🌳", type: "boost" },
    { id: 12, text: "Creative Hobbies", emoji: "🎨", type: "boost" },
  ],
};

function getRandomItems<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < count && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return result;
}

export default function TimeEnergyPuzzlePage({ onBack, onClaimReward }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [replacedCount, setReplacedCount] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null);
  const [sparkleAtIndex, setSparkleAtIndex] = useState<number | null>(null);

  const positiveById = useMemo(() => {
    const map = new Map<number, Task>();
    GAME_CONFIG.positiveTasks.forEach((t) => map.set(t.id, t));
    return map;
  }, []);

  useEffect(() => {
    // Initialization: fill grid with 9 random negative tasks
    const initial = getRandomItems(GAME_CONFIG.negativeTasks, 9);
    setTasks(initial);
  }, []);

  useEffect(() => {
    if (replacedCount >= 3) {
      setGameCompleted(true);
    }
  }, [replacedCount]);

  const handleDragStart = (task: Task) => (e: React.DragEvent<HTMLDivElement>) => {
    if (task.type !== "drain") return;
    setDraggingTaskId(task.id);
    e.dataTransfer.setData("text/plain", String(task.id));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const idStr = e.dataTransfer.getData("text/plain");
    const taskId = Number(idStr);
    const idx = tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) return;
    const task = tasks[idx];
    if (task.type !== "drain") return;

    // choose a random positive task not already in grid
    const currentIds = new Set(tasks.map((t) => t.id));
    const available = GAME_CONFIG.positiveTasks.filter((t) => !currentIds.has(t.id));
    const replacement = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : GAME_CONFIG.positiveTasks[Math.floor(Math.random() * GAME_CONFIG.positiveTasks.length)];

    const next = [...tasks];
    next[idx] = replacement;
    setTasks(next);
    setReplacedCount((c) => Math.min(3, c + 1));
    setSparkleAtIndex(idx);
    setTimeout(() => setSparkleAtIndex(null), 750);
  };

  const resetGame = () => {
    setTasks(getRandomItems(GAME_CONFIG.negativeTasks, 9));
    setReplacedCount(0);
    setGameCompleted(false);
    setIsDragOver(false);
    setDraggingTaskId(null);
  };

  const bgOpacity = Math.min(1, 0.1 + 0.3 * replacedCount);
  const gloomOpacity = 1 - Math.min(1, replacedCount / 3);
  const headerTitle = replacedCount >= 3
    ? "Life Unlocked! This Could Be Your Reality"
    : replacedCount >= 1
      ? "Finding Space for What Matters"
      : "My Life Buried in Chores";

  const unlockedTheme = useMemo(() => {
    const boosts = tasks.filter((t) => t.type === "boost");
    return boosts[0]?.text || "family time";
  }, [tasks]);

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Background storytelling layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        {/* lifestyle image fades in */}
        <img
          src="/assets/market/forstorywall.jpg"
          alt="Lifestyle inspiration"
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: bgOpacity }}
        />
        {/* gloom overlay fades out */}
        <div
          className="absolute inset-0 gloom-overlay"
          style={{ opacity: gloomOpacity }}
        />
        {/* vibrant overlay fades in */}
        <div
          className="absolute inset-0 vibrant-overlay"
          style={{ opacity: 1 - gloomOpacity }}
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2"><path fillRule="evenodd" d="M9.53 4.47a.75.75 0 010 1.06L5.81 9.25H21a.75.75 0 010 1.5H5.81l3.72 3.72a.75.75 0 11-1.06 1.06l-5-5a.75.75 0 010-1.06l5-5a.75.75 0 011.06 0z" clipRule="evenodd"/></svg>
          Back
        </button>
        <div className="text-sm text-gray-500">Progress: <span className="font-semibold text-indigo-600">{replacedCount}/3</span> tasks outsourced</div>
      </div>

      {/* Header */}
      <div className="bg-white/70 backdrop-blur p-6 rounded-2xl shadow-md text-center mb-6 transition-colors">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-900">{headerTitle}</h1>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto">Drag energy-draining tasks to the <span className="font-semibold">Outsource Zone</span> and watch your life transform.</p>
        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-white/60 text-indigo-700 text-sm font-semibold shadow-sm border border-indigo-100">
          {replacedCount}/3 tasks outsourced
        </div>
      </div>

      {/* Outsource Zone */}
      <div
        className={`rounded-2xl border-2 border-dashed transition-colors ${isDragOver ? "bg-emerald-50 border-emerald-400" : "bg-white border-gray-300"} p-6 text-center shadow-sm mb-6`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-gray-700 font-semibold">Outsource Zone - Drop draining tasks here</div>
        <div className="text-sm text-gray-500 mt-1">Only red tasks can be outsourced</div>
      </div>

      {/* Grid */}
      <div className="relative">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {tasks.map((task, index) => (
            <div className="relative" key={`${task.id}-${task.type}-${index}`}>
              {/* Sparkle layer */}
              {sparkleAtIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="sparkle-pop w-12 h-12 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 70%)" }} />
                </div>
              )}
              {/* Card */}
              <div
                draggable={task.type === "drain"}
                onDragStart={handleDragStart(task)}
                onDragEnd={handleDragEnd}
                className={`select-none rounded-xl p-4 md:p-5 border transition transform hover:-translate-y-0.5 shadow ${
                  task.type === "drain"
                    ? "bg-rose-50/70 border-rose-200 hover:border-rose-300 grayscale-[0.3] contrast-[0.9] shadow-2xl"
                    : "bg-emerald-50 border-emerald-200 hover:border-emerald-300 soft-pulse"
                } ${draggingTaskId === task.id ? "opacity-70" : "opacity-100"}`}
              >
                <div className="text-2xl md:text-3xl mb-2">{task.emoji}</div>
                <div className="text-sm md:text-base font-semibold text-gray-800">{task.text}</div>
                <div className={`text-xs mt-2 inline-flex items-center px-2 py-0.5 rounded-full ${
                  task.type === "drain" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                }`}>
                  {task.type === "drain" ? "Drain" : "Boost"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <button onClick={resetGame} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold border border-gray-200">Reset</button>
        <div className="text-sm text-gray-500">Tip: Try outsourcing three drains</div>
      </div>

      {/* Victory Screen */}
      {gameCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-center">
            <div className="text-4xl mb-2">🎉✨</div>
            <h2 className="text-2xl font-extrabold text-indigo-900">LOOK WHAT YOU'VE UNLOCKED!</h2>
            <p className="mt-3 text-gray-700">By outsourcing just 3 chores, you've created space for <span className="font-semibold text-indigo-700">{unlockedTheme}</span>. This is your life waiting for you.</p>
            <div className="mt-4 text-left text-gray-700 space-y-2">
              <div className="flex items-start"><span className="mr-2">✓</span> Outsource draining tasks</div>
              <div className="flex items-start"><span className="mr-2">✓</span> Focus on value-adding activities</div>
              <div className="flex items-start"><span className="mr-2">✓</span> This is smart time management!</div>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-3">
              <button
                onClick={() => {
                  onClaimReward?.();
                }}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md"
              >
                Claim 50 Time Coins
              </button>
              <button
                onClick={() => setGameCompleted(false)}
                className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold border border-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


