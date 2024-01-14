import { Client } from "../entities/client";
import { Order } from "../entities/order";
import { Payment } from "../entities/payment";
import { Product } from "../entities/product";
import { Category } from "../entities/valueObjects/category";
import { CPF } from "../entities/valueObjects/cpf";
import { OrderStatus } from "../entities/valueObjects/orderStatus";
import { PaymentGatewayResponse } from "../entities/valueObjects/paymentGatewayResponse";
import { PaymentStatus } from "../entities/valueObjects/paymentStatus";

export interface IClientGateway {
  getClient(cpf: CPF): Promise<Client | undefined>;
  getClientByID(Id: number): Promise<Client | undefined>;
  getClients(): Promise<Array<Client>>;
  save(client: Client): Promise<Client>;
}

export interface IOrderGateway {
  getOrders(): Promise<Array<Order>>;
  save(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  getOrderByID(orderID: number): Promise<Order | null>;
  getOrderByStatus(order: OrderStatus): Promise<Array<Order>>;
}

export interface IPaymentGatewayGateway {
  create(): Promise<PaymentGatewayResponse>;
}

export interface IPaymentGateway {
  save(payment: Payment): Promise<Payment>;
  getByIntegrationID(integrationID: string): Promise<Payment>;
  updateStatus(id: number, paymentStatus: PaymentStatus): Promise<Payment>;
}

export interface IProductGateway {
  getProductsByCategory(category: Category): Promise<Array<Product>>;
  getProductByIDs(ids: number[]): Promise<Array<Product>>;
  getProducts(): Promise<Array<Product>>;
  saveProduct(product: Product): Promise<Product>;
  updateProduct(product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}
