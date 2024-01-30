import {Order} from "../../domain/entities/order";
import {OrderResponse} from "../model/order.response.model";
import {OrderItemPresenter} from "./order-item.presenter";
import {ClientPresenter} from "./client.presenter";
import {PaymentPresenter} from "./payment.presenter";


export class OrderPresenter {
  static mapList(data: Order[]): OrderResponse[] {
    return data.map(OrderPresenter.map);
  }

  static map(data: Order): OrderResponse {
    return {
      client: data.client ? ClientPresenter.map(data.client) : null,
      payment: data.payment ? PaymentPresenter.map(data.payment) : null,
      items: data.items.map(OrderItemPresenter.map),
      id: data.id,
      status: data.status.getStatus(),
      total: data.valueTotal.getValueMoney(),
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }
}

