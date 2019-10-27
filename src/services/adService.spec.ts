import { getAdPriceFromSource, Ad, Advertisement } from './adService';

describe('getAdPriceFromSource', () => {
  it('gets the first available price', () => {
    const ad = Ad.PREMIUM;
    const availableAds: Advertisement[] = [
      { ad: Ad.PREMIUM, name: 'Premium Level', description: 'Best in class with all known feature', retailPrice: 1000 },
      { ad: Ad.PREMIUM, name: 'Premium Level', description: 'Accidentally entered again', retailPrice: 999 },
    ];

    const result = getAdPriceFromSource(ad, availableAds);
    expect(result).toStrictEqual(1000);
  });

  // I don't really like handling error cases with Exception, but since we don't know what we need to do with edge
  // cases, throwing Exception makes sense in this case
  it('throws an exception if cannot find the price', () => {
    const ad = Ad.CLASSIC;
    const availableAds: Advertisement[] = [
      { ad: Ad.PREMIUM, name: 'Premium Level', description: 'Best in class with all known feature', retailPrice: 1000 },
      { ad: Ad.STANDOUT, name: 'Standout Level', description: 'Accidentally entered again', retailPrice: 999 },
    ];
    expect(() => getAdPriceFromSource(ad, availableAds)).toThrowError('error: getAdPriceFromSource - Cannot read property \'retailPrice\' of undefined');
  });
});