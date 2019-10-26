import { Ad } from "../services/adService";
import { Deal } from "./deal";

export interface PricingRule {
  id: number;
  ad: Ad;
  deal: Deal;
};


