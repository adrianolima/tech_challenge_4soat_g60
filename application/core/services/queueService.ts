import {Order} from "../entities/order";
import {inject, injectable} from "tsyringe";
import {IOrderRepository} from "../ports/IOrderRepository";
import {OrderStatus} from "../valueObjects/orderStatus";

/**
 * Service to control the orders preparation queue
 */
@injectable()
export default class OrderQueueService {

  constructor(
    @inject("IOrderRepository") private _orderRepository: IOrderRepository
  ) {
  }

  /**
   * List all orders with 'AGUARDANDO_PREPARO' status
   */
  public getPendingOrders(): Promise<Array<Order>> {
    return this._orderRepository.getOrderByStatus(OrderStatus.AGUARDANDO_PREPARO)
  }

  /**
   * List all orders with 'EM_PREPARACAO' status
   */
  public getPreparingOrders(): Promise<Array<Order>> {
    return this._orderRepository.getOrderByStatus(OrderStatus.EM_PREPARACAO)
  }

  /**
   * List all orders with 'PRONTO' status
   */
  public getPreparedOrders(): Promise<Array<Order>> {
    return this._orderRepository.getOrderByStatus(OrderStatus.PRONTO)
  }
}