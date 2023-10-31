import {Order} from "../entities/order";
import {OrderStatus} from "../valueObjects/orderStatus";

export interface IOrderRepository {
  getOrders(): Promise<Array<Order>>;

  save(order: Order): Promise<Order>;

  getOrderByID(orderID: number): Promise<Order | null>;

  getOrderByStatus(order: OrderStatus): Promise<Array<Order>>;
}
