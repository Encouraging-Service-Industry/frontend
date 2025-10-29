import { calculateInvestmentPortfolio, type ServiceRecord } from '../hooks/useInvestmentCalculator';

type Props = {
  onBack: () => void;
};

export default function MyAchievementsPage({ onBack }: Props) {
  // Demo service history (keeps calculations consistent with dashboard pages)
  const demoHistory: ServiceRecord[] = [
    { serviceName: 'Home Cleaning', category: 'homeCleaning', duration: 15, cost: 120, date: new Date().toISOString() },
    { serviceName: 'Errand Helper', category: 'errandService', duration: 8, cost: 60, date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Online Course', category: 'learning', duration: 6, cost: 200, date: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Appliance Repair', category: 'applianceRepair', duration: 4, cost: 80, date: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString() },
    { serviceName: 'Gardening', category: 'gardening', duration: 2, cost: 40, date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() },
  ];

  const portfolio = calculateInvestmentPortfolio(demoHistory);
  const totalCoins = Math.round(portfolio.totalTimeCoins);

  // Investment-themed badges
  const achievements = [
    {
      id: 'first-investor',
      name: 'First Investor',
      description: 'Made your first Time Coin investment.',
      icon: '🌱',
      unlocked: totalCoins > 0,
      progress: Math.min(totalCoins, 1),
      total: 1,
    },
    {
      id: 'consistent-investor',
      name: 'Consistent Investor',
      description: 'Built a habit of investing time regularly.',
      icon: '🔁',
      unlocked: totalCoins >= 50,
      progress: Math.min(totalCoins, 50),
      total: 50,
    },
    {
      id: 'portfolio-diversifier',
      name: 'Portfolio Diversifier',
      description: 'Invested across multiple portfolios (Health/Relationship/Self).',
      icon: '⚖️',
      unlocked: [portfolio.healthCoins, portfolio.relationshipCoins, portfolio.selfCoins].filter((v) => v > 0).length >= 2,
      progress: Math.round(((Math.min(3, [portfolio.healthCoins, portfolio.relationshipCoins, portfolio.selfCoins].filter((v) => v > 0).length)) / 3) * 100),
      total: 100,
    },
    {
      id: 'time-tycoon',
      name: 'Time Tycoon',
      description: 'Accumulated 200+ Time Coins — substantial long-term growth.',
      icon: '🏦',
      unlocked: totalCoins >= 200,
      progress: Math.min(totalCoins, 200),
      total: 200,
    },
  ];

  // Tiers
  const tiers = [
    { id: 'bronze', name: 'Bronze Investor', min: 0, max: 199, description: 'Getting started — building your Time Coin base.' },
    { id: 'silver', name: 'Silver Investor', min: 200, max: 499, description: 'Growing investments — compounding returns are visible.' },
    { id: 'gold', name: 'Gold Investor', min: 500, max: Infinity, description: 'Top-tier investor — strong, diversified portfolio.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-300">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Investment Achievements</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Badges</h2>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((badge) => (
            <div key={badge.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center">
              <span className="text-5xl mb-2">{badge.icon}</span>
              <h3 className="font-semibold text-gray-800 text-lg mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
              {badge.unlocked ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Unlocked</span>
              ) : (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">Progress: {badge.progress}/{badge.total}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Investor Tiers</h2>
        <div className="space-y-4">
          {tiers.map((tier) => {
            const unlocked = totalCoins >= tier.min;
            // Calculate progress percentage based on tier status
            let progressPct = 0;
            if (totalCoins >= tier.max) {
              // Completed this tier
              progressPct = 100;
            } else if (totalCoins >= tier.min) {
              // Currently in this tier - calculate actual progress
              progressPct = Math.round(((totalCoins - tier.min) / (tier.max - tier.min)) * 100);
            } 
            // Otherwise progressPct stays 0 for unreached tiers

            return (
              <div key={tier.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">{tier.name}</h3>
                  {unlocked && <span className="text-green-600 text-sm">Current</span>}
                </div>
                <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progressPct}%` }}></div>
                </div>
                {!unlocked && (
                  <p className="text-xs text-gray-500 mt-2">Need {tier.min - totalCoins} more Time Coins to reach this tier.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
