import { Product } from "../entities/product";
import { Category } from "../entities/valueObjects/category";
import { ProductGateway } from "../gateways/products";
import { DbConnection } from "../interfaces/dbconnection";
import { ProductUseCases } from "../usecases/product";

export class ProductController {
  static async getAllProducts(dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const allProducts = await ProductUseCases.list(productGateway);

    return allProducts;
  }

  static async getAllProductsByCategory(
    category: Category,
    dbConnection: DbConnection
  ) {
    const productGateway = new ProductGateway(dbConnection);
    const allProductsByCategory = await ProductUseCases.listByCategory(
      category,
      productGateway
    );

    return allProductsByCategory;
  }

  static async createProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const dbResult = ProductUseCases.save(product, productGateway);

    return dbResult;
  }

  static async updateProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);

    const updatedProduct = await ProductUseCases.update(
      product,
      productGateway
    );

    return updatedProduct;
  }

  static async deleteProduct(productId: number, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const deletedProduct = await ProductUseCases.delete(
      productId,
      productGateway
    );

    return deletedProduct;
  }
}
