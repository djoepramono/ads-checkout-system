import { Checkout } from "./checkout";
import { PricingRule } from "./models/pricingRule";
import { Ad } from "./models/ad";


const bundleStandoutAds = { id: 1, ad: Ad.STANDOUT, deal: { getCount: 5, forCount: 4 }};
const discountedPremiumAds = { id: 2, ad: Ad.PREMIUM, deal: { discountedPrice: 389.99 }};
const myerPricingRules: PricingRule[] = [ bundleStandoutAds, discountedPremiumAds ];

const checkout = new Checkout(myerPricingRules);

checkout.add(Ad.PREMIUM);

console.log(checkout.total());