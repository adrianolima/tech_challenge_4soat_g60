import {IPaymentRepository} from "../../../core/ports/IPaymentRepository";
import {PaymentStatus} from "../../../core/valueObjects/paymentStatus";

import {Prisma, PrismaClient} from "@prisma/client";
import {Payment} from "../../../core/entities/payment";
import RecordNotFoundError from "../../../core/errors/RecordNotFoundError";

const prisma = new PrismaClient();

export type PaymentData = {
  id: number
  order_id: number
  integration_id: string
  qr_code: string
  total: Prisma.Decimal
  status: string
  paid_at?: Date
  created_at?: Date
  updated_at?: Date
}

export class PaymentMapper {
  static map(input: PaymentData): Payment {
    return Payment.New(
      input.id,
      input.order_id,
      input.integration_id,
      input.qr_code,
      input.total.toNumber(),
      new PaymentStatus(input.status),
      input.paid_at,
      input.created_at,
      input.updated_at,
    )
  }
}

export class PaymentRepository implements IPaymentRepository {

  async save(payment: Payment): Promise<Payment> {


    const savedPayment = await prisma.payment.create({
      data: {
        order_id: payment.orderId,
        integration_id: payment.integrationId,
        status: payment.status.value(),
        qr_code: payment.qrCode,
        total: payment.total
      },
    });

    return PaymentMapper.map(savedPayment)
  }

  async updateStatus(id: number, paymentStatus: PaymentStatus): Promise<Payment> {
    const paymentCount = await prisma.payment.count({where: {id: id}});

    if (paymentCount <= 0) {
      throw new RecordNotFoundError("No payment found for the given id")
    }

    const updatedPayment = await prisma.payment.update({
      where: {
        id: id,
      },
      data: {
        status: paymentStatus.value(),
        paid_at: paymentStatus.isPaid() ? new Date() : null
      },
    });

    return PaymentMapper.map(updatedPayment);
  }

  async getByIntegrationID(integrationID: string): Promise<Payment> {
    const payment = await prisma.payment.findFirst({where: {integration_id: integrationID}});

    if (!payment) {
      throw new RecordNotFoundError("No payment found for the given integration ID")
    }

    return PaymentMapper.map(payment);
  }
}
