export interface GetXForY {
  type: 'GetXForY';
  getCount: number;
  forCount: number;
};

export interface ThresholdSpecial {
  type: 'JoraSpecial';
  discountedPrice: number;
  threshold: number;
}

export type Deal = GetXForY | ThresholdSpecial;

export const isGetXForY = (deal: Deal): deal is GetXForY => {
  return (deal as GetXForY).getCount !== undefined;
};

export const isThresholdSpecial = (deal: Deal): deal is ThresholdSpecial => {
  return (deal as ThresholdSpecial).discountedPrice !== undefined && (deal as ThresholdSpecial).threshold !== undefined;
};
