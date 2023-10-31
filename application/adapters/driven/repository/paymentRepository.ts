import {IPaymentRepository} from "../../../core/ports/IPaymentRepository";
import {PaymentStatus} from "../../../core/valueObjects/paymentStatus";

import {PrismaClient} from "@prisma/client";
import {Payment} from "../../../core/entities/payment";
import RecordNotFoundError from "../../../core/errors/RecordNotFoundError";

const prisma = new PrismaClient();

type PaymentData = {
  id: number
  order_id: number
  integration_id: string
  qr_code: string
  total: number
  status: PaymentStatus
  paid_at?: Date
  created_at?: Date
  updated_at?: Date
}

class Mapper {
  static map(input: PaymentData): Payment {
    return Payment.New(
      input.id,
      input.order_id,
      input.integration_id,
      input.qr_code,
      input.total,
      input.status,
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
        order_id: payment.id,
        integration_id: payment.integrationId,
        status: payment.status.value(),
        qr_code: payment.qrCode,
        total: payment.total
      },
    });

    const data: PaymentData = {
      ...savedPayment,
      status: new PaymentStatus(savedPayment.status),
      total: savedPayment.total.toNumber(),
    }

    return Mapper.map(data)
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

    const data: PaymentData = {
      ...updatedPayment,
      status: new PaymentStatus(updatedPayment.status),
      total: updatedPayment.total.toNumber(),
    }

    return Mapper.map(data);
  }

  async getByIntegrationID(integrationID: string): Promise<Payment> {
    const payment = await prisma.payment.findFirst({where: {integration_id: integrationID}});

    if (!payment) {
      throw new RecordNotFoundError("No payment found for the given integration ID")
    }

    const data: PaymentData = {
      ...payment,
      status: new PaymentStatus(payment.status),
      total: payment.total.toNumber(),
    }

    return Mapper.map(data);
  }
}
