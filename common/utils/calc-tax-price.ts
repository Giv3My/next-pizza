import { TAX_PERCENT } from '../constants';

export const calcTaxPrice = (totalAmount: number) => {
  return Math.round((totalAmount * TAX_PERCENT) / 100);
};
