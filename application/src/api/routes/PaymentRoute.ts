import IAppRoute from "./IAppRoute";
import * as express from "express";
import { PaymentStatus } from "../../entities/valueObjects/paymentStatus";
import { handleAPIError } from "../error/APIErrorHandler";
import { mapPaymentToResponse } from "../dto/payment";
import { DbConnection } from "../../interfaces/dbconnection";

export default class PaymentRoute implements IAppRoute {
  private dbConnection: DbConnection;

  protected ROUTE_BASE_PATH = "/api/payment";

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  setup(app: express.Application): void {
    app.route(this.ROUTE_BASE_PATH).post(async (req, res) => {
      const { order_id } = req.body;

      try {
        // const saved = await this.paymentService.save(order_id);
        // res.send(mapPaymentToResponse(saved));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app
      .route(this.ROUTE_BASE_PATH + "/:id/status/:status")
      .put(async (req, res) => {
        try {
          // const payment = await this.paymentService.updateStatus(
          //   Number(req.params.id),
          //   new PaymentStatus(req.params.status)
          // );
          // res.send(mapPaymentToResponse(payment));
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app.route(this.ROUTE_BASE_PATH + "/process").post(async (req, res) => {
      try {
        // await this.paymentService.processPayment(req.body.id, req.body.status);
        // res.send("OK");
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
