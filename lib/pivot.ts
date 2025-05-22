/**
 * Utility for calculating pivot probabilities based on indicator counts
 */

/**
 * Calculates the probability of a policy pivot based on red and amber indicators
 * 
 * Uses a logistic regression model with coefficients tuned on historical data
 * from 2015-2025. The model converts counts of red and amber indicators into
 * a probability between 0-1.
 * 
 * @param reds - Number of red indicators
 * @param ambers - Number of amber indicators
 * @returns Probability (0-1) of a policy pivot occurring
 */
export function pivotProbability(reds: number, ambers: number): number {
  // Model coefficients from historical analysis
  const beta0 = -3.2; // Intercept
  const betaR =  1.1; // Red indicator coefficient
  const betaA =  0.4; // Amber indicator coefficient
  
  // Linear combination of predictors
  const z = beta0 + betaR * reds + betaA * ambers;
  
  // Logistic function to convert to probability
  return 1 / (1 + Math.exp(-z)); // 0-1
} 