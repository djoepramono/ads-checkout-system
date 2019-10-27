import { Checkout } from './checkout';
import { Advertisement, Ad } from './services/adService';
import { PricingRule } from './models/pricingRule';

describe('checkout', () => {

  it('mutates its state and calculate cost just fine', async () => {
    const availableAds: Advertisement[] = [
      { ad: Ad.CLASSIC, name: 'Classic Ad', description: 'Test', retailPrice: 7 },
      { ad: Ad.STANDOUT, name: 'Classic Ad', description: 'Test', retailPrice: 8 },
    ];

    const pricingRules: PricingRule[] = [
      { id: 1, ad: Ad.CLASSIC, deal: { discountedPrice : 4 }},
      { id: 1, ad: Ad.STANDOUT, deal: { getCount: 2, forCount: 1 }},
    ];

    const customer = {
      name: 'Test Candidate',
    };
    const c = new Checkout(customer, availableAds, pricingRules);

    c.add(Ad.CLASSIC);
    c.add(Ad.CLASSIC);
    c.add(Ad.STANDOUT);
    c.add(Ad.STANDOUT);
    c.add(Ad.STANDOUT);
    const result = c.total();

    expect(result).toStrictEqual('24.00');
  });

  describe('while put against test scenarios', () => {

    const availableAds: Advertisement[] = [
      {
        ad: Ad.CLASSIC,
        name: 'Classic Ad',
        description: 'Offers the most basic level of advertisement',
        retailPrice: 269.99,
      },
      {
        ad: Ad.STANDOUT,
        name: 'Stand out Ad',
        description: 'Allows advertisers to use a company logo and use a longer presentation text',
        retailPrice: 322.99,
      },
      {
        ad: Ad.PREMIUM,
        name: 'Premium Ad',
        description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
        retailPrice: 394.99,
      },
    ];

    it('resolves the total cost for default customer', () => {

      const pricingRules: PricingRule[] = [];

      const customer = {
        name: 'default',
      };
      const c = new Checkout(customer, availableAds, pricingRules);

      c.add(Ad.CLASSIC);
      c.add(Ad.STANDOUT);
      c.add(Ad.PREMIUM);
      const result = c.total();

      expect(result).toStrictEqual('987.97');

    });

    it('resolves the total cost for Axil', () => {

      const pricingRules: PricingRule[] = [
        { id: 1, ad: Ad.STANDOUT, deal: { discountedPrice : 299.99 }},
      ];

      const customer = {
        name: 'Axil Coffee Roaster',
      };
      const c = new Checkout(customer, availableAds, pricingRules);

      c.add(Ad.STANDOUT);
      c.add(Ad.STANDOUT);
      c.add(Ad.STANDOUT);
      c.add(Ad.PREMIUM);
      const result = c.total();

      expect(result).toStrictEqual('1294.96');

    });

    it('resolves the total cost for SecondBite', () => {

      const pricingRules: PricingRule[] = [
        { id: 1, ad: Ad.CLASSIC, deal: { getCount: 3, forCount: 2 }},
      ];

      const customer = {
        name: 'SecondBite',
      };
      const c = new Checkout(customer, availableAds, pricingRules);

      c.add(Ad.CLASSIC);
      c.add(Ad.CLASSIC);
      c.add(Ad.CLASSIC);
      c.add(Ad.PREMIUM);
      const result = c.total();

      expect(result).toStrictEqual('934.97');

    });
  });
});
