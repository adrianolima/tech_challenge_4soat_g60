import {Payment} from "../entities/payment";
import {PaymentStatus} from "../valueObjects/paymentStatus";

interface IPaymentRepository {

    save(payment: Payment): Promise<Payment>
    updateStatus(paymentId: number, status: PaymentStatus): Promise<Payment>


}