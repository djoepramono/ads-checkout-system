import { Ad } from '../services/adService';
import { Deal } from './deal';

// IMHO, PricingRule shoud not have customer name
// The Pricing Rule set in the App state should be the one related to a particular customer.
// However I end up decide to simplify the test.
export interface PricingRule {
  id: number;
  ad: Ad;
  deal: Deal;
};
