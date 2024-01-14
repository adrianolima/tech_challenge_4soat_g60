import { PaymentStatus } from "../entities/valueObjects/paymentStatus";
import { PaymentGatewayGateway } from "../gateways/gateway";
import { OrderGateway } from "../gateways/orders";
import { PaymentGateway } from "../gateways/payments";
import { DbConnection } from "../interfaces/dbconnection";
import { PaymentUseCases } from "../usecases/payment";

export class PaymentController {
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

    return payment;
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

    return payment;
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

    return payment;
  }
}
