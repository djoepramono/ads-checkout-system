import { Ad, CartItem, Deal, isDiscountedAdvertisement } from "./models";
import { calculateDiscountedAdvertisementCost, calculateGetXForYCost } from "./calculate";

export interface PricingRule {
  id: number;
  ad: Ad;
  deal: Deal;
}

// Getting the pricing rule for Premium
const getThePricingRuleForAnAd = (rules: PricingRule[], ad: Ad): PricingRule => {
  const matchingPricingRules = rules.filter(r => { return r.ad == ad});
  return matchingPricingRules[matchingPricingRules.length - 1];
}

export const applyPricingRulesToACartItem = (pricingRules: PricingRule[], item: CartItem): number => {
  const thePricingRule = getThePricingRuleForAnAd(pricingRules, item.ad);

  let cost;
  if (isDiscountedAdvertisement(thePricingRule.deal)) {
    cost = calculateDiscountedAdvertisementCost(thePricingRule.deal, item.count);
  } else {
    cost = calculateGetXForYCost(thePricingRule.deal, item.count, item.retailPrice);
  }

  return cost;
};

