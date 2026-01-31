export interface Product {
  hasHappyHour: boolean;
  discount: number;
  id: number;
  isDestacado: string;
  name: string,
  description: string,
  price: number,
  categoryId: string,
  featured: string,
}
export type NewProduct = Omit<Product, "id">;

export interface nuevoProducto{
  name: string,
  description: string,
  price: number,
  featured: string,
  recommendedFor: string,
  discount: string,
  hasHappyHour: string,
  categoryId: string,
  restaurantId: number
}