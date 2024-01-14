import { container } from "tsyringe";

import IAppRoute from "./IAppRoute";
import * as express from "express";
import { mapOrderToResponse } from "../dto/order";
import { DbConnection } from "../../interfaces/dbconnection";

export default class OrderQueueRoute implements IAppRoute {
  private dbConnection: DbConnection;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  private ROUTE_BASE_PATH = "/api/order/queue";

  setup(app: express.Application): void {
    app.route(`${this.ROUTE_BASE_PATH}/pending`).get(async (req, res) => {
      //TODO
      // const orders = await this.orderQueueService.getPendingOrders();
      // res.send(orders.map(mapOrderToResponse));
    });

    app.route(`${this.ROUTE_BASE_PATH}/preparing`).get(async (req, res) => {
      //TODO
      // const orders = await this.orderQueueService.getPreparingOrders();
      // res.send(orders.map(mapOrderToResponse));
    });

    app.route(`${this.ROUTE_BASE_PATH}/prepared`).get(async (req, res) => {
      //TODO
      // const orders = await this.orderQueueService.getPreparedOrders();
      // res.send(orders.map(mapOrderToResponse));
    });
  }
}
