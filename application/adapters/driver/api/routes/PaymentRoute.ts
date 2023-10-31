import IAppRoute from "./IAppRoute";
import {container} from "tsyringe";
import * as express from "express";
import {PaymentService} from "../../../../core/services/paymentService";
import {PaymentStatus} from "../../../../core/valueObjects/paymentStatus";

export default class PaymentRoute implements IAppRoute {
    private paymentService = container.resolve(PaymentService);

    setup(app: express.Application): void {


        app.route("/api/payments").post(async (req, res) => {
            const {order_id} = req.body;

            try {
                const saved = await this.paymentService.save(order_id)
                res.send(saved);
            } catch (e) {
                res.send({
                    error: e.message,
                });
            }
        });

        app.route("/api/payments/:id/status/:status").put(async (req, res) => {
            try {
                const payment = await this.paymentService.updateStatus(Number(req.params.id), new PaymentStatus(req.params.status));

                res.send(payment);
            } catch (e) {
                res.send({
                    error: e.message,
                });
            }
        });

        app.route("/api/payments/process").post(async (req, res) => {
            try {
                await this.paymentService.processPayment(req.body.id, req.body.status);
                res.send("OK");
            } catch (e) {
                res.send({
                    error: e.message,
                });
            }
        });

    }

}