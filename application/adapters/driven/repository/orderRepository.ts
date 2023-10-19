import {IOrderRepository} from "../../../core/ports/IOrderRepository";
import {Order} from "../../../core/entities/order";
import {OrderStatus} from "../../../core/valueObjects/orderStatus";

class OrderRepository implements IOrderRepository{
  getOrderBy(order: Order): Promise<string> {
    return Promise.resolve("");
  }

  getOrderByStatus(order: OrderStatus): Promise<Array<Order>> {
    return Promise.resolve(undefined);
  }

  getOrders(): Promise<Array<Order>> {
    return Promise.resolve(undefined);
  }

  save(order: Order): Promise<string> {
    return Promise.resolve("");
  }
  
}