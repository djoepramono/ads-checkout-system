import { CartItem } from "./models/cartItem";
import { Ad, Advertisement, getAllAds, getAdPriceFromState } from "./services/adService";
import { PricingRule } from "./models/pricingRule";
import { calculateCartItem } from "./services/cartService";

interface Customer {
  name: string;
}

interface AppState {
  cart: CartItem[];
  availableAds: Advertisement[];
  pricingRules: PricingRule[];
}

export const Checkout = class Checkout {
  private state: AppState;

  public constructor(customer: Customer, pricingRules: PricingRule[]) {
    this.state = {
      cart: [],
      availableAds: [],
      pricingRules: pricingRules
    }
  };

  // constructor cannot be async, so this method is needed as a replacement
  // remember to await this in the usage before everything else
  public async build(): Promise<void> {
    this.state.availableAds = await getAllAds();
  };

  public add = (ad: Ad): void => {
    const cartItem: CartItem = {ad, count: 1, retailPrice: getAdPriceFromState(ad, this.state.availableAds) }
    this.state.cart.push(cartItem);
  };

  public total = (): number => {
    return this.state.cart
      .map(ci => calculateCartItem(this.state.pricingRules, ci))
      .reduce((accumulator, current) => { return accumulator + current}, 0);
  }
};