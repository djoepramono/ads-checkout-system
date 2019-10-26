import { CartItem } from "./models/cartItem";
import { Ad } from "./models/ad";
import { PricingRule } from "./models/pricingRule";
import { calculateCartItem } from "./services/cartService";

export const Checkout = class Checkout {
  private cart: CartItem[];
  private pricingRules: PricingRule[];

  public constructor(pricingRules: PricingRule[]) {
    this.cart = [];
    this.pricingRules = pricingRules;
  };

  public add = (ad: Ad): void => {
    const cartItem: CartItem = {ad, count: 1, retailPrice:199 }
    this.cart.push(cartItem);
  };

  public total = (): number => {
    return this.cart
      .map(ci => calculateCartItem(this.pricingRules, ci))
      .reduce((accumulator, current) => { return accumulator + current}, 0);
  }
};