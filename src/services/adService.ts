export enum Ad {
  CLASSIC, STANDOUT, PREMIUM
};

export interface Advertisement {
  ad: Ad;
  name: string;
  description: string;
  retailPrice: number;
};

// Assuming that we get this from database or other API, thus the async
// Assuming that these ads would be unique
export const getAllAds = async (): Promise<Advertisement[]> => {
  return [
    {
      ad: Ad.CLASSIC,
      name: 'Classic Ad',
      description: 'Offers the most basic level of advertisement',
      retailPrice: 269.99
    },
    {
      ad: Ad.STANDOUT,
      name: 'Stand out Ad',
      description: 'Allows advertisers to use a company logo and use a longer presentation text',
      retailPrice: 322.99
    },
    {
      ad: Ad.PREMIUM,
      name: 'Premium Ad',
      description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
      retailPrice: 394.99
    }
  ];
}

// Assuming the available advertisements are unique
export const getAdPriceFromState = (ad: Ad, availableAdvertisements: Advertisement[]): number => {
  return availableAdvertisements.filter(a => { return a.ad == ad })[0].retailPrice;
};