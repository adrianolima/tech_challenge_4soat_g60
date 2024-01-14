import { Order } from "../entities/order";
import { OrderStatus } from "../entities/valueObjects/orderStatus";
import { IOrderGateway } from "../interfaces/gateways";

export class OrderQueueUseCases {
  public getPendingOrders(orderGateway: IOrderGateway): Promise<Array<Order>> {
    return orderGateway.getOrderByStatus(OrderStatus.AGUARDANDO_PREPARO);
  }

  public getPreparingOrders(
    orderGateway: IOrderGateway
  ): Promise<Array<Order>> {
    return orderGateway.getOrderByStatus(OrderStatus.EM_PREPARACAO);
  }

  public getPreparedOrders(orderGateway: IOrderGateway): Promise<Array<Order>> {
    return orderGateway.getOrderByStatus(OrderStatus.PRONTO);
  }
}
