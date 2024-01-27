<<<<<<<< HEAD:application/src/HttpController/queue.ts
import { OrderPresenter } from "./presenters/order.presenter";
import { OrderGateway } from "../gateways/repositories/orders";
import { DbConnection } from "../interfaces/dbconnection";
import { OrderQueueUseCases } from "../domain/usecases/queue";
========
import {OrderGateway} from "../gateways/repositories/orders";
import {DbConnection} from "../interfaces/dbconnection";
import {OrderQueueUseCases} from "../domain/usecases/queue";
import {OrderPresenter} from "./presenter/order.presenter";
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/queue.controller.ts

export class OrderQueueController {
  static async getOrdersWithStatusPending(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPendingOrders(orderQueueGateway);

<<<<<<<< HEAD:application/src/HttpController/queue.ts
    const adapted = OrderPresenter.adaptOrders(orders);
========
    const adapted = OrderPresenter.mapList(orders);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/queue.controller.ts
    return adapted;
  }

  static async getOrdersWithStatusPreparing(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPreparingOrders(
      orderQueueGateway
    );

<<<<<<<< HEAD:application/src/HttpController/queue.ts
    const adapted = OrderPresenter.adaptOrders(orders);
========
    const adapted = OrderPresenter.mapList(orders);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/queue.controller.ts
    return adapted;
  }

  static async getOrdersWithStatusPrepared(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPreparedOrders(
      orderQueueGateway
    );

<<<<<<<< HEAD:application/src/HttpController/queue.ts
    const adapted = OrderPresenter.adaptOrders(orders);
========
    const adapted = OrderPresenter.mapList(orders);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/queue.controller.ts
    return adapted;
  }

  // Aguardando validações de fila.
}

