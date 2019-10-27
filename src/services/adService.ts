export enum Ad {
  CLASSIC, STANDOUT, PREMIUM
};

export interface Advertisement {
  ad: Ad;
  name: string;
  description: string;
  retailPrice: number;
};

// Assuming the available advertisements are unique, othewise get the first one
// I don't really like handling error with a try catch but in this scenario is okay because
// - there is no clear explanation of what should we do with the error
// - try catch makes the typing simpler depending on the team, it's can be more readable
export const getAdPriceFromSource = (ad: Ad, availableAdvertisements: Advertisement[]): number => {
  try {
    return availableAdvertisements.filter(a => { return a.ad == ad })[0].retailPrice;
  } catch (e) {
    throw new Error(`error: getAdPriceFromSource - ${e.message}`);
  }
};