import { applyPricingRulesToACartItem, PricingRule } from './pricingRule';
import { Ad, DiscountedAdvertisement, GetXForY, CartItem } from './models';
import { calculateGetXForYCost } from './calculate';

describe('applyPricingRulesToACartItem', () => {

  const discountedDeal: DiscountedAdvertisement = {
    discountedPrice: 10
  };

  const bundleDeal: GetXForY = {
    getCount: 4,
    forCount: 3
  }

  describe('when there is multiple matching pricing rules for the same ad type', () => {
    const firstDeal = { id: 1, ad: Ad.Classic, deal: discountedDeal };
    const secondDeal = { id: 2, ad: Ad.Classic, deal: bundleDeal };
    const pricingRules: PricingRule[] = [ firstDeal, secondDeal ];

    const item: CartItem = {
      ad: Ad.Classic,
      count: 5,
      retailPrice: 15
    }

    it('takes the last one', () => {
      const result = applyPricingRulesToACartItem(pricingRules, item);
      expect(result).toStrictEqual(calculateGetXForYCost(secondDeal.deal, item.count, item.retailPrice));
    });
  });

});