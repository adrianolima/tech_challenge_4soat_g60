import { Product } from "../entities/product";
import { Category } from "../valueObjects/category";

export interface IProductRepository {
  getProductsByCategory(category: Category): Promise<Array<Product>>;
  getProductByIDs(ids: number[]): Promise<Array<Product>>;
  getProducts(): Promise<Array<Product>>;
  saveProduct(product: Product): Promise<Product>;
  updateProduct(product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}
 