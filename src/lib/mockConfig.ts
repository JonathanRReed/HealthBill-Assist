/**
 * Centralized mock configuration for FairFlow demo
 * This file contains all mock data, business logic, and configuration
 * to make it easy to extend and maintain the demo.
 */

export interface MockConfig {
  // Eligibility criteria
  eligibility: {
    maxDaysSinceLastDeposit: number;
    maxNsfCount: number;
    maxVariabilityRatio: number;
  };
  
  // Limit calculation
  limits: {
    maxLimit: number;
    depositMultiplier: number;
    variabilityPenalty: number;
  };
  
  // Fee structure
  fees: {
    feePercentage: number;
    minFee: number;
    maxFee: number;
  };
  
  // Timing and UX
  timing: {
    minLoadingMs: number;
    maxLoadingMs: number;
    etaMinutes: number;
  };
  
  // Demo settings
  demo: {
    showDebugInfo: boolean;
    enableMetrics: boolean;
    mockDelayEnabled: boolean;
  };
}

export const MOCK_CONFIG: MockConfig = {
  eligibility: {
    maxDaysSinceLastDeposit: 21,
    maxNsfCount: 2,
    maxVariabilityRatio: 0.6,
  },
  
  limits: {
    maxLimit: 500,
    depositMultiplier: 0.5,
    variabilityPenalty: 0.25,
  },
  
  fees: {
    feePercentage: 0.01,
    minFee: 1,
    maxFee: 5,
  },
  
  timing: {
    minLoadingMs: 400,
    maxLoadingMs: 750,
    etaMinutes: 3,
  },
  
  demo: {
    showDebugInfo: process.env.NODE_ENV === 'development',
    enableMetrics: true,
    mockDelayEnabled: true,
  },
};

/**
 * Calculate APR-equivalent for transparency
 * This is for comparison purposes only - FairFlow uses flat fees
 */
export function calculateAprEquivalent(fee: number, amount: number, days: number = 14): number {
  if (amount <= 0) return 0;
  return Math.round((fee / amount) * (365 / days) * 100);
}

/**
 * Mock business logic for offer calculation
 */
export interface OfferCalculation {
  isEligible: boolean;
  limit: number;
  fee: number;
  aprEquivalent: number;
  reasons: string[];
  denialReasons?: string[];
}

export function calculateMockOffer(
  deposits: number[],
  nsfCount: number,
  requestedAmount?: number
): OfferCalculation {
  const config = MOCK_CONFIG;
  
  // Check basic eligibility
  const reasons: string[] = [];
  const denialReasons: string[] = [];
  
  // Recent deposit check
  const hasRecentDeposit = deposits.length > 0; // Simplified for demo
  if (hasRecentDeposit) {
    reasons.push("Steady deposits in last 30 days");
  } else {
    denialReasons.push("No recent deposits found");
  }
  
  // NSF check
  if (nsfCount <= config.eligibility.maxNsfCount) {
    reasons.push(`${nsfCount} NSF in 60 days`);
  } else {
    denialReasons.push(`Too many NSF incidents (${nsfCount})`);
  }
  
  // Income stability check
  const avgDeposit = deposits.reduce((sum, dep) => sum + dep, 0) / deposits.length;
  const variance = deposits.reduce((sum, dep) => sum + Math.pow(dep - avgDeposit, 2), 0) / deposits.length;
  const stdDev = Math.sqrt(variance);
  const variabilityRatio = stdDev / avgDeposit;
  
  if (variabilityRatio <= config.eligibility.maxVariabilityRatio) {
    reasons.push("Consistent income pattern");
  } else {
    reasons.push("Variable income pattern (reduced limit)");
  }
  
  const isEligible = denialReasons.length === 0;
  
  if (!isEligible) {
    return {
      isEligible: false,
      limit: 0,
      fee: 0,
      aprEquivalent: 0,
      reasons: [],
      denialReasons,
    };
  }
  
  // Calculate limit
  const baseLimit = Math.round(avgDeposit * config.limits.depositMultiplier);
  const variabilityAdjustment = variabilityRatio > config.eligibility.maxVariabilityRatio ? 
    config.limits.variabilityPenalty : 1;
  const adjustedLimit = Math.round(baseLimit * variabilityAdjustment);
  const finalLimit = Math.min(adjustedLimit, config.limits.maxLimit);
  
  // Calculate fee for the requested amount or max limit
  const amount = requestedAmount || finalLimit;
  const baseFee = amount * config.fees.feePercentage;
  const fee = Math.max(config.fees.minFee, Math.min(baseFee, config.fees.maxFee));
  
  const aprEquivalent = calculateAprEquivalent(fee, amount);
  
  return {
    isEligible: true,
    limit: finalLimit,
    fee: Math.round(fee),
    aprEquivalent,
    reasons,
  };
}

/**
 * Mock payday loan comparison data
 */
export function calculatePaydayComparison(amount: number, days: number = 14) {
  // Industry average payday loan fee: $15-17 per $100 borrowed
  const paydayFeeRate = 0.15; // 15% fee
  const paydayFee = amount * paydayFeeRate;
  const paydayTotal = amount + paydayFee;
  const paydayApr = calculateAprEquivalent(paydayFee, amount, days);
  
  return {
    amount,
    fee: Math.round(paydayFee),
    total: Math.round(paydayTotal),
    aprEquivalent: paydayApr,
  };
}

/**
 * Generate mock payment dates based on deposit patterns
 */
export function generatePaymentDates(deposits: number[], numPayments: number = 2): string[] {
  const today = new Date();
  const paymentDates: string[] = [];
  
  // Simple logic: assume biweekly deposits, schedule payments accordingly
  for (let i = 0; i < numPayments; i++) {
    const daysFromNow = 14 * (i + 1); // 2 weeks, 4 weeks, etc.
    const paymentDate = new Date(today.getTime() + daysFromNow * 24 * 60 * 60 * 1000);
    
    // Adjust to next Friday if weekend
    const dayOfWeek = paymentDate.getDay();
    if (dayOfWeek === 6) { // Saturday
      paymentDate.setDate(paymentDate.getDate() + 2);
    } else if (dayOfWeek === 0) { // Sunday
      paymentDate.setDate(paymentDate.getDate() + 5);
    }
    
    paymentDates.push(paymentDate.toISOString().split('T')[0]);
  }
  
  return paymentDates;
}

/**
 * Format payment dates for display
 */
export function formatPaymentDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) {
    return `Next ${date.toLocaleDateString('en-US', { weekday: 'long' })}`;
  }
  
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}