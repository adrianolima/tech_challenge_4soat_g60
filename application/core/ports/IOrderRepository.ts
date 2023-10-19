import { Order } from "../entities/order";
import {OrderStatus} from "../valueObjects/orderStatus";

export interface IOrderRepository {
  getOrders(): Promise<Array<Order>>;
  save(order: Order): Promise<string>;
  getOrderBy(order: Order): Promise<string>;
  getOrderByStatus(order: OrderStatus): Promise<Array<Order>>;
}
