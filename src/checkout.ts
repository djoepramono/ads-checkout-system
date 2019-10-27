import { CartItem } from "./models/cartItem";
import { Ad, Advertisement } from "./services/adService";
import { PricingRule } from "./models/pricingRule";
import { addItemToCart, getCartTotalCost } from "./services/cartService";

interface Customer {
  name: string;
}

interface AppState {
  customer: Customer;
  cart: CartItem[];
  availableAds: Advertisement[];
  pricingRules: PricingRule[];
}

// Unlike the pseudocode, the constructor for Checkout needs pricingRules, availableAds, and customer
// constructor cannot be async thus the params needs to be resolved before hand
export const Checkout = class Checkout {
  private state: AppState;

  public constructor(customer: Customer, availableAds: Advertisement[], pricingRules: PricingRule[]) {
    this.state = {
      customer,
      cart: [],
      availableAds,
      pricingRules
    }
  };

  public add = (ad: Ad): void => {
    // const cartItem: CartItem = {ad, count: 1, retailPrice: getAdPriceFromState(ad, this.state.availableAds) }
    // this.state.cart.push(cartItem);
    this.state.cart = addItemToCart(ad, this.state.cart);
  };

  public total = (): string => {
    return getCartTotalCost(this.state.cart,
      this.state.availableAds,
      this.state.pricingRules
    );
  };
};