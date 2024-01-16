import { ProductAdapter } from "../adapters/product";
import { Product } from "../entities/product";
import { Category } from "../entities/valueObjects/category";
import { ProductGateway } from "../gateways/products";
import { DbConnection } from "../interfaces/dbconnection";
import { ProductUseCases } from "../usecases/product";

export class ProductController {
  static async getAllProducts(dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const allProducts = await ProductUseCases.list(productGateway);

    const adapted = ProductAdapter.adaptProducts(allProducts);
    return adapted;
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

    const adapted = ProductAdapter.adaptProducts(allProductsByCategory);
    return adapted;
  }

  static async createProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const newProduct = await ProductUseCases.save(product, productGateway);

    const adapted = ProductAdapter.adaptProduct(newProduct);
    return adapted;
  }

  static async updateProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);

    const updatedProduct = await ProductUseCases.update(
      product,
      productGateway
    );

    const adapted = ProductAdapter.adaptProduct(updatedProduct);
    return adapted;
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
