import { Ad } from "./ad";
import { Deal } from "./deal";

export interface PricingRule {
  id: number;
  ad: Ad;
  deal: Deal;
};


