import "reflect-metadata";
import { Product } from "../entities/product";
import { Category } from "../entities/valueObjects/category";
import { IProductGateway } from "../interfaces/gateways";

export class ProductUseCases {
  async list(productGateway: IProductGateway): Promise<Array<Product>> {
    return await productGateway.getProducts();
  }

  async listByCategory(
    category: Category,
    productGateway: IProductGateway
  ): Promise<Array<Product>> {
    return await productGateway.getProductsByCategory(category);
  }

  async save(
    product: Product,
    productGateway: IProductGateway
  ): Promise<Product> {
    return await productGateway.saveProduct(product);
  }

  async update(
    product: Product,
    productGateway: IProductGateway
  ): Promise<Product> {
    return await productGateway.updateProduct(product);
  }

  async delete(id: number, productGateway: IProductGateway): Promise<void> {
    return await productGateway.deleteProduct(id);
  }
}
