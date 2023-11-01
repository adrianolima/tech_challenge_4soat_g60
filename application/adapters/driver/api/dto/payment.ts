import {Payment} from "../../../../core/entities/payment";

export type PaymentResponseDTO = {
  id: number
  order_id: number
  integration_id: string
  qr_code: string
  total: number
  status: string
  paid_at?: Date
  created_at?: Date
  updated_at?: Date
}

export function mapPaymentToResponse(p: Payment): PaymentResponseDTO {
  return {
    id: p.id,
    order_id: p.orderId,
    integration_id: p.integrationId,
    qr_code: p.qrCode,
    total: p.total,
    status: p.status.value(),
    paid_at: p.paidAt,
    created_at: p.createdAt,
    updated_at: p.updatedAt,
  }
}