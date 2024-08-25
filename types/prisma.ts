import type {
  Cart,
  CartItem,
  Category,
  Ingredient,
  Product,
  ProductItem,
  User,
} from '@prisma/client';

export interface ProductWithRelations extends Product {
  items: ProductItem[];
  ingredients: Ingredient[];
}

export interface CategoryWithRelations extends Category {
  products: ProductWithRelations[];
}

export interface CartItemWithRelations extends CartItem {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
}

export interface CartWithRelations extends Cart {
  items: CartItemWithRelations[];
}

export interface Me extends Pick<User, 'fullName' | 'email'> {}
