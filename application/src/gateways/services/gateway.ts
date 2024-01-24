import { PaymentGatewayResponse } from "../../domain/value_object/paymentGatewayResponse";
import { DbConnection } from "../../interfaces/dbconnection";
import { IPaymentGatewayService } from "../../interfaces/gateways";

export class PaymentGatewayGateway implements IPaymentGatewayService {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }
  create(): Promise<PaymentGatewayResponse> {
    throw new Error("Method not implemented.");
  }
}
