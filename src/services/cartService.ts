import { isDiscountedAdvertisement } from "../models/deal";
import { CartItem } from "../models/cartItem";
import { calculateDiscountedAdvertisementCost, calculateGetXForYCost } from "./dealService";
import { PricingRule } from "../models/pricingRule";
import { Ad, Advertisement, getAdPriceFromState } from "./adService";

export const calculateCartItem = (pricingRules: PricingRule[], item: CartItemWithPrice): number => {
  const matchingPricingRules = pricingRules.filter(r => { return r.ad == item.ad; });
  const noOfMatchingPricingRules = matchingPricingRules.length;

  let cost;
  if (noOfMatchingPricingRules > 0) {
    const thePricingRule = matchingPricingRules[noOfMatchingPricingRules - 1];
    if (isDiscountedAdvertisement(thePricingRule.deal)) {
      cost = calculateDiscountedAdvertisementCost(thePricingRule.deal, item.count);
      // console.info('info: calculate with DiscountedAdvertisement');
    }
    else {
      cost = calculateGetXForYCost(thePricingRule.deal, item.count, item.basePrice);
      // console.info('info: calculate with GetXForYCost');
    }
  }
  else {
    cost = item.count * item.basePrice;
    // console.info('info: calculate with retail price');
  }
  return cost;
};

// Using object.assign, needs polyfill if this end up in IE 11 or below
export const addItemToCart = (ad: Ad, cart: CartItem[]): CartItem[] => {
  if (cart.filter(ci => { return ci.ad == ad }).length == 0) {
    cart.push({ ad, count: 1 });
    return cart;
  } else {
    const firstMatchedCartItemIndex = cart.findIndex(ci => { return ci.ad == ad });
    const firstMatchedCartItem = cart[firstMatchedCartItemIndex];
    const updatedCartItem = {...firstMatchedCartItem, count: firstMatchedCartItem.count + 1}
    return Object.assign([...cart], {[firstMatchedCartItemIndex]: updatedCartItem});
  }
};

export interface CartItemWithPrice extends CartItem {
  basePrice: number;
};

const getAdPrice = (cartItem: CartItem, priceTable: Advertisement[]): CartItemWithPrice => {
  const price = getAdPriceFromState(cartItem.ad, priceTable);
  return {...cartItem, basePrice: price}
};

export const getCartTotalCost = (
  cart: CartItem[],
  availableAds: Advertisement[],
  pricingRules: PricingRule[]
): number => {
  return cart
    .map(ci => getAdPrice(ci, availableAds))
    .map(cip => calculateCartItem(pricingRules, cip))
    .reduce((accumulator, current) => { return accumulator + current}, 0);
};
