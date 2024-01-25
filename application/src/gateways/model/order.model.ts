import { Prisma } from "@prisma/client";
import ClientModel from "./client.model";
import PaymentModel from "./payment.model";
import OrderItemModel from "./order_item.model";

export default interface OrderModel {
  client?: ClientModel;
  payment?: PaymentModel;
  items: OrderItemModel[];
  id: number;
  client_id: number;
  payment_id: number;
  status: string;
  total: Prisma.Decimal;
  created_at?: Date;
  updated_at?: Date;
}
