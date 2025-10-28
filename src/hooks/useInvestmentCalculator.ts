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
  estimatedFutureValue: number; // in $
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
  // 1 hour = 10 Time Coins for display; dollar math uses hours so values stay identical
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

  // Compute dollar values using hours so totals remain identical
  const healthValue = healthHours * MULTIPLIERS.health * BASE_VALUE_PER_COIN;
  const relationshipValue = relationshipHours * MULTIPLIERS.relationship * BASE_VALUE_PER_COIN;
  const selfValue = selfHours * MULTIPLIERS.self * BASE_VALUE_PER_COIN;

  const estimatedFutureValue = Math.round((healthValue + relationshipValue + selfValue) * 100) / 100;

  const allocationValue = [
    { portfolio: 'Health Investment', coins: Math.round(healthCoins * 100) / 100, value: Math.round(healthValue * 100) / 100, multiplier: MULTIPLIERS.health },
    { portfolio: 'Relationship Investment', coins: Math.round(relationshipCoins * 100) / 100, value: Math.round(relationshipValue * 100) / 100, multiplier: MULTIPLIERS.relationship },
    { portfolio: 'Self Investment', coins: Math.round(selfCoins * 100) / 100, value: Math.round(selfValue * 100) / 100, multiplier: MULTIPLIERS.self },
  ];

  // Pension credits: 100 Time Coins = 1 credit
  const pensionCredits = Math.floor(totalTimeCoins * 0.01);

  return { totalTimeCoins, healthCoins, relationshipCoins, selfCoins, estimatedFutureValue, allocationValue, pensionCredits };
}

export function generateRecommendations(history: ServiceRecord[]) {
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

export function computeTier(totalCoins: number) {
  // thresholds scaled by 10 because coins are scaled (1 hour = 10 coins)
  if (totalCoins >= 500) return { tier: 'Gold Investor', color: 'text-yellow-500' };
  if (totalCoins >= 200) return { tier: 'Silver Investor', color: 'text-gray-400' };
  return { tier: 'Bronze Investor', color: 'text-amber-700' };
}
