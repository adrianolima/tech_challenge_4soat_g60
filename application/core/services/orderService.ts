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
import {OrderItemRequest} from "../../adapters/driver/api/dto/order";
import {IProductRepository} from "../ports/IProductRepository";
import ProductInactiveError from "../errors/ProductInactiveError";


@injectable()
export default class OrderService {

  constructor(
    @inject("IOrderRepository") private _orderRepository: IOrderRepository,
    @inject("IProductRepository") private _productRepository: IProductRepository,
    @inject("ClientService") private _clienteService: ClientService
  ) {
  }

  /**
   * Save a new order, this method should be used just for order creation
   */
  async save(requestItems: Array<OrderItemRequest>): Promise<Order> {

    // Find all related products
    const products = await this._productRepository.getProductByIDs(
      requestItems.map(v => v.product_id)
    )

    // Create the OrderItems list
    const items = requestItems.map(ri => {
        const product = products.find(p => p.getId() === ri.product_id)

        if (!product) {
          throw new RecordNotFoundError(`No product found for the id: ${ri.product_id}`)
        }

        if (!product.getActive()) {
          throw new ProductInactiveError(`The requested product is unavailable: "${product.getName()}"`)
        }

        return new OrderItem(product, ri.quantity)
      }
    )

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

    return await this._orderRepository.update(order)
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

    // TODO: add some validations depending on actual status
    const order: Order = await this.getOrderByID(orderID)
    order.setStatus(status)

    return await this._orderRepository.update(order)
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

    return await this._orderRepository.update(order)
  }

  /**
   * Fetch all orders
   */
  async listAll(): Promise<Array<Order>> {
    return this._orderRepository.getOrders()
  }

}