import { OrderGateway } from "../gateways/orders";
import { ProductGateway } from "../gateways/products";
import { OrderUseCases } from "../usecases/order";

export class OrderController {
  static async getAllOrders(dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const allOrders = await OrderUseCases.listAll(orderGateway);

    return allOrders;
  }

  static async getOrderById(orderId, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.getOrderByID(orderId, orderGateway);

    return order;
  }

  static async linkClientToOrder(orderId, clientId, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.linkToClient(
      orderId,
      orderGateway,
      clientId
    );

    return order;
  }

  static async createOrder(order, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const productGateway = new ProductGateway(dbConnection);

    const newOrder = await OrderUseCases.save(
      order,
      orderGateway,
      productGateway
    );

    return newOrder;
  }

  static async updateOrder(orderId, status, dbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.updateOrderStatus(
      orderId,
      status,
      orderGateway
    );

    return order;
  }
}
