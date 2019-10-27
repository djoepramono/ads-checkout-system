import { Advertisement, Ad } from './services/adService';
import { PricingRule } from './models/pricingRule';

// In real application, these functions will get a real data from a data source

// Assuming that we get this from database or other API, thus the async
// Assuming that these ads would be unique
export const getAllAds = async (): Promise<Advertisement[]> => {
  return [
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
};

// Assuming that we get this from database or other API, thus the async
// Assuming that the pricing rules here are the only one applicable for a customer
export const getPricingRulesForCustomer = async (): Promise<PricingRule[]> => {
  return [
    { id: 1, ad: Ad.CLASSIC, deal: { getCount: 3, forCount: 2 }},
  ];
};