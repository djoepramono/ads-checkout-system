export interface DiscountedAdvertisement {
  discountedPrice: number;
};
export interface GetXForY {
  getCount: number;
  forCount: number;
};

export interface JoraSpecial {
  discountedPrice: number;
  threshold: number;
}

export type Deal = DiscountedAdvertisement | GetXForY | JoraSpecial;

export const isDiscountedAdvertisement = (deal: Deal): deal is DiscountedAdvertisement => {
  return (deal as DiscountedAdvertisement).discountedPrice !== undefined;
};

export const isGetXForY = (deal: Deal): deal is GetXForY => {
  return (deal as GetXForY).getCount !== undefined;
};

export const isJoraSpecial = (deal: Deal): deal is JoraSpecial => {
  return (deal as JoraSpecial).discountedPrice !== undefined && (deal as JoraSpecial).threshold !== undefined;
};
