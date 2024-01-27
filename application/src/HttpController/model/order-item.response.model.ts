import {ProductResponse} from "../presenter/product";

export type OrderItemResponse = {
  id: number;
  quantity: number;
  price: number;
  total: number;
  product: ProductResponse;
};
