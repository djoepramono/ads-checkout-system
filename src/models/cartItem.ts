import { Ad } from '../models';
import { runValidations, Validate } from '@codeallnight/falidator';
import { Validated, Invalid } from '@codeallnight/falidator/dist/models';

export interface CartItem {
  ad: Ad;
  count: number;
  retailPrice: number;
};

const hasValidAd: Validate<any> = (input: any): Invalid | {} => {
  return (input.ad in Ad) ? input : new Invalid('cannot find valid ad property e.g. CLASSIC / STANDOUT/ PREMIUM');
};

const hasValidCount = (input: any): Invalid | {} => {
  return (typeof input.count == 'number') ? input : new Invalid('cannot find numeric count property');
};

const hasValidRetailPrice = (input: any): Invalid | {} => {
  return (typeof input.count == 'number') ? input : new Invalid('cannot find numeric retailPrice property');
};

export const validateCartItem = (input: any): Validated<any> => {
  return runValidations([hasValidAd, hasValidCount, hasValidRetailPrice], input);
};
