export interface Invalid {
  message: string
}

export enum Ad {
  CLASSIC, STANDOUT, PREMIUM
};

export interface Advertisement {
  ad: Ad;
  description: string;
  retailPrice: number;
};
