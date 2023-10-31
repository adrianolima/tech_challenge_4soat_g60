import {inject, injectable} from "tsyringe";

import {IPaymentRepository} from "../ports/IPaymentRepository";
import {Payment} from "../entities/payment";
import OrderService from "./orderService";
import IPaymentGateway from "../ports/IPaymentGateway";
import {PaymentStatus} from "../valueObjects/paymentStatus";

@injectable()
export class PaymentService {
    constructor(
        @inject("IPaymentRepository") private _paymentRepository: IPaymentRepository,
        @inject("OrderService") private _orderService: OrderService,
        @inject("IPaymentGateway") private _paymentGateway: IPaymentGateway
    ) {
    }

    /**
     * Create a new payment and link to the order
     */
    async save(orderId: number): Promise<Payment> {

        const order = await this._orderService.getOrderByID(orderId)

        // Call the Payment gateway ACL to generate the integrationID and QR Code
        const {identifier, QRCode} = await this._paymentGateway.create()


        const payment = new Payment(orderId, identifier, QRCode, order.getValueTotal().getValueMoney())

        const savedPayment = await this._paymentRepository.save(payment)

        await this._notifyOrderPayment(savedPayment)

        return savedPayment
    }

    /**
     * Process payment by integration ID and status from payment gateway webhook
     *
     * @param integrationID Charge identifier from payment gateway
     * @param status Payment status from Payment Gateway
     * @throws RecordNotFoundError if no payment found for the given integrationID
     */
    async processPayment(integrationID: string, status: string): Promise<Payment> {

        const payment = await this._paymentRepository.getByIntegrationID(integrationID)

        const newStatus = this._processStatus(status)

        return await this.updateStatus(payment.id, newStatus)
    }


    /**
     * This method can be called when payment was done manually
     */
    async updateStatus(id: number, status: PaymentStatus): Promise<Payment> {
        const updatedPayment = await this._paymentRepository.updateStatus(id, status);

        await this._notifyOrderPayment(updatedPayment)

        return updatedPayment
    }

    /**
     * Translate the payment gateway status to the domain Payment status
     * @param status
     */
    private _processStatus(status: string): PaymentStatus {
        switch (status) {
            case "paid":
                return new PaymentStatus(PaymentStatus.PAGO)
            case "cancelled":
                return new PaymentStatus(PaymentStatus.CANCELADO)
            case "refused":
                return new PaymentStatus(PaymentStatus.RECUSADO)
            default:
                return new PaymentStatus(PaymentStatus.PENDENTE)

        }
    }

    /**
     * Tell order service about payment changes
     */
    private async _notifyOrderPayment(payment: Payment) {

        await this._orderService.updatePayment(payment.orderId, payment)
    }
}
