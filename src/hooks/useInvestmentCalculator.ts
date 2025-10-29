// Investment calculator utilities and types
export type ServiceRecord = {
  serviceName: string;
  category: string;
  duration: number; // hours
  cost: number;
  date?: string;
};

export type PortfolioResult = {
  totalTimeCoins: number;
  healthCoins: number;
  relationshipCoins: number;
  selfCoins: number;
  lifeEnergyGained: number; // New metric: Total Time Coins / 10
  estimatedFutureValue: number; // in $
  motivationalMessage: string; // New: qualitative statement based on allocation
  allocationValue: { portfolio: string; coins: number; value: number; multiplier: number }[];
  pensionCredits: number;
};

export const BASE_VALUE_PER_COIN = 50; // $50 per Time Coin
export const MULTIPLIERS = {
  health: 1.2,
  relationship: 1.5,
  self: 2.0,
};

export const CATEGORY_ALLOCATION: Record<string, { health: number; relationship: number; self: number }> = {
  homeCleaning: { health: 0.5, relationship: 0.5, self: 0 },
  errandService: { health: 0, relationship: 0.3, self: 0.7 },
  applianceRepair: { health: 0.6, relationship: 0.0, self: 0.4 },
  gardening: { health: 0.7, relationship: 0.3, self: 0 },
  learning: { health: 0, relationship: 0, self: 1.0 },
  default: { health: 0.33, relationship: 0.33, self: 0.34 },
};

// Core calculation function
export function calculateInvestmentPortfolio(history: ServiceRecord[]): PortfolioResult {
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

  // New metric: Life Energy Gained
  const lifeEnergyGained = Math.round(totalTimeCoins / 10);

  // Compute dollar values using hours so totals remain identical
  const healthValue = healthHours * MULTIPLIERS.health * BASE_VALUE_PER_COIN;
  const relationshipValue = relationshipHours * MULTIPLIERS.relationship * BASE_VALUE_PER_COIN;
  const selfValue = selfHours * MULTIPLIERS.self * BASE_VALUE_PER_COIN;

  const estimatedFutureValue = Math.round((healthValue + relationshipValue + selfValue) * 100) / 100;

  // Determine dominant portfolio for motivational message
  let motivationalMessage = "You're building a beautifully balanced future across health, relationships, and personal growth.";
  const maxCoins = Math.max(healthCoins, relationshipCoins, selfCoins);

  if (maxCoins > 0) { // Only if there's actual investment
    if (healthCoins === maxCoins) {
      motivationalMessage = "You're investing in a healthier, more energetic future.";
    } else if (relationshipCoins === maxCoins) {
      motivationalMessage = "You're building a future rich in connection and shared moments.";
    } else if (selfCoins === maxCoins) {
      motivationalMessage = "You're fueling future growth, skills, and opportunities.";
    }
  }

  const allocationValue = [
    { portfolio: 'Vitality & Well-being', coins: Math.round(healthCoins * 100) / 100, value: Math.round(healthValue * 100) / 100, multiplier: MULTIPLIERS.health },
    { portfolio: 'Connection & Family', coins: Math.round(relationshipCoins * 100) / 100, value: Math.round(relationshipValue * 100) / 100, multiplier: MULTIPLIERS.relationship },
    { portfolio: 'Growth & Skills', coins: Math.round(selfCoins * 100) / 100, value: Math.round(selfValue * 100) / 100, multiplier: MULTIPLIERS.self },
  ];

  // Pension credits: 100 Time Coins = 1 credit
  const pensionCredits = Math.floor(totalTimeCoins * 0.01);

  return { totalTimeCoins, healthCoins, relationshipCoins, selfCoins, lifeEnergyGained, estimatedFutureValue, motivationalMessage, allocationValue, pensionCredits };
}

export function generateRecommendations(history: ServiceRecord[]) {
  const counts: Record<string, number> = {};
  for (const h of history) counts[h.category] = (counts[h.category] || 0) + (h.duration || 0);
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  const advice: { message: string; categoryLink?: string }[] = [];

  if (!top) {
    advice.push({ message: "No data yet — start investing time with services to get personalized advice." });
    return advice;
  }

  const [topCat] = top;

  if (topCat === 'homeCleaning' || topCat === 'gardening') {
    advice.push({ message: "You're focusing on household efficiency. To boost your Growth & Skills, why not book  a learning course?", categoryLink: "learning" });
  }
  if (topCat === 'errandService') {
    advice.push({ message: "Strong tilt to efficiency; diversify into 'Connection & Family' — schedule a family activity that's 'time well spent'.", categoryLink: "relationship" }); // Assuming 'relationship' maps to a service category
  }
  if (topCat === 'learning') {
    advice.push({ message: "Great focus on Growth & Skills — consider deeper specializations to compound returns.", categoryLink: "learning" });
  }
  if (advice.length === 0) {
    advice.push({ message: "We see varied investments — keep diversifying to balance Vitality & Well-being, Connection & Family, and Growth & Skills portfolios." });
  }
  return advice;
}

export function computeTier(totalCoins: number) {
  // thresholds scaled by 10 because coins are scaled (1 hour = 10 coins)
  if (totalCoins >= 500) return { tier: 'Gold Investor', color: 'text-yellow-500' };
  if (totalCoins >= 200) return { tier: 'Silver Investor', color: 'text-gray-400' };
  return { tier: 'Bronze Investor', color: 'text-amber-700' };
}
