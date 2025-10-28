import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

type Props = {
  onBack: () => void;
};

// Small SVG icon components (kept inline to avoid extra deps)
function IconHealth(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path d="M20.8 8.6c0 4.9-8.8 11.1-8.8 11.1S3.2 13.5 3.2 8.6a4 4 0 0 1 6.4-3.1l.8.7.8-.7a4 4 0 0 1 6.4 3.1z" />
    </svg>
  );
}
function IconRelationship(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zM8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zM2 21c0-2.8 3.6-5 8-5s8 2.2 8 5" />
    </svg>
  );
}
function IconSelf(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function IconCoin(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M10 9h4v6h-4z" />
    </svg>
  );
}

export default function ValueDashboardDetailPage({ onBack }: Props) {
  // --- Helper: count-up hook ---
  function useCountUp(target: number, duration = 800, start = false) {
    const [value, setValue] = useState(0);
    useEffect(() => {
      if (!start) return;
      let startTime: number | null = null;
      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        // springy ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased * 100) / 100);
        if (progress < 1) requestAnimationFrame(step);
      };
      const raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [target, duration, start]);
    return value;
  }

  // useInView simple hook
  function useInView(ref: React.RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
      if (!ref.current) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      }, options || { threshold: 0.15 });
      obs.observe(ref.current);
      return () => obs.disconnect();
    }, [ref, options]);
    return inView;
  }
  // Demo service history (front-end simulation). Each item includes a date so we can compute "this week".
  const serviceHistory = [
    { serviceName: 'Home Cleaning', category: 'homeCleaning', duration: 15, cost: 120, date: new Date().toISOString() },
    { serviceName: 'Errand Helper', category: 'errandService', duration: 8, cost: 60, date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Online Course', category: 'learning', duration: 6, cost: 200, date: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Appliance Repair', category: 'applianceRepair', duration: 4, cost: 80, date: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Gardening', category: 'gardening', duration: 2, cost: 40, date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() },
  ];

  // Investment configuration
  const BASE_VALUE_PER_COIN = 50; // $50 per Time Coin
  const MULTIPLIERS = {
    health: 1.2,
    relationship: 1.5,
    self: 2.0,
  };

  // Category allocation rules (fractions sum to 1)
  const CATEGORY_ALLOCATION: Record<string, { health: number; relationship: number; self: number }> = {
    homeCleaning: { health: 0.5, relationship: 0.5, self: 0 },
    errandService: { health: 0, relationship: 0.3, self: 0.7 },
    applianceRepair: { health: 0.6, relationship: 0.0, self: 0.4 },
    gardening: { health: 0.7, relationship: 0.3, self: 0 },
    learning: { health: 0, relationship: 0, self: 1.0 },
    default: { health: 0.33, relationship: 0.33, self: 0.34 },
  };

  type PortfolioResult = {
    totalTimeCoins: number;
    healthCoins: number;
    relationshipCoins: number;
    selfCoins: number;
    estimatedFutureValue: number; // in $
    allocationValue: { portfolio: string; coins: number; value: number; multiplier: number }[];
    pensionCredits: number;
  };

  // Core calculation function
  function calculateInvestmentPortfolio(history: typeof serviceHistory): PortfolioResult {
    // New unit: 1 hour = 10 Time Coins. We'll keep dollar computations based on hours
    // so that final dollar values remain unchanged, while displayed coin counts scale up.
    let healthHours = 0;
    let relationshipHours = 0;
    let selfHours = 0;

    const totalHours = history.reduce((sum, h) => sum + (h.duration || 0), 0);

    for (const item of history) {
      const alloc = CATEGORY_ALLOCATION[item.category] || CATEGORY_ALLOCATION['default'];
      const duration = item.duration || 0; // in hours
      healthHours += duration * alloc.health;
      relationshipHours += duration * alloc.relationship;
      selfHours += duration * alloc.self;
    }

    // Scaled coins for display (1 hour = 10 Time Coins)
    const healthCoins = healthHours * 10;
    const relationshipCoins = relationshipHours * 10;
    const selfCoins = selfHours * 10;
    const totalTimeCoins = Math.round(totalHours * 10 * 100) / 100;

    // Compute dollar values using hours so totals remain identical to previous logic
    const healthValue = healthHours * MULTIPLIERS.health * BASE_VALUE_PER_COIN;
    const relationshipValue = relationshipHours * MULTIPLIERS.relationship * BASE_VALUE_PER_COIN;
    const selfValue = selfHours * MULTIPLIERS.self * BASE_VALUE_PER_COIN;

    const estimatedFutureValue = Math.round((healthValue + relationshipValue + selfValue) * 100) / 100;

    const allocationValue = [
      { portfolio: 'Health Investment', coins: Math.round(healthCoins * 100) / 100, value: Math.round(healthValue * 100) / 100, multiplier: MULTIPLIERS.health },
      { portfolio: 'Relationship Investment', coins: Math.round(relationshipCoins * 100) / 100, value: Math.round(relationshipValue * 100) / 100, multiplier: MULTIPLIERS.relationship },
      { portfolio: 'Self Investment', coins: Math.round(selfCoins * 100) / 100, value: Math.round(selfValue * 100) / 100, multiplier: MULTIPLIERS.self },
    ];

    // Pension credits: now 100 Time Coins = 1 credit (since coins are scaled)
    const pensionCredits = Math.floor(totalTimeCoins * 0.01);

    return { totalTimeCoins, healthCoins, relationshipCoins, selfCoins, estimatedFutureValue, allocationValue, pensionCredits };
  }

  const portfolio = calculateInvestmentPortfolio(serviceHistory);

  // This week's data: last 7 days
  const oneWeekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const thisWeekHistory = serviceHistory.filter((h) => new Date(h.date).getTime() >= oneWeekAgo);
  const thisWeekPortfolio = calculateInvestmentPortfolio(thisWeekHistory);

  // Smart recommendations based on most used categories
  function generateRecommendations(history: typeof serviceHistory) {
    const counts: Record<string, number> = {};
    for (const h of history) counts[h.category] = (counts[h.category] || 0) + (h.duration || 0);
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted[0];
    const advice: string[] = [];
    if (!top) return ["No data yet — start investing time with services to get personalized advice."];
    const [topCat] = top;
    if (topCat === 'homeCleaning' || topCat === 'gardening') {
      advice.push("You're investing heavily in household efficiency. Consider allocating some Time Coins to 'Self Investment' (courses, coaching) to grow future income.");
    }
    if (topCat === 'errandService') {
      advice.push("Strong tilt to efficiency; diversify into 'Relationship Investment' — schedule a family activity that's 'time well spent'.");
    }
    if (topCat === 'learning') {
      advice.push("Great focus on Self Investment — consider deeper specializations to compound returns.");
    }
    if (advice.length === 0) advice.push("We see varied investments — keep diversifying to balance Health, Relationship, and Self portfolios.");
    return advice;
  }

  const recommendations = generateRecommendations(serviceHistory);

  // Achievements and tiering
  const achievements = [
    { name: 'First Investor', description: 'Completed your first Time Coin investment.' },
    { name: 'Time Tycoon', description: 'Saved 200+ Time Coins across services.' },
  ];

  function computeTier(totalCoins: number) {
    // thresholds scaled by 10 because coins are scaled (1 hour = 10 coins)
    if (totalCoins >= 500) return { tier: 'Gold Investor', color: 'text-yellow-500' };
    if (totalCoins >= 200) return { tier: 'Silver Investor', color: 'text-gray-400' };
    return { tier: 'Bronze Investor', color: 'text-amber-700' };
  }

  const tier = computeTier(portfolio.totalTimeCoins);

  // animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
  };

  // refs for in-view
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef);

  // count-up values that start when component enters view
  const countedCoins = useCountUp(portfolio.totalTimeCoins, 900, inView);
  const countedFuture = useCountUp(portfolio.estimatedFutureValue, 1100, inView);

  return (
    <motion.div ref={rootRef} className="p-4 pt-6" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={containerVariants}>
      <style>{`
        /* small local styles for pulse/confetti demo and icon hover */
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
        .icon-hover:hover { transform: scale(1.08); }
      `}</style>

      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Your Life Investment Portfolio</h1>

      {/* Overview card (prominent) */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Overview</h2>
            <p className="text-2xl font-bold text-gray-800">Total Investment</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg flex items-center">
              <IconCoin className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="mt-4 md:flex md:items-end md:justify-between">
          <div>
            <div className="text-5xl font-extrabold text-gray-900 leading-tight">{countedCoins}</div>
            <div className="text-sm text-gray-500 mt-1">Time Coins</div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-lg text-gray-600">Estimated Future Value</div>
            <div className="text-3xl font-bold text-indigo-600">${countedFuture.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">1 Time Coin = ${BASE_VALUE_PER_COIN} base × portfolio multiplier</div>
          </div>
        </div>
      </motion.section>

      {/* Allocation + Chart card */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Asset Allocation</h3>

        {/* Stacked horizontal bar */}
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          {/* compute percents */}
          {(() => {
            const total = Math.max(portfolio.totalTimeCoins, 0.0001);
            const healthPct = Math.round((portfolio.healthCoins / total) * 10000) / 100 || 0;
            const relPct = Math.round((portfolio.relationshipCoins / total) * 10000) / 100 || 0;
            const selfPct = Math.round((portfolio.selfCoins / total) * 10000) / 100 || 0;
            return (
              <div className="flex h-full">
                <motion.div className="bg-emerald-500 h-full" initial={{ width: 0 }} animate={{ width: `${healthPct}%` }} transition={{ duration: 0.9, ease: 'circOut' }} />
                <motion.div className="bg-sky-500 h-full" initial={{ width: 0 }} animate={{ width: `${relPct}%` }} transition={{ duration: 0.9, ease: 'circOut', delay: 0.08 }} />
                <motion.div className="bg-amber-400 h-full" initial={{ width: 0 }} animate={{ width: `${selfPct}%` }} transition={{ duration: 0.9, ease: 'circOut', delay: 0.16 }} />
              </div>
            );
          })()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {portfolio.allocationValue.map((a, i) => (
            <div key={a.portfolio} className="flex items-center gap-3">
              <div className="p-3 rounded-lg" style={{ background: i === 0 ? '#ecfdf5' : i === 1 ? '#eff6ff' : '#fffbeb' }}>
                {i === 0 ? <IconHealth className="w-5 h-5 text-emerald-500 icon-hover transition-transform" /> : i === 1 ? <IconRelationship className="w-5 h-5 text-sky-500 icon-hover" /> : <IconSelf className="w-5 h-5 text-amber-500 icon-hover" />}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">{a.portfolio}</div>
                <div className="text-lg font-bold text-gray-900">{a.coins} Coins • ${a.value.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Multiplier ×{a.multiplier}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* This Week */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">This Week's Investment Report</h3>
        <p className="text-sm text-gray-600">You invested <span className="font-semibold text-indigo-600">{thisWeekPortfolio.totalTimeCoins}</span> Time Coins this week, increasing future value by <span className="font-semibold">${thisWeekPortfolio.estimatedFutureValue.toLocaleString()}</span>.</p>
        <p className="mt-3 text-gray-700">Motivational summary: Keep compounding — small, consistent investments in Health, Relationship, and Self build long-term value.</p>
      </motion.section>

      {/* Recommendations */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Smart Investment Advisor</h3>
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-4 rounded-lg border border-gray-100 bg-gray-50">
              <div className="text-sm text-gray-700">{rec}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pension & Achievements */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Pension Plan & Achievements</h3>
          <div className="text-sm text-gray-500">Tier: <span className="font-semibold text-gray-800">{tier.tier}</span></div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600">Pension Credits Earned: <span className="font-semibold">{portfolio.pensionCredits}</span></div>
          <div className="w-full bg-gray-100 rounded-full h-3 mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-3" style={{ width: `${Math.round(portfolio.totalTimeCoins % 100)}%` }} />
          </div>
          <div className="text-xs text-gray-400 mt-1">Every 100 Time Coins grants 1 pension credit. Keep investing to grow future stability.</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {achievements.map((ach, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className={`text-4xl mb-2 ${index === 0 ? 'text-indigo-500' : 'text-yellow-400'}`} style={{ animation: index === 0 ? 'pulse 2s infinite' : undefined }}>🏦</div>
              <h3 className="font-semibold text-gray-800">{ach.name}</h3>
              <p className="text-sm text-gray-500">{ach.description}</p>
            </motion.div>
          ))}

          <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-2 text-green-400">🏆</div>
            <h3 className="font-semibold text-gray-800">{tier.tier}</h3>
            <p className="text-sm text-gray-500">Tier based on total Time Coins: {Math.round(portfolio.totalTimeCoins)}</p>
          </motion.div>
        </div>
      </motion.section>

    </motion.div>
  );
}
