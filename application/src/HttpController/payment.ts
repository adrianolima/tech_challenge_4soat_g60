import { PaymentPresenter } from "./presenters/payment.presenter";
import { PaymentStatus } from "../domain/value_object/paymentStatus";
import { PaymentGatewayGateway } from "../gateways/services/gateway";
import { OrderGateway } from "../gateways/repositories/orders";
import { PaymentGateway } from "../gateways/repositories/payments";
import { DbConnection } from "../interfaces/dbconnection";
import { PaymentUseCases } from "../domain/usecases/payment";

export class PaymentController {
  static async getAllPayments(dbConnection: DbConnection) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const payments = await PaymentUseCases.getAllPayments(paymentGateway);

    const adapted = PaymentPresenter.adaptPayments(payments);
    return adapted;
  }

  static async getPayment(paymentId: number, dbConnection: DbConnection) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const payment = await PaymentUseCases.getPayment(paymentId, paymentGateway);

    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
  }

  static async createPayment(orderId: number, dbConnection: DbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const paymentGatewayGateway = new PaymentGatewayGateway(dbConnection);
    const paymentGateway = new PaymentGateway(dbConnection);

    const payment = await PaymentUseCases.save(
      orderId,
      orderGateway,
      paymentGatewayGateway,
      paymentGateway
    );

    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
  }

  static async processPayment(
    integrationID: string,
    status: string,
    dbConnection: DbConnection
  ) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const orderGateway = new OrderGateway(dbConnection);

    const payment = await PaymentUseCases.processPayment(
      integrationID,
      status,
      paymentGateway,
      orderGateway
    );

    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
  }

  static async updateStatus(
    paymentId: number,
    status: PaymentStatus,
    dbConnection: DbConnection
  ) {
    const paymentGateway = new PaymentGateway(dbConnection);
    const orderGateway = new OrderGateway(dbConnection);

    const payment = await PaymentUseCases.updateStatus(
      paymentId,
      status,
      paymentGateway,
      orderGateway
    );

    const adapted = PaymentPresenter.adaptPayment(payment);
    return adapted;
  }
}

