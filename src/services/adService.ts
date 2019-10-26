export enum Ad {
  CLASSIC, STANDOUT, PREMIUM
};

export interface Advertisement {
  ad: Ad;
  name: string;
  description: string;
  retailPrice: number;
};

// Assuming the available advertisements are unique
export const getAdPriceFromState = (ad: Ad, availableAdvertisements: Advertisement[]): number => {
  return availableAdvertisements.filter(a => { return a.ad == ad })[0].retailPrice;
};