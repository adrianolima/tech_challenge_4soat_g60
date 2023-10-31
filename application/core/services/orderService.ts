import {Order} from "../entities/order";
import {inject, injectable} from "tsyringe";
import {IOrderRepository} from "../ports/IOrderRepository";
import RecordNotFoundError from "../errors/RecordNotFoundError";
import {Client} from "../entities/client";
import {OrderStatus} from "../valueObjects/orderStatus";
import {ClientService} from "./clientService";
import {OrderItem} from "../entities/orderItem";
import {Payment} from "../entities/payment";
import {PaymentStatus} from "../valueObjects/paymentStatus";


@injectable()
export default class OrderService {

  constructor(
    @inject("IOrderRepository") private _orderRepository: IOrderRepository,
    @inject("ClientService") private _clienteService: ClientService
  ) {
  }

  /**
   * Save a new order, this method should be used just for order creation
   */
  async save(items: Array<OrderItem>): Promise<Order> {

    const order = new Order(items)

    return await this._orderRepository.save(order)
  }

  /**
   * Update the order payment data and set the status according to them
   *
   * @throws RecordNotFoundError if no order found for the given id-
   * @see getOrderStatusByPayment
   */
  async updatePayment(orderId: number, payment: Payment): Promise<Order> {

    const order = await this.getOrderByID(orderId)
    order.setPayment(payment)
    order.setStatus(this.getOrderStatusByPayment(payment))

    return await this._orderRepository.save(order)
  }

  private getOrderStatusByPayment(payment: Payment): OrderStatus {
    switch (payment.status.value()) {
      case PaymentStatus.PAGO:
        return OrderStatus.AGUARDANDO_PREPARO
      default:
        return OrderStatus.AGUARDANDO_PAGAMENTO
    }
  }

  /**
   * Returns the order for the specified ID, otherwise throws an error
   *
   * @throws RecordNotFoundError if no order found for the given id
   */
  async getOrderByID(id: number): Promise<Order> {
    const order: Order = await this._orderRepository.getOrderByID(id)

    if (order == null) {
      throw new RecordNotFoundError(`No order found for the given ID (${id})`)
    }
    return order
  }

  /**
   * Updates the order status
   *
   * @param orderID the target order which status will be changed
   * @param status the new order status
   * @throws RecordNotFoundError if no order found for the given id
   * @throws InvalidOrderStatusError if the specified status is invalid
   */
  async updateOrderStatus(orderID: number, status: OrderStatus): Promise<Order> {

    const order: Order = await this.getOrderByID(orderID)
    order.setStatus(status)

    return await this._orderRepository.save(order)
  }

  /**
   * Update the client property of the specified order
   *
   * @param orderId the target order which client will be changed
   * @param clientId the client id can be null indicating anonymous client
   * @throws RecordNotFoundError if no order or client found for the given ids
   */
  async linkToClient(orderId: number, clientId?: number): Promise<Order> {
    const order: Order = await this.getOrderByID(orderId)

    let client: Client = null

    if (clientId != null) {
      client = await this._clienteService.getClientByID(clientId)
    }

    order.setClient(client)
    order.setStatus(OrderStatus.AGUARDANDO_PAGAMENTO)

    return await this._orderRepository.save(order)
  }

  /**
   * Fetch all orders
   */
  async listAll(): Promise<Array<Order>> {
    return this._orderRepository.getOrders()
  }

}