import { OrderAdapter } from "./presenter/order";
import { OrderGateway } from "../gateways/repositories/orders";
import { ProductGateway } from "../gateways/repositories/products";
import { OrderUseCases } from "../domain/usecases/order";

export class OrderController {
  static async getAllOrders(dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const allOrders = await OrderUseCases.listAll(orderGateway);

    const adapted = OrderAdapter.adaptOrders(allOrders);
    return adapted;
  }

  static async getOrderById(orderId, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.getOrderByID(orderId, orderGateway);

    const adapted = OrderAdapter.adaptOrder(order);
    return adapted;
  }

  static async linkClientToOrder(orderId, clientId, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.linkToClient(
      orderId,
      orderGateway,
      clientId
    );

    const adapted = OrderAdapter.adaptOrder(order);
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

    const adapted = OrderAdapter.adaptOrder(newOrder);
    return adapted;
  }

  static async updateOrder(orderId, status, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.updateOrderStatus(
      orderId,
      status,
      orderGateway
    );

    const adapted = OrderAdapter.adaptOrder(order);
    return adapted;
  }
}
