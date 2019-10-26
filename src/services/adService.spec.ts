import { getAdPriceFromState, Ad, Advertisement } from "./adService";

describe('getAdPriceFromState', () => {
  it('gets the first available price', () => {
    const ad = Ad.PREMIUM;
    const availableAds: Advertisement[] = [
      { ad: Ad.PREMIUM, name: 'Premium Level', description: 'Best in class with all known feature', retailPrice: 1000 },
      { ad: Ad.PREMIUM, name: 'Premium Level', description: 'Accidentally entered again', retailPrice: 999 }
    ];

    const result = getAdPriceFromState(ad, availableAds);
    expect(result).toStrictEqual(1000);
  });
});