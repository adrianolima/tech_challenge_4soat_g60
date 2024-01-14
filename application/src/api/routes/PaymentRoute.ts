import IAppRoute from "./IAppRoute";
import {container} from "tsyringe";
import * as express from "express";
import {PaymentService} from "../../../../core/services/paymentService";
import {PaymentStatus} from "../../../../core/valueObjects/paymentStatus";
import {handleAPIError} from "../error/APIErrorHandler";
import {mapPaymentToResponse} from "../dto/payment";

export default class PaymentRoute implements IAppRoute {
  private paymentService = container.resolve(PaymentService);

  setup(app: express.Application): void {


    app.route("/api/payment").post(async (req, res) => {
      const {order_id} = req.body;

      try {
        const saved = await this.paymentService.save(order_id)
        res.send(mapPaymentToResponse(saved));
      } catch (e) {
        handleAPIError(res, e)
      }
    });

    app.route("/api/payment/:id/status/:status").put(async (req, res) => {
      try {
        const payment = await this.paymentService.updateStatus(Number(req.params.id), new PaymentStatus(req.params.status));

        res.send(mapPaymentToResponse(payment));
      } catch (e) {
        handleAPIError(res, e)
      }
    });

    app.route("/api/payment/process").post(async (req, res) => {
      try {
        await this.paymentService.processPayment(req.body.id, req.body.status);
        res.send("OK");
      } catch (e) {
        handleAPIError(res, e)
      }
    });

  }

}