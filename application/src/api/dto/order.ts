import {Order} from "../../../../core/entities/order";
import {OrderItem} from "../../../../core/entities/orderItem";
import {mapProductToResponse, ProductResponseDto} from "./product";
import {ClientResponseDTO, mapClientToResponse} from "./client";
import {mapPaymentToResponse, PaymentResponseDTO} from "./payment";

export type OrderItemRequest = {
  product_id: number;
  quantity: number;
}


type OrderResponseDTO = {
  client?: ClientResponseDTO
  payment?: PaymentResponseDTO
  items: OrderItemResponseDTO[]
  id: number
  status: string
  total: number
  created_at?: Date
  updated_at?: Date
}

type OrderItemResponseDTO = {
  id: number
  quantity: number
  price: number
  total: number
  product: ProductResponseDto
}

function mapOrderItemToResponse(o: OrderItem): OrderItemResponseDTO {
  return {
    id: o.id,
    quantity: o.quantity,
    price: o.value,
    total: o.total,
    product: mapProductToResponse(o.product),
  }
}

export function mapOrderToResponse(o: Order): OrderResponseDTO {
  return {
    client: !o.client ? null : mapClientToResponse(o.client),
    payment: !o.payment ? null : mapPaymentToResponse(o.payment),
    items: o.items.map(mapOrderItemToResponse),
    id: o.id,
    status: o.status.getStatus(),
    total: o.valueTotal.getValueMoney(),
    created_at: o.createdAt,
    updated_at: o.updatedAt,
  }
}
