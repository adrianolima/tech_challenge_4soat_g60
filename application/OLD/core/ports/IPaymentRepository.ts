import {Payment} from "../entities/payment";
import {PaymentStatus} from "../valueObjects/paymentStatus";

export interface IPaymentRepository {
    save(payment: Payment): Promise<Payment>;
  
    getByIntegrationID(integrationID: string): Promise<Payment>;

    updateStatus(id: number, paymentStatus: PaymentStatus): Promise<Payment>;
}
