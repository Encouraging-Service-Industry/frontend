import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { calculateInvestmentPortfolio, generateRecommendations, computeTier } from '../hooks/useInvestmentCalculator';
import { useCountUp, useInView } from '../hooks/useCountUp';
import { IconHealth, IconRelationship, IconSelf, IconCoin, IconInfo } from '../components/InvestmentIcons';

type Props = {
  onBack: () => void;
  onOpenMarketplace?: () => void;
  onOpenServiceCategory?: (category: string) => void; // New prop for opening specific service categories
};

// Icon components were extracted to ../components/InvestmentIcons

export default function ValueDashboardDetailPage({ onBack, onOpenMarketplace, onOpenServiceCategory }: Props) {
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
    <motion.div ref={rootRef} className="max-w-4xl mx-auto px-4 p-4 pt-6" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={containerVariants}>
      <style>{`
        /* small local styles for pulse/confetti demo and icon hover */
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
        .icon-hover:hover { transform: scale(1.08); }
      `}</style>


      {/* Enhanced Header/Mini-Banner for My Investment */}
      <div
        className="relative bg-cover bg-center p-6 rounded-xl shadow-sm text-center mb-6"
        style={{ backgroundImage: "url('/assets/brandlogo.png')" }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-20 rounded-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3">
              <h1 className="text-2xl font-extrabold text-white">Your Saved Time is Your Life Energy</h1>
              <button
              aria-label="About Time Wealth calculations"
              onClick={() => setShowInfo(true)}
              className="p-2 rounded-full hover:bg-blue-100 transition-transform transform hover:scale-105"
              >
              <IconInfo className="w-5 h-5 text-white" />
              </button>
          </div>
          <p className="text-base text-blue-100 mt-2">See how your saved time enriches your life.</p>
        </div>
      </div>

      {/* Overview card - Re-optimized Layout */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Total Time Wealth Overview</h2>
          <div className="p-2 bg-gray-50 rounded-full flex items-center">
            <IconCoin className="w-5 h-5 text-indigo-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Time Coins - Left Column */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-2">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                {/* Progress circle */}
                <circle
                  className="text-indigo-500 progress-ring__circle stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${(countedCoins / 100) * 251.2} 251.2`} /* 2 * PI * R = 251.2 */
                  transform="rotate(-90 50 50)"
                ></circle>
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold text-gray-800"
                >
                  {countedCoins}
                </text>
              </svg>
            </div>
            <div className="text-base font-medium text-gray-700">Time Coins</div>
            <p className="text-xs text-gray-500 mt-1">Towards next tier (100 coins)</p>
          </div>

          {/* Estimated Future Value - Right Column */}
          <div className="text-center md:text-right">
            <div className="text-xl font-semibold text-gray-800 mb-2">{portfolio.motivationalMessage}</div>
            <div className="text-5xl font-bold text-emerald-600 leading-tight">{portfolio.lifeEnergyGained} Hours</div>
            <div className="text-sm text-gray-600 mt-1">Life Energy Gained</div>
            <p className="text-xs text-gray-500 mt-2">Theoretical Financial Equivalent: ${countedFuture.toLocaleString()}</p>
          </div>
        </div>
      </motion.section>

      {/* Time Coin Marketplace CTA - Optimized */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Time Coin Rewards</h3>
            <p className="text-sm text-gray-600">Redeem your Time Coins for real-world benefits</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => onOpenMarketplace && onOpenMarketplace()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition flex items-center gap-2"
            >
              Explore Marketplace <IconCoin className="w-4 h-4" />
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
                <h2 className="text-xl font-semibold">📊 Your Time Wealth - Calculation Logic</h2>
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

      {/* Allocation + Chart card - Re-optimized */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Asset Allocation</h3>

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
            <div key={a.portfolio} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-lg" style={{ background: i === 0 ? '#ecfdf5' : i === 1 ? '#eff6ff' : '#fffbeb' }}>
                {i === 0 ? <IconHealth className="w-5 h-5 text-emerald-500 icon-hover transition-transform" /> : i === 1 ? <IconRelationship className="w-5 h-5 text-sky-500 icon-hover" /> : <IconSelf className="w-5 h-5 text-amber-500 icon-hover" />}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">{a.portfolio}</div>
                <div className="text-lg font-bold text-gray-900">{a.coins} Coins</div>
                {a.portfolio === 'Vitality & Well-being' && <div className="text-xs text-gray-500">Less stress, more energy for life.</div>}
                {a.portfolio === 'Connection & Family' && <div className="text-xs text-gray-500">Time for those who matter most.</div>}
                {a.portfolio === 'Growth & Skills' && <div className="text-xs text-gray-500">Building a better you.</div>}
                <div className="text-xs text-gray-400 mt-1">Multiplier ×{a.multiplier}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* This Week - Further Optimized with Visual Comparison */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week's Investment Report</h3>
        <div className="flex items-center justify-around mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <IconCoin className="w-5 h-5 text-indigo-600" />
              <div className="text-3xl font-bold text-indigo-600">{thisWeekPortfolio.totalTimeCoins}</div>
            </div>
            <div className="text-sm text-gray-600">Time Coins Invested</div>
            {/* Simulated Sparkline for Time Coins */}
            <div className="flex justify-center items-end h-6 w-24 mx-auto mt-1">
              <div className="w-1/4 h-3 bg-green-400"></div>
              <div className="w-1/4 h-4 bg-green-400"></div>
              <div className="w-1/4 h-5 bg-green-500"></div>
              <div className="w-1/4 h-6 bg-green-600"></div>
            </div>
            <p className="text-xs text-green-600 mt-1">+15% vs. last week</p> {/* Simulated comparison */}
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold text-emerald-600">{thisWeekPortfolio.lifeEnergyGained} Hours</span>
            </div>
            <div className="text-sm text-gray-600">Life Energy Gained This Week</div>
            {/* Simulated Sparkline for Future Value */}
            <div className="flex justify-center items-end h-6 w-24 mx-auto mt-1">
              <div className="w-1/4 h-4 bg-green-400"></div>
              <div className="w-1/4 h-5 bg-green-500"></div>
              <div className="w-1/4 h-6 bg-green-600"></div>
              <div className="w-1/4 h-3 bg-green-400"></div>
            </div>
            <p className="text-xs text-green-600 mt-1">(Equivalent to ~${thisWeekPortfolio.estimatedFutureValue.toLocaleString()})</p> {/* Simulated comparison */}
          </div>
        </div>
        <p className="mt-3 text-gray-700 text-center text-sm">
          Consistent choices build lasting well-being.
        </p>
      </motion.section>      {/* Recommendations - Optimized */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Smart Investment Advisor</h3>
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-4 rounded-lg border border-gray-100 bg-gray-50 flex items-center space-x-3">
              <span className="text-xl">💡</span> {/* Lightbulb icon */}
              <div className="text-sm text-gray-700 flex-1">
                {rec.message.split(" ").map((word, i) => (
                  rec.categoryLink && word.includes("book") ? (
                    <button
                      key={i}
                      onClick={() => onOpenServiceCategory?.(rec.categoryLink!)}
                      className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
                    >
                      {word}
                    </button>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pension & Achievements - Fully Optimized */}
      <motion.section variants={cardVariants} className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Pension Plan & Achievements</h3>
          <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
            Tier: {tier.tier}
          </div>
        </div>

        {/* Progress bar moved here to associate visually with the Investor Tier */}
        <div className="mt-3">
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div className="bg-indigo-600 h-3" style={{ width: `${Math.round(portfolio.totalTimeCoins % 100)}%` }} />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600">Pension Credits Earned: <span className="font-semibold text-gray-800">{portfolio.pensionCredits}</span></div>
          <p className="text-xs text-gray-500 mt-1">Every 100 Time Coins grants 1 VIP Credit. Accumulate credits for premium service privileges and priority access.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {achievements.map((ach, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col justify-between items-center">
              <div className={`text-3xl mb-2 ${index === 0 ? 'text-indigo-500' : 'text-yellow-400'}`} style={{ animation: index === 0 ? 'pulse 2s infinite' : undefined }}>🏦</div>
              <h3 className="font-semibold text-gray-800 text-sm">{ach.name}</h3>
              <p className="text-xs text-gray-500 flex-grow">{ach.description}</p>
              {/* Simulated Unlocked Badge */}
              {index === 0 && <span className="mt-2 text-xs font-semibold text-green-600">UNLOCKED</span>}
            </motion.div>
          ))}

          <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col justify-between items-center">
            <div className="text-3xl mb-2 text-green-400">🏆</div>
            <h3 className="font-semibold text-gray-800 text-sm">{tier.tier} Tier</h3>
            <p className="text-xs text-gray-500 flex-grow">Based on {Math.round(portfolio.totalTimeCoins)} Time Coins</p>
          </motion.div>
        </div>
      </motion.section>

    </motion.div>
  );
}
