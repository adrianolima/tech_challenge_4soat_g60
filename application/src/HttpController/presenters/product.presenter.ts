import { Product } from "../../domain/entities/product";

export type ProductResponse = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export const ProductPresenter = {
  adaptProducts: function (data: Product[]): ProductResponse[] {
    if (data === null) return null;

    let allData = data.map((item) => {
      return {
        id: item.getId(),
        name: item.getName(),
        description: item.getDescription(),
        category: item.getCategory(),
        price: item.getValueProduct(),
        active: item.getActive(),
        created_at: item.getCreatedAt(),
        updated_at: item.getUpdatedAt(),
      };
    });

    return allData;
  },

  adaptProduct: function (data: Product): ProductResponse {
    if (data === null) return null;

    return {
      id: data.getId(),
      name: data.getName(),
      description: data.getDescription(),
      category: data.getCategory(),
      price: data.getValueProduct(),
      active: data.getActive(),
      created_at: data.getCreatedAt(),
      updated_at: data.getUpdatedAt(),
    };
  },
};

