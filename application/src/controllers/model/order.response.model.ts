import {OrderItemResponse} from "./order-item.response.model";
import {ClientResponse} from "./client.response.model";
import {PaymentResponse} from "./payment.response.model";

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