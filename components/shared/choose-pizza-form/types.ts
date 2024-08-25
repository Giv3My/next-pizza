import { mapPizzaSize, mapPizzaType } from './data';

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
