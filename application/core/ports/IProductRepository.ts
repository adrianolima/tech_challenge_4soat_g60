import { Product } from "../entities/product";
import { Category } from "../valueObjects/category";

export interface IProductRepository {
  getProductsByCategory(category: Category): Promise<Array<Product>>;
  getProducts(): Promise<Array<Product>>;
  saveProduct(product: Product): Promise<string>;
  updateProduct(product: Product): Promise<string>;
  deleteProduct(product: Product): Promise<string>;
}
