import { IPaymentRepository } from "../../../core/ports/IPaymentRepository";
import { PaymentStatus } from "../../../core/valueObjects/paymentStatus";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PaymentRepository implements IPaymentRepository {
  async save(orderId: number): Promise<String> {
    await prisma.payment.create({
      data: {
        order_id: orderId,
        status: PaymentStatus.PENDENTE,
      },
    });

    return "Solicitação de pagamento cadastrado com sucesso!";
  }

  async pay(id: number): Promise<string> {
    await prisma.payment.update({
      where: {
        id: id,
      },
      data: {
        status: PaymentStatus.PAGO,
      },
    });

    return "Pagamento realizado com sucesso!";
  }
}
