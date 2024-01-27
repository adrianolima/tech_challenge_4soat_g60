<<<<<<<< HEAD:application/src/HttpController/payment.ts
import { PaymentPresenter } from "./presenters/payment.presenter";
import { PaymentStatus } from "../domain/value_object/paymentStatus";
import { PaymentGatewayGateway } from "../gateways/services/gateway";
import { OrderGateway } from "../gateways/repositories/orders";
import { PaymentGateway } from "../gateways/repositories/payments";
import { DbConnection } from "../interfaces/dbconnection";
import { PaymentUseCases } from "../domain/usecases/payment";
========
import {PaymentStatus} from "../domain/value_object/paymentStatus";
import {PaymentGatewayGateway} from "../gateways/services/gateway";
import {OrderGateway} from "../gateways/repositories/orders";
import {PaymentGateway} from "../gateways/repositories/payments";
import {DbConnection} from "../interfaces/dbconnection";
import {PaymentUseCases} from "../domain/usecases/payment";
import {PaymentPresenter} from "./presenter/payment.presenter";
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/payment.controller.ts

export class PaymentController {
  static async getAllPayments(dbConnection: DbConnection) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const payments = await PaymentUseCases.getAllPayments(paymentGateway);

<<<<<<<< HEAD:application/src/HttpController/payment.ts
    const adapted = PaymentPresenter.adaptPayments(payments);
    return adapted;
========
    return PaymentPresenter.mapList(payments);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/payment.controller.ts
  }

  static async getPayment(paymentId: number, dbConnection: DbConnection) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const payment = await PaymentUseCases.getPayment(paymentId, paymentGateway);

<<<<<<<< HEAD:application/src/HttpController/payment.ts
    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
========
    return PaymentPresenter.map(payment);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/payment.controller.ts
  }

  static async createPayment(orderId: number, dbConnection: DbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const paymentGatewayGateway = new PaymentGatewayGateway();
    const paymentGateway = new PaymentGateway(dbConnection);

    const payment = await PaymentUseCases.save(
      orderId,
      orderGateway,
      paymentGatewayGateway,
      paymentGateway
    );

<<<<<<<< HEAD:application/src/HttpController/payment.ts
    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
========
    return PaymentPresenter.map(payment);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/payment.controller.ts
  }

  static async processPayment(integrationID: string, status: string, dbConnection: DbConnection) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const orderGateway = new OrderGateway(dbConnection);

    const payment = await PaymentUseCases.processPayment(
      integrationID,
      status,
      paymentGateway,
      orderGateway
    );

<<<<<<<< HEAD:application/src/HttpController/payment.ts
    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
========
    return PaymentPresenter.map(payment);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/payment.controller.ts
  }

  static async updateStatus(paymentId: number, status: PaymentStatus, dbConnection: DbConnection) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const orderGateway = new OrderGateway(dbConnection);

    const payment = await PaymentUseCases.updateStatus(
      paymentId,
      status,
      paymentGateway,
      orderGateway
    );

<<<<<<<< HEAD:application/src/HttpController/payment.ts
    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
========
    return PaymentPresenter.map(payment);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/payment.controller.ts
  }
}

