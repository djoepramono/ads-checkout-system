import { PricingRule } from '../models/pricingRule';
import { Ad } from './adService';
import { DiscountedAdvertisement, GetXForY } from '../models/deal';
import { CartItem } from '../models/cartItem';
import { calculateGetXForYCost } from './dealService';
import { calculateCartItem, addItemToCart } from './cartService';

describe('calculateCartItem', () => {

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
      const result = calculateCartItem(pricingRules, item);
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
      const result = calculateCartItem(pricingRules, item);
      expect(result).toStrictEqual(item.count * item.retailPrice);
    });
  });

});

describe('addItemToCart', () => {
  it('adds item to an empty cart', () => {
    const existingCart: CartItem[] = [];
    const newAd: Ad = Ad.PREMIUM;
    const expectedResult: CartItem[] = [{ad: Ad.PREMIUM, count: 1, retailPrice: 7}];

    const result: CartItem[] = addItemToCart(newAd, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });

  it('adds new item to a cart', () => {
    const existingCart: CartItem[] = [{ad: Ad.PREMIUM, count: 1, retailPrice: 7}];
    const newAd: Ad = Ad.STANDOUT;
    const expectedResult: CartItem[] = [
      {ad: Ad.PREMIUM, count: 1, retailPrice: 7},
      {ad: Ad.STANDOUT, count: 1, retailPrice: 7}
    ];

    const result: CartItem[] = addItemToCart(newAd, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });

  it('increments the count of exiting item in a cart', () => {
    const existingCart: CartItem[] = [{ad: Ad.PREMIUM, count: 8, retailPrice: 7}];
    const newAd: Ad = Ad.PREMIUM;
    const expectedResult: CartItem[] = [
      {ad: Ad.PREMIUM, count: 9, retailPrice: 7}
    ];

    const result: CartItem[] = addItemToCart(newAd, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });
});