import {Order} from "../../domain/entities/order";
import {PaymentMapper} from "../repositories/payments";
import {OrderItemMapper} from "../repositories/orders";
import OrderModel from "../model/order.model";
import {ClientModelMapper} from "./client.mapper";

export class OrderModelMapper {
  static map(d: OrderModel): Order {
    return Order.New(
      d.id,
      d.items.map(OrderItemMapper.map),

      d.total.toNumber(),
      d.status,
      !d.client ? null : ClientModelMapper.map(d.client),
      !d.payment ? null : PaymentMapper.map(d.payment),
      d.created_at,
      d.updated_at
    );
  }
}