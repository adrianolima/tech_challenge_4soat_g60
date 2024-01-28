import { OrderPresenter } from "./presenters/order.presenter";
import { OrderGateway } from "../gateways/repositories/orders";
import { DbConnection } from "../interfaces/dbconnection";
import { OrderQueueUseCases } from "../domain/usecases/queue";

export class OrderQueueController {
  static async getOrdersWithStatusPending(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPendingOrders(orderQueueGateway);

    const adapted = OrderPresenter.adaptOrders(orders);
    return adapted;
  }

  static async getOrdersWithStatusPreparing(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPreparingOrders(
      orderQueueGateway
    );

    const adapted = OrderPresenter.adaptOrders(orders);
    return adapted;
  }

  static async getOrdersWithStatusPrepared(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPreparedOrders(
      orderQueueGateway
    );

    const adapted = OrderPresenter.adaptOrders(orders);
    return adapted;
  }
}

