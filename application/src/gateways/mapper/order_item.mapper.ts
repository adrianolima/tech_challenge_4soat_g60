import {OrderItem} from "../../domain/entities/orderItem";
import {ProductMapper} from "../repositories/products";
import {OrderItemModel} from "../model/order_item.model";

export class OrderItemModelMapper {
  static map(d: OrderItemModel): OrderItem {
    return OrderItem.New(
      d.id,
      d.orderId,
      ProductMapper.map(d.product),
      d.quantity.toNumber(),
      d.price.toNumber(),
      d.total.toNumber()
    );
  }
}