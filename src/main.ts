import { Checkout } from "./checkout";
import { Ad } from "./services/adService";
import { getAllAds, getPricingRulesForCustomer } from "./helper";

const run = async () => {

  const availableAds = await getAllAds();
  const pricingRules = await getPricingRulesForCustomer();
  const customer = { name: 'Myer'};

  // Constructor cannot be async and this is why we are using a factory pattern
  // where the params are already resolved before hand
  const checkout = new Checkout(customer, availableAds, pricingRules);

  checkout.add(Ad.STANDOUT);
  checkout.add(Ad.STANDOUT);
  console.log(checkout.total());
};

run();
