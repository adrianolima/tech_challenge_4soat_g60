import { ProductPresenter } from "./presenters/product.presenter";
import { Product } from "../domain/entities/product";
import { Category } from "../domain/value_object/category";
import { ProductGateway } from "../gateways/repositories/products";
import { DbConnection } from "../interfaces/dbconnection";
import { ProductUseCases } from "../domain/usecases/product";

export class ProductController {
  static async getAllProducts(dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const allProducts = await ProductUseCases.list(productGateway);

    const adapted = ProductPresenter.adaptProducts(allProducts);
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

    const adapted = ProductPresenter.adaptProducts(allProductsByCategory);
    return adapted;
  }

  static async createProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const newProduct = await ProductUseCases.save(product, productGateway);

    const adapted = ProductPresenter.adaptProduct(newProduct);
    return adapted;
  }

  static async updateProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);

    const updatedProduct = await ProductUseCases.update(
      product,
      productGateway
    );

    const adapted = ProductPresenter.adaptProduct(updatedProduct);
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

