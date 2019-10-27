import { PricingRule } from '../models/pricingRule';
import { Ad, Advertisement } from './adService';
import { DiscountedAdvertisement, GetXForY } from '../models/deal';
import { CartItem } from '../models/cartItem';
import { calculateGetXForYCost } from './dealService';
import { calculateCartItem, addItemToCart, getCartTotalCost, CartItemWithPrice } from './cartService';

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
    const item: CartItemWithPrice = {
      ad: Ad.CLASSIC,
      count: 5,
      basePrice: 18
    }

    it('takes the last one', () => {
      const result = calculateCartItem(pricingRules, item);
      expect(result).toStrictEqual(calculateGetXForYCost(secondDeal.deal, item.count, item.basePrice));
    });
  });

  describe('when the ad does not match the pricing rules', () => {
    const item: CartItemWithPrice = {
      ad: Ad.PREMIUM,
      count: 5,
      basePrice: 28
    }

    it('calculate based on the default price', () => {
      const result = calculateCartItem(pricingRules, item);
      expect(result).toStrictEqual(item.count * item.basePrice);
    });
  });

});

describe('addItemToCart', () => {
  it('adds item to an empty cart', () => {
    const existingCart: CartItem[] = [];
    const newAd: Ad = Ad.PREMIUM;
    const expectedResult: CartItem[] = [{ ad: Ad.PREMIUM, count: 1 }];

    const result: CartItem[] = addItemToCart(newAd, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });

  it('adds new item to a cart', () => {
    const existingCart: CartItem[] = [{ ad: Ad.PREMIUM, count: 1 }];
    const newAd: Ad = Ad.STANDOUT;
    const expectedResult: CartItem[] = [
      { ad: Ad.PREMIUM, count: 1 },
      { ad: Ad.STANDOUT, count: 1 }
    ];

    const result: CartItem[] = addItemToCart(newAd, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });

  it('increments the count of exiting item in a cart', () => {
    const existingCart: CartItem[] = [{ ad: Ad.PREMIUM, count: 8 }];
    const newAd: Ad = Ad.PREMIUM;
    const expectedResult: CartItem[] = [
      { ad: Ad.PREMIUM, count: 9 }
    ];

    const result: CartItem[] = addItemToCart(newAd, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });
});

describe('getCartTotalCost', () => {
  it('calculates the total cost based on the pricing rule', () => {
    const cart: CartItem[] = [
      { ad: Ad.CLASSIC, count: 1 },
      { ad: Ad.STANDOUT, count: 1 }
    ];

    const availableAds: Advertisement[] = [
      { ad: Ad.CLASSIC, name: 'Classic Ad', description: 'Test', retailPrice: 7 },
      { ad: Ad.STANDOUT, name: 'Classic Ad', description: 'Test', retailPrice: 8 }
    ];

    const pricingRules: PricingRule[] = [
      { id: 1, ad: Ad.CLASSIC, deal: { discountedPrice : 4 }}
    ];

    const result = getCartTotalCost(cart, availableAds, pricingRules);
    expect(result).toStrictEqual(12);
  });
});