import {ClientResponse} from "../presenter/client";
import {PaymentResponse} from "../presenter/payment";
import {OrderItemResponse} from "./order-item.response.model";

export type OrderResponse = {
  client?: ClientResponse;
  payment?: PaymentResponse;
  items: OrderItemResponse[];
  id: number;
  status: string;
  total: number;
  created_at?: Date;
  updated_at?: Date;
};