import { GetXForY, DiscountedAdvertisement } from '../models/deal';
import { calculateGetXForYCost, calculateDiscountedAdvertisementCost, numberToMoney } from './dealService';

describe('calculateDiscountedAdvertisementCost', () => {
  it('calculate cost correctly', () => {
    const pricingRule: DiscountedAdvertisement = {
      discountedPrice: 29.99,
    };

    const numberOfItemInTheCart = 4;
    const cost = calculateDiscountedAdvertisementCost(pricingRule, numberOfItemInTheCart);
    expect(cost).toStrictEqual(119.96);
  });
});

describe('calculateGetXForYCost', () => {
  describe('when pricing rule applies to all items in the cart', () => {
    it('calculate cost correctly with round price', () => {
      const pricingRule: GetXForY = {
        getCount: 5,
        forCount: 4,
      };

      const numberOfItemsInTheCart = 10;
      const retailPrice = 100;

      const cost = calculateGetXForYCost(pricingRule, numberOfItemsInTheCart, retailPrice);
      expect(cost).toStrictEqual(800);
    });

    it('calculate cost correctly with not round price', () => {
      const pricingRule: GetXForY = {
        getCount: 3,
        forCount: 1,
      };

      const numberOfItemsInTheCart = 9;
      const retailPrice = 0.3;

      const cost = calculateGetXForYCost(pricingRule, numberOfItemsInTheCart, retailPrice);
      expect(cost).toStrictEqual(0.9);
    });
  });

  describe('when pricing rule applies not to all items in the cart', () => {
    it('calculate cost correctly with pricing rules', () => {
      const pricingRule: GetXForY = {
        getCount: 3,
        forCount: 2,
      };

      const numberOfItemsInTheCart = 10;
      const retailPrice = 100;

      const cost = calculateGetXForYCost(pricingRule, numberOfItemsInTheCart, retailPrice);
      expect(cost).toStrictEqual(700);
    });

    it('calculate cost correctly with not round price', () => {
      const pricingRule: GetXForY = {
        getCount: 7,
        forCount: 4,
      };

      const numberOfItemsInTheCart = 12;
      const retailPrice = 99.95;

      const cost = calculateGetXForYCost(pricingRule, numberOfItemsInTheCart, retailPrice);
      expect(cost).toStrictEqual(899.55);
    });
  });
});


// I am not a math expert, but at least I'm aware of this issue
describe('numberToMoney', () => {
  it('handles 1.005', () => {
    const result = numberToMoney(1.005);
    expect(result).toStrictEqual('1.00');
  });
});
