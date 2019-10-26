import { applyPricingRulesToACartItem, PricingRule } from './pricingRule';
import { Ad, DiscountedAdvertisement, GetXForY } from './models';
import { CartItem } from './cartItem';
import { calculateGetXForYCost } from './calculate';

describe('applyPricingRulesToACartItem', () => {

  const discountedDeal: DiscountedAdvertisement = {
    discountedPrice: 10
  };

  const bundleDeal: GetXForY = {
    getCount: 4,
    forCount: 3
  }

  const firstDeal = { id: 1, ad: Ad.CLASSIC, deal: discountedDeal };
    const secondDeal = { id: 2, ad: Ad.CLASSIC, deal: bundleDeal };
    const pricingRules: PricingRule[] = [ firstDeal, secondDeal ];

  describe('when the ad matches several pricing rules', () => {
    const item: CartItem = {
      ad: Ad.CLASSIC,
      count: 5,
      retailPrice: 15
    }

    it('takes the last one', () => {
      const result = applyPricingRulesToACartItem(pricingRules, item);
      expect(result).toStrictEqual(calculateGetXForYCost(secondDeal.deal, item.count, item.retailPrice));
    });
  });

  describe('when the ad does not match the pricing rules', () => {
    const item: CartItem = {
      ad: Ad.PREMIUM,
      count: 5,
      retailPrice: 25
    }

    it('calculate based on the default price', () => {
      const result = applyPricingRulesToACartItem(pricingRules, item);
      expect(result).toStrictEqual(item.count * item.retailPrice);
    });
  });

});