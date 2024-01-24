import { Payment } from "../../domain/entities/payment";

export type PaymentResponse = {
  id: number;
  order_id: number;
  integration_id: string;
  qr_code: string;
  total: number;
  status: string;
  paid_at?: Date;
  created_at?: Date;
  updated_at?: Date;
};

export const PaymentAdapter = {
  adaptPayments: function (data: Payment[]): PaymentResponse[] {
    if (data === null) return null;

    let allData = data.map((payment) => {
      return {
        id: payment.id,
        order_id: payment.orderId,
        integration_id: payment.integrationId,
        qr_code: payment.qrCode,
        total: payment.total,
        status: payment.status.value(),
        paid_at: payment.paidAt,
        created_at: payment.createdAt,
        updated_at: payment.updatedAt,
      };
    });

    return allData;
  },

  adaptPayment: function (data: Payment): PaymentResponse {
    if (data === null) return null;

    return {
      id: data.id,
      order_id: data.orderId,
      integration_id: data.integrationId,
      qr_code: data.qrCode,
      total: data.total,
      status: data.status.value(),
      paid_at: data.paidAt,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  },
};
