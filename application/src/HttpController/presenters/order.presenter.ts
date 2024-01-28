import { Order } from "../../domain/entities/order";
import { OrderItem } from "../../domain/entities/orderItem";
import { ProductPresenter, ProductResponse } from "./product.presenter";
import { ClientPresenter, ClientResponse } from "./client.presenter";
import { PaymentPresenter, PaymentResponse } from "./payment.presenter";

export type OrderItemRequest = {
  product_id: number;
  quantity: number;
};

type OrderResponse = {
  client?: ClientResponse;
  payment?: PaymentResponse;
  items: OrderItemResponse[];
  id: number;
  status: string;
  total: number;
  created_at?: Date;
  updated_at?: Date;
};

type OrderItemResponse = {
  id: number;
  quantity: number;
  price: number;
  total: number;
  product: ProductResponse;
};

export const OrderPresenter = {
  adaptOrders: function (data: Order[]): OrderResponse[] {
    if (data === null) return null;

    let allData = data.map((order) => {
      return {
        client: order.client ? ClientPresenter.adaptClient(order.client) : null,
        payment: order.payment
          ? PaymentPresenter.adaptPayment(order.payment)
          : null,
        items: order.items.map(adapterOrderItem),
        id: order.id,
        status: order.status.getStatus(),
        total: order.valueTotal.getValueMoney(),
        created_at: order.createdAt,
        updated_at: order.updatedAt,
      };
    });

    return allData;
  },

  adaptOrder: function (data: Order): OrderResponse {
    if (data === null) return null;

    return {
      client: data.client ? ClientPresenter.adaptClient(data.client) : null,
      payment: data.payment
        ? PaymentPresenter.adaptPayment(data.payment)
        : null,
      items: data.items.map(adapterOrderItem),
      id: data.id,
      status: data.status.getStatus(),
      total: data.valueTotal.getValueMoney(),
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  },
};

function adapterOrderItem(o: OrderItem): OrderItemResponse {
  return {
    id: o.id,
    quantity: o.quantity,
    price: o.value,
    total: o.total,
    product: o.product ? ProductPresenter.adaptProduct(o.product) : null,
  };
}

