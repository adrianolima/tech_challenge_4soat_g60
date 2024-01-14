import * as express from "express";

import IAppRoute from "./IAppRoute";
import { PaymentStatus } from "../../entities/valueObjects/paymentStatus";
import { handleAPIError } from "../error/APIErrorHandler";
import { mapPaymentToResponse } from "../dto/payment";
import { DbConnection } from "../../interfaces/dbconnection";
import { PaymentController } from "../../controllers/payment";

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
        const saved = await PaymentController.createPayment(
          order_id,
          this.dbConnection
        );

        res.status(201).send(mapPaymentToResponse(saved));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app
      .route(this.ROUTE_BASE_PATH + "/:id/status/:status")
      .put(async (req, res) => {
        try {
          const paymentId = Number(req.params.id);
          const paymentStatus = new PaymentStatus(req.params.status);

          const payment = await PaymentController.updateStatus(
            paymentId,
            paymentStatus,
            this.dbConnection
          );

          res.status(200).send(mapPaymentToResponse(payment));
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app.route(this.ROUTE_BASE_PATH + "/process").post(async (req, res) => {
      try {
        const id = req.body.id;
        const status = req.body.status;

        await PaymentController.processPayment(id, status, this.dbConnection);

        res.status(200).send("OK");
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
