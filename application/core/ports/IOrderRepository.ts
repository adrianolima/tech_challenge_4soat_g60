import { Order } from "../entities/order";

export interface IOrderRepository {
  getOrders(): Promise<Array<Order>>;
  save(order: Order): Promise<string>;
}
