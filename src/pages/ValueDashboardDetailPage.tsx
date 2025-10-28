import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { calculateInvestmentPortfolio, generateRecommendations, computeTier } from '../hooks/useInvestmentCalculator';
import { useCountUp, useInView } from '../hooks/useCountUp';
import { IconHealth, IconRelationship, IconSelf, IconCoin, IconInfo } from '../components/InvestmentIcons';

type Props = {
  onBack: () => void;
  onOpenMarketplace?: () => void;
};

// Icon components were extracted to ../components/InvestmentIcons

export default function ValueDashboardDetailPage({ onBack, onOpenMarketplace }: Props) {
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

  // Info modal state
  const [showInfo, setShowInfo] = useState(false);

  // close modal on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowInfo(false);
    }
    if (showInfo) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showInfo]);

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
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-extrabold text-gray-800">My Investment</h1>
            <button
            aria-label="About Life Investment calculations"
            onClick={() => setShowInfo(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
            <IconInfo className="w-5 h-5 text-gray-600" />
            </button>
        </div>
        <p className="text-lg text-gray-600 mt-2">Track the future value of your saved time.</p>
      </div>

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

      {/* Time Coin Marketplace CTA - placed after Smart Investment Advisor */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Time Coin Rewards</h3>
            <p className="text-sm text-gray-600">Redeem your Time Coins for real-world benefits</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => onOpenMarketplace && onOpenMarketplace()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Explore Marketplace →
            </button>
          </div>
        </div>
      </motion.section>

        {/* Info Modal */}
        {showInfo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowInfo(false)} />
            <motion.div role="dialog" aria-modal="true" initial={{ y: 20, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="relative z-10 max-w-3xl w-full bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold">📊 Your Life Investment Portfolio - Calculation Logic</h2>
                <button aria-label="Close" onClick={() => setShowInfo(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <div className="mt-4 prose prose-sm text-sm text-gray-700 max-h-[60vh] overflow-auto">
                <h3>Core Concept</h3>
                <p>We reframe every service you purchase as an investment in your future. Our Time Bank system converts saved time into growable assets.</p>

                <h4>1. Time Coin Basic System</h4>
                <ul>
                  <li><strong>Standard Conversion</strong>: 1 hour = 10 Time Coins</li>
                  <li>All service hours accumulate into your total time assets</li>
                  <li><em>Why 10×?</em> To show investment growth more granularly</li>
                </ul>

                <h4>2. Smart Asset Allocation</h4>
                <div className="mt-2 overflow-auto">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="text-xs text-gray-500">
                        <th className="px-3 py-2">Service Type</th>
                        <th className="px-3 py-2">Health</th>
                        <th className="px-3 py-2">Relationship</th>
                        <th className="px-3 py-2">Self</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-3 py-2 font-medium text-gray-700">Home Cleaning</td>
                        <td className="px-3 py-2">50%</td>
                        <td className="px-3 py-2">50%</td>
                        <td className="px-3 py-2">0%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-gray-700">Errand Service</td>
                        <td className="px-3 py-2">0%</td>
                        <td className="px-3 py-2">30%</td>
                        <td className="px-3 py-2">70%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-gray-700">Appliance Repair</td>
                        <td className="px-3 py-2">60%</td>
                        <td className="px-3 py-2">0%</td>
                        <td className="px-3 py-2">40%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-gray-700">Gardening</td>
                        <td className="px-3 py-2">70%</td>
                        <td className="px-3 py-2">30%</td>
                        <td className="px-3 py-2">0%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-gray-700">Learning Courses</td>
                        <td className="px-3 py-2">0%</td>
                        <td className="px-3 py-2">0%</td>
                        <td className="px-3 py-2">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4>3. Future Value Multipliers</h4>
                <ul>
                  <li><strong>Health</strong> ×1.2 — reduces future health costs</li>
                  <li><strong>Relationship</strong> ×1.5 — emotional returns</li>
                  <li><strong>Self</strong> ×2.0 — learning & income growth</li>
                </ul>

                <h4>4. Value Calculation Formula</h4>
                <pre className="bg-gray-50 p-2 rounded">Future Value = (Health Coins × 1.2 + Relationship Coins × 1.5 + Self Coins × 2.0) × $5</pre>

                <h4>5. VIP Retirement Benefits</h4>
                <ul>
                  <li>Every 100 Time Coins = 1 VIP Credit. VIP Credits unlock premium service privileges and priority access in retirement.</li>
                  <li>Accumulate Pension Credits to unlock premium service privileges in your retirement</li>
                </ul>

                <h4>Example</h4>
                <p>4-hour deep cleaning → 40 Time Coins (4×10). Allocation: Health 20 + Relationship 20. Future Value: (20×1.2 + 20×1.5) × $5 = $270</p>

                <h4>Current Analysis (demo)</h4>
                <ul>
                  <li>Total Time Assets: 350 Time Coins (35 hours)</li>
                  <li>Estimated Future Value: $2,785.5</li>
                  <li>VIP Credits: 3 credits (350 Time Coins)</li>
                </ul>

                <p className="mt-2 text-xs text-gray-400">All calculations are for guidance and may vary by usage. Time is your most valuable asset — invest it wisely.</p>
              </div>
            </motion.div>
          </motion.div>
        )}

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

        {/* Progress bar moved here to associate visually with the Investor Tier */}
        <div className="mt-3">
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div className="bg-indigo-600 h-3" style={{ width: `${Math.round(portfolio.totalTimeCoins % 100)}%` }} />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600">Pension Credits Earned: <span className="font-semibold">{portfolio.pensionCredits}</span></div>
          <div className="text-xs text-gray-400 mt-1">Every 100 Time Coins grants 1 VIP Credit. Keep investing to grow future stability.</div>
          <div className="text-xs text-gray-500 mt-1">3 Credits = VIP status for future service priority & discounts</div>
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
