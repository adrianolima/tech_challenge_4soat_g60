import * as express from "express";

import IAppRoute from "./IAppRoute";
import { handleAPIError } from "../error/APIErrorHandler";
import { OrderItemRequest } from "../dto/order";
import { OrderStatus } from "../../domain/value_object/orderStatus";
import { DbConnection } from "../../interfaces/dbconnection";
import { OrderController } from "../../controllers/order";

export default class OrderRoute implements IAppRoute {
  private dbConnection: DbConnection;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  private ROUTE_BASE_PATH = "/api/orders";

  setup(app: express.Application): void {
    app.route(this.ROUTE_BASE_PATH).get(async (req, res) => {
      try {
        const orders = await OrderController.getAllOrders(this.dbConnection);

        res.status(200).send(orders);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH + "/orderned").get(async (req, res) => {
      try {
        const orders = await OrderController.getAllOrdersOrderned(
          this.dbConnection
        );

        res.status(200).send(orders);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.ROUTE_BASE_PATH}/:id`).get(async (req, res) => {
      try {
        const orderId = Number(req.params.id);

        const order = await OrderController.getOrderById(
          orderId,
          this.dbConnection
        );

        res.status(200).send(order);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app
      .route(`${this.ROUTE_BASE_PATH}/link/:orderId/client/:clientId`)
      .put(async (req, res) => {
        try {
          const orderId = Number(req.params.orderId);
          const clientId = Number(req.params.clientId);

          const order = await OrderController.linkClientToOrder(
            orderId,
            clientId,
            this.dbConnection
          );

          res.status(200).send(order);
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app
      .route(`${this.ROUTE_BASE_PATH}/:orderId/status`)
      .put(async (req, res) => {
        try {
          const orderId = Number(req.params.orderId);
          const orderStatus = new OrderStatus(req.body.status);

          const order = await OrderController.updateOrder(
            orderId,
            orderStatus,
            this.dbConnection
          );

          res.status(200).send(order);
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app.route(this.ROUTE_BASE_PATH).post(async (req, res) => {
      try {
        const items: Array<OrderItemRequest> = req.body;
        const order = await OrderController.createOrder(
          items,
          this.dbConnection
        );

        res.status(200).send(order);
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
