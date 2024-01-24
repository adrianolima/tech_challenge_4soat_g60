import { Product } from "../../domain/entities/product";

export type ProductResponseDto = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export function mapProductToResponse(product: Product): ProductResponseDto {
  return {
    id: product.getId(),
    name: product.getName(),
    description: product.getDescription(),
    category: product.getCategory(),
    price: product.getValueProduct(),
    active: product.getActive(),
    created_at: product.getCreatedAt(),
    updated_at: product.getUpdatedAt(),
  };
}
