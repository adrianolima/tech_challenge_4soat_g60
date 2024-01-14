import { PaymentGatewayResponse } from "../entities/valueObjects/paymentGatewayResponse";
import { DbConnection } from "../interfaces/dbconnection";
import { IPaymentGatewayGateway } from "../interfaces/gateways";

export class PaymentGatewayGateway implements IPaymentGatewayGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }
  create(): Promise<PaymentGatewayResponse> {
    throw new Error("Method not implemented.");
  }
}
