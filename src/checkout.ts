import { CartItem } from "./models/cartItem";
import { Ad, Advertisement, getAllAds } from "./models/ad";
import { PricingRule } from "./models/pricingRule";
import { calculateCartItem } from "./services/cartService";

interface Customer {
  name: string;
}

export const Checkout = class Checkout {
  private cart: CartItem[] = [];
  availableAds: Advertisement[] = [];
  private pricingRules: PricingRule[] = [];

  public constructor(customer: Customer, pricingRules: PricingRule[]) {
    this.cart = [];
    this.pricingRules = pricingRules;
  };

  // constructor cannot be async, so this method is needed as a replacement
  // remember to await this in the usage before everything else
  public async prepare(): Promise<void> {
    this.availableAds = await getAllAds();
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