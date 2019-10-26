import { isDiscountedAdvertisement } from "../models/deal";
import { CartItem } from "../models/cartItem";
import { calculateDiscountedAdvertisementCost, calculateGetXForYCost } from "./dealService";
import { PricingRule } from "../models/pricingRule";

export const calculateCartItem = (pricingRules: PricingRule[], item: CartItem): number => {
  const matchingPricingRules = pricingRules.filter(r => { return r.ad == item.ad; });
  const noOfMatchingPricingRules = matchingPricingRules.length;
  let cost;
  if (noOfMatchingPricingRules > 0) {
    const thePricingRule = matchingPricingRules[noOfMatchingPricingRules - 1];
    if (isDiscountedAdvertisement(thePricingRule.deal)) {
      cost = calculateDiscountedAdvertisementCost(thePricingRule.deal, item.count);
    }
    else {
      cost = calculateGetXForYCost(thePricingRule.deal, item.count, item.retailPrice);
    }
  }
  else {
    cost = item.count * item.retailPrice;
  }
  return cost;
};
