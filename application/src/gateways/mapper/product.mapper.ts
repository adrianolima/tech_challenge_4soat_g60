import {Product} from "../../domain/entities/product";
import {ProductData} from "../repositories/products";

export default class ProductMapper {
  static map(d: ProductData): Product {
    return Product.New(
      d.id,
      d.name,
      d.description,
      d.category,
      d.price.toNumber(),
      d.active,
      d.created_at,
      d.updated_at
    );
  }
}