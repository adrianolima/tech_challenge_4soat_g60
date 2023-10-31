import {container} from "tsyringe";

import IAppRoute from "./IAppRoute";
import * as express from "express";
import OrderQueueService from "../../../../core/services/queueService";

export default class OrderQueueRoute implements IAppRoute {
  private orderQueueService = container.resolve(OrderQueueService);
  private basePath = "/api/order/queue"


  setup(app: express.Application): void {

    app.route(`${this.basePath}/pending`).get(async (req, res) => {
      res.send({
        client: await this.orderQueueService.getPendingOrders(),
      });
    });

    app.route(`${this.basePath}/preparing`).get(async (req, res) => {
      res.send({
        client: await this.orderQueueService.getPreparingOrders(),
      });
    });

    app.route(`${this.basePath}/prepared`).get(async (req, res) => {
      res.send({
        client: await this.orderQueueService.getPreparedOrders(),
      });
    });
  }
}