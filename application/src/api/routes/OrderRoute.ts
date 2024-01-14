import {container} from "tsyringe";
import IAppRoute from "./IAppRoute";
import * as express from "express";
import {OrderItem} from "../../../../core/entities/orderItem";
import OrderService from "../../../../core/services/orderService";
import {handleAPIError} from "../error/APIErrorHandler";
import {mapOrderToResponse, OrderItemRequest} from "../dto/order";
import {OrderStatus} from "../../../../core/valueObjects/orderStatus";

export default class OrderRoute implements IAppRoute {
  private orderService = container.resolve(OrderService);
  private basePath = "/api/order"


  setup(app: express.Application): void {
    app.route(this.basePath).get(async (req, res) => {

      try {
        const orders = await this.orderService.listAll()
        res.send(orders.map(mapOrderToResponse));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.basePath}/:id`).get(async (req, res) => {
      try {
        const order = await this.orderService.getOrderByID(Number(req.params.id))
        res.send(mapOrderToResponse(order));
      } catch (e) {
        handleAPIError(res, e);
      }
    });


    app.route(`${this.basePath}/link/:orderId/client/:clientId`).put(async (req, res) => {
      try {

        const order = await this.orderService.linkToClient(Number(req.params.orderId), Number(req.params.clientId))

        res.send(mapOrderToResponse(order));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.basePath}/:orderId/status`).put(async (req, res) => {
      try {

        const order = await this.orderService.updateOrderStatus(Number(req.params.orderId), new OrderStatus(req.body.status))

        res.send(mapOrderToResponse(order));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.basePath).post(async (req, res) => {
      try {
        const items: Array<OrderItemRequest> = req.body;
        const order = await this.orderService.save(items)

        res.send(mapOrderToResponse(order));
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}