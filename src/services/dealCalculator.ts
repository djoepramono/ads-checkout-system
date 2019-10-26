import { DiscountedAdvertisement, GetXForY } from "../models/deal";

export const calculateDiscountedAdvertisementCost = (deal: DiscountedAdvertisement, noOfItemsInTheCart: number): number => {
  return noOfItemsInTheCart * deal.discountedPrice;
};

export const calculateGetXForYCost = (deal: GetXForY, noOfItemsInTheCart: number, retailPrice: number): number => {
  const noOfItemWithRetailPrice = noOfItemsInTheCart % deal.getCount;
  const noOfItemWithDealPrice = Math.floor(noOfItemsInTheCart / deal.getCount) * deal.getCount;

  // Do the division last, and also always perform calculation with no floation points
  const dealPrice = deal.forCount * (retailPrice * 100) / deal.getCount / 100;
  return (noOfItemWithDealPrice * dealPrice) + (noOfItemWithRetailPrice * retailPrice);
}
