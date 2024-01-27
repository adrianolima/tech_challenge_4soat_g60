<<<<<<<< HEAD:application/src/HttpController/product.ts
import { ProductPresenter } from "./presenters/product.presenter";
import { Product } from "../domain/entities/product";
import { Category } from "../domain/value_object/category";
import { ProductGateway } from "../gateways/repositories/products";
import { DbConnection } from "../interfaces/dbconnection";
import { ProductUseCases } from "../domain/usecases/product";
========
import {Product} from "../domain/entities/product";
import {Category} from "../domain/value_object/category";
import {ProductGateway} from "../gateways/repositories/products";
import {DbConnection} from "../interfaces/dbconnection";
import {ProductUseCases} from "../domain/usecases/product";
import {ProductPresenter} from "./presenter/product.presenter";
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/product.controller.ts

export class ProductController {
  static async getAllProducts(dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const allProducts = await ProductUseCases.list(productGateway);

<<<<<<<< HEAD:application/src/HttpController/product.ts
    const adapted = ProductPresenter.adaptProducts(allProducts);
    return adapted;
========
    return ProductPresenter.mapList(allProducts);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/product.controller.ts
  }

  static async getAllProductsByCategory(category: Category, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const allProductsByCategory = await ProductUseCases.listByCategory(
      category,
      productGateway
    );

<<<<<<<< HEAD:application/src/HttpController/product.ts
    const adapted = ProductPresenter.adaptProducts(allProductsByCategory);
    return adapted;
========
    return ProductPresenter.mapList(allProductsByCategory);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/product.controller.ts
  }

  static async createProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    const newProduct = await ProductUseCases.save(product, productGateway);

<<<<<<<< HEAD:application/src/HttpController/product.ts
    const adapted = ProductPresenter.adaptProduct(newProduct);
    return adapted;
========
    return ProductPresenter.map(newProduct);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/product.controller.ts
  }

  static async updateProduct(product: Product, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);

    const updatedProduct = await ProductUseCases.update(
      product,
      productGateway
    );

<<<<<<<< HEAD:application/src/HttpController/product.ts
    const adapted = ProductPresenter.adaptProduct(updatedProduct);
    return adapted;
========
    return ProductPresenter.map(updatedProduct);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/product.controller.ts
  }

  static async deleteProduct(productId: number, dbConnection: DbConnection) {
    const productGateway = new ProductGateway(dbConnection);
    return await ProductUseCases.delete(
      productId,
      productGateway
    );
  }
}

