import IAppRoute from "./IAppRoute";
import * as express from "express";
import { OrderItem } from "../../entities/orderItem";
import { handleAPIError } from "../error/APIErrorHandler";
import { mapOrderToResponse, OrderItemRequest } from "../dto/order";
import { OrderStatus } from "../../entities/valueObjects/orderStatus";
import { DbConnection } from "../../interfaces/dbconnection";

export default class OrderRoute implements IAppRoute {
  private dbConnection: DbConnection;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  private ROUTE_BASE_PATH = "/api/order";

  setup(app: express.Application): void {
    app.route(this.ROUTE_BASE_PATH).get(async (req, res) => {
      try {
        // const orders = await this.orderService.listAll();
        // res.send(orders.map(mapOrderToResponse));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.ROUTE_BASE_PATH}/:id`).get(async (req, res) => {
      try {
        // const order = await this.orderService.getOrderByID(
        //   Number(req.params.id)
        // );
        // res.send(mapOrderToResponse(order));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app
      .route(`${this.ROUTE_BASE_PATH}/link/:orderId/client/:clientId`)
      .put(async (req, res) => {
        try {
          // const order = await this.orderService.linkToClient(
          //   Number(req.params.orderId),
          //   Number(req.params.clientId)
          // );
          // res.send(mapOrderToResponse(order));
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app
      .route(`${this.ROUTE_BASE_PATH}/:orderId/status`)
      .put(async (req, res) => {
        try {
          // const order = await this.orderService.updateOrderStatus(
          //   Number(req.params.orderId),
          //   new OrderStatus(req.body.status)
          // );
          // res.send(mapOrderToResponse(order));
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app.route(this.ROUTE_BASE_PATH).post(async (req, res) => {
      try {
        // const items: Array<OrderItemRequest> = req.body;
        // const order = await this.orderService.save(items);
        // res.send(mapOrderToResponse(order));
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
