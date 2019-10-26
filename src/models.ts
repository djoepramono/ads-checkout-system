export enum Ad {
  Classic = 'CLASSIC',
  StandOut = 'STANDOUT',
  Premium = 'PREMIUM'
};

export interface Advertisement {
  ad: Ad;
  description: string;
  retailPrice: number;
};

export interface CartItem {
  ad: Ad;
  count: number;
  retailPrice: number;
};


// move to Deal?
export interface DiscountedAdvertisement {
  discountedPrice: number;
};

export interface GetXForY {
  getCount: number;
  forCount: number;
};

export type Deal = DiscountedAdvertisement | GetXForY

export const isDiscountedAdvertisement = (deal: Deal): deal is DiscountedAdvertisement => {
  return (deal as DiscountedAdvertisement).discountedPrice !== undefined
};

export const isGetXForY = (deal: Deal): deal is GetXForY => {
  return (deal as GetXForY).getCount !== undefined;
};