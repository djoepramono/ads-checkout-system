import { GetXForY, ThresholdSpecial } from '../models/deal';
import { calculateGetXForYCost, numberToMoney, calculateJoraSpecial } from './dealService';

describe('calculateGetXForYCost', () => {
  describe('when pricing rule applies to all items in the cart', () => {
    it('calculate cost correctly with round price', () => {
      const pricingRule: GetXForY = {
        type: 'GetXForY',
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
        type: 'GetXForY',
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
        type:'GetXForY',
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
        type: 'GetXForY',
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

describe('calculateJoraSpecial', () => {
  const deal: ThresholdSpecial = {
    type: 'JoraSpecial',
    discountedPrice: 4,
    threshold: 2,
  };

  const retailPrice = 5;

  it('should use the discounted price if equal to threshold', () => {
    const noOfItemInTheCart = 2;
    const result = calculateJoraSpecial(deal, noOfItemInTheCart, retailPrice);
    expect(result).toStrictEqual(8);
  });

  it('should use the discounted price if more than threshold', () => {
    const noOfItemInTheCart = 3;
    const result = calculateJoraSpecial(deal, noOfItemInTheCart, retailPrice);
    expect(result).toStrictEqual(12);
  });

  it('should use the retail price if less than threshold', () => {
    const noOfItemInTheCart = 1;
    const result = calculateJoraSpecial(deal, noOfItemInTheCart, retailPrice);
    expect(result).toStrictEqual(5);
  });

  it('should use the discounted price if threshold is zero', () => {

    const dealThresholdZero: ThresholdSpecial = {
      type: 'JoraSpecial',
      discountedPrice: 4,
      threshold: 0,
    };

    const noOfItemInTheCart = 3;
    const result = calculateJoraSpecial(dealThresholdZero, noOfItemInTheCart, retailPrice);
    expect(result).toStrictEqual(12);
  });
});