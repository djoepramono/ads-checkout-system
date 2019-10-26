import { Ad } from "./ad";
import { Deal, isDiscountedAdvertisement } from "./deal";
import { CartItem } from "./cartItem";
import { calculateDiscountedAdvertisementCost, calculateGetXForYCost } from "../services/dealCalculator";

export interface PricingRule {
  id: number;
  ad: Ad;
  deal: Deal;
};

export const applyPricingRulesToACartItem = (pricingRules: PricingRule[], item: CartItem): number => {
  const matchingPricingRules = pricingRules.filter(r => { return r.ad == item.ad});
  const noOfMatchingPricingRules = matchingPricingRules.length;

  let cost;

  if (noOfMatchingPricingRules > 0) {
    const thePricingRule = matchingPricingRules[noOfMatchingPricingRules - 1];
    if (isDiscountedAdvertisement(thePricingRule.deal)) {
      cost = calculateDiscountedAdvertisementCost(thePricingRule.deal, item.count);
    } else {
      cost = calculateGetXForYCost(thePricingRule.deal, item.count, item.retailPrice);
    }
  } else {
    cost = item.count * item.retailPrice;
  }

  return cost;
};

