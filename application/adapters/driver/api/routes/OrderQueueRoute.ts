import {container} from "tsyringe";

import IAppRoute from "./IAppRoute";
import * as express from "express";
import OrderQueueService from "../../../../core/services/queueService";
import {mapOrderToResponse} from "../dto/order";

export default class OrderQueueRoute implements IAppRoute {
  private orderQueueService = container.resolve(OrderQueueService);
  private basePath = "/api/order/queue"


  setup(app: express.Application): void {

    app.route(`${this.basePath}/pending`).get(async (req, res) => {
      const orders = await this.orderQueueService.getPendingOrders()
      res.send(orders.map(mapOrderToResponse));
    });

    app.route(`${this.basePath}/preparing`).get(async (req, res) => {
      const orders = await this.orderQueueService.getPreparingOrders()
      res.send(orders.map(mapOrderToResponse));
    });

    app.route(`${this.basePath}/prepared`).get(async (req, res) => {
      const orders = await this.orderQueueService.getPreparedOrders()
      res.send(orders.map(mapOrderToResponse));
    });
  }
}