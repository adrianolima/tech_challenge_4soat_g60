import {container} from "tsyringe";
import IAppRoute from "./IAppRoute";
import * as express from "express";
import {OrderItem} from "../../../../core/entities/orderItem";
import OrderService from "../../../../core/services/orderService";

export default class OrderRoute implements IAppRoute {
  private orderService = container.resolve(OrderService);
  private basePath = "/api/order"


  setup(app: express.Application): void {
    app.route(this.basePath).get(async (req, res) => {

      try {
        const orders = await this.orderService.listAll()
        res.send(orders);
      } catch (e) {
        res.send({
          error: e.message,
        });
      }


    });

    app.route(`${this.basePath}/:id`).get(async (req, res) => {
      try {
        const order = await this.orderService.getOrderByID(Number(req.params.id))
        res.send(order);
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });
    

    app.route(`${this.basePath}/link/:orderId/client/:clientId`).get(async (req, res) => {
      try {

        const order = await this.orderService.linkToClient(Number(req.params.orderId), Number(req.params.clientId))

        res.send(order);
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    app.route(this.basePath).post(async (req, res) => {
      try {
        const items: Array<OrderItem> = req.body;
        const order = await this.orderService.save(items)

        res.send(order);
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });
  }
}