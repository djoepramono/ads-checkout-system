import { validateCartItem } from './cartItem';
import { Invalid } from '@codeallnight/falidator/dist/models';

describe('validateCartItem', () => {
  it('returns the cart item if validations pass', () => {
    const input = {
      ad: 'CLASSIC',
      count: 3,
      retailPrice: 100,
    };

    const result = validateCartItem(input);
    expect(result).toStrictEqual(input);
  });

  it('returns invalid if the ad type is not valid', () => {
    const input = {
      ad: 'EXCLUSIVE',
      count: 3,
      retailPrice: 100,
    };

    const result = validateCartItem(input);
    expect(result).toStrictEqual([new Invalid('cannot find valid ad property e.g. CLASSIC / STANDOUT/ PREMIUM')]);
  });

  it('returns invalid if there are missing properties', () => {
    const input = {
      name: 'It is going to fail',
    };

    const result = validateCartItem(input);
    expect(result).toStrictEqual([
      new Invalid('cannot find valid ad property e.g. CLASSIC / STANDOUT/ PREMIUM'),
      new Invalid('cannot find numeric count property'),
      new Invalid('cannot find numeric retailPrice property'),
    ]);
  });
});