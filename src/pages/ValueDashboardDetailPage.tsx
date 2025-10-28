import React, { useRef } from 'react'; // kept for JSX/runtime compatibility
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { calculateInvestmentPortfolio, generateRecommendations, computeTier } from '../hooks/useInvestmentCalculator';
import { useCountUp, useInView } from '../hooks/useCountUp';
import { IconHealth, IconRelationship, IconSelf, IconCoin } from '../components/InvestmentIcons';

type Props = {
  onBack: () => void;
};

// Icon components were extracted to ../components/InvestmentIcons

export default function ValueDashboardDetailPage({ onBack }: Props) {
  // count-up and in-view hooks are delegated to hooks/useCountUp
  // Demo service history (front-end simulation). Each item includes a date so we can compute "this week".
  const serviceHistory = [
    { serviceName: 'Home Cleaning', category: 'homeCleaning', duration: 15, cost: 120, date: new Date().toISOString() },
    { serviceName: 'Errand Helper', category: 'errandService', duration: 8, cost: 60, date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Online Course', category: 'learning', duration: 6, cost: 200, date: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Appliance Repair', category: 'applianceRepair', duration: 4, cost: 80, date: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Gardening', category: 'gardening', duration: 2, cost: 40, date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() },
  ];

  const portfolio = calculateInvestmentPortfolio(serviceHistory as any);

  // This week's data: last 7 days
  const oneWeekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const thisWeekHistory = serviceHistory.filter((h) => new Date(h.date).getTime() >= oneWeekAgo);
  const thisWeekPortfolio = calculateInvestmentPortfolio(thisWeekHistory);

  const recommendations = generateRecommendations(serviceHistory as any);

  // Achievements and tiering
  const achievements = [
    { name: 'First Investor', description: 'Completed your first Time Coin investment.' },
    { name: 'Time Tycoon', description: 'Saved 200+ Time Coins across services.' },
  ];
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
            <div className="text-xs text-gray-400 mt-1">1 Time Coin = $5 base × portfolio multiplier</div>
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
