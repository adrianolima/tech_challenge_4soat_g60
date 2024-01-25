import { Order } from "../../domain/entities/order";
import OrderModel from "../model/order.model";
import ClientModelMapper from "./client.mapper";
import OrderItemModelMapper from "./order_item.mapper";
import PaymentModelMapper from "./payment.mapper";

export default class OrderModelMapper {
  static map(d: OrderModel): Order {
    return Order.New(
      d.id,
      d.items.map(OrderItemModelMapper.map),

      d.total.toNumber(),
      d.status,
      !d.client ? null : ClientModelMapper.map(d.client),
      !d.payment ? null : PaymentModelMapper.map(d.payment),
      d.created_at,
      d.updated_at
    );
  }
}
