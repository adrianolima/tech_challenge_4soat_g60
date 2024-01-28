import { OrderPresenter } from "./presenters/order.presenter";
import { OrderGateway } from "../gateways/repositories/orders";
import { ProductGateway } from "../gateways/repositories/products";
import { OrderUseCases } from "../domain/usecases/order";
import { ClientGateway } from "../gateways/repositories/clients";

export class OrderController {
  static async getAllOrdersOrderned(dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const allOrders = await OrderUseCases.listAllOrderned(orderGateway);

    return allOrders;
  }

  static async getAllOrders(dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const allOrders = await OrderUseCases.listAll(orderGateway);

    const adapted = OrderPresenter.adaptOrders(allOrders);
    return adapted;
  }

  static async getOrderById(orderId, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.getOrderByID(orderId, orderGateway);

    const adapted = OrderPresenter.adaptOrder(order);
    return adapted;
  }

  static async linkClientToOrder(orderId, clientId, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const clientGateway = new ClientGateway(dbConnection);
    const order = await OrderUseCases.linkToClient(
      orderId,
      orderGateway,
      clientGateway,
      clientId
    );

    const adapted = OrderPresenter.adaptOrder(order);
    return adapted;
  }

  static async createOrder(order, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const productGateway = new ProductGateway(dbConnection);

    const newOrder = await OrderUseCases.save(
      order,
      orderGateway,
      productGateway
    );

    const adapted = OrderPresenter.adaptOrder(newOrder);
    return adapted;
  }

  static async updateOrder(orderId, status, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.updateOrderStatus(
      orderId,
      status,
      orderGateway
    );

    const adapted = OrderPresenter.adaptOrder(order);
    return adapted;
  }
}

