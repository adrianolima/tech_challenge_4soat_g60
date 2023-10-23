import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../ports/IProductRepository";
import { Product } from "../entities/product";
import { Category } from "../valueObjects/category";


@injectable()
export class ProductsService {
  constructor(
    @inject("IProductRepository") private _productRepository: IProductRepository
  ) {}

  async list(): Promise<Array<Product>> {
    return await this._productRepository.getProducts();
  }

  async listByCategory(category : Category): Promise<Array<Product>> {
    return await this._productRepository.getProductsByCategory(category);
  }
}
