import {Client} from "./client";
import {Product} from "./product";
import {Money} from "../valueObjects/money";
import {OrderStatus} from "../valueObjects/orderStatus";
import {OrderItem} from "./orderItem";
import {Payment} from "./payment";

export class Order {
  private Id: number;
  private items: Array<OrderItem>;
  private client?: Client;
  private payment?: Payment;
  private valueTotal: Money;
  private status: OrderStatus;

  constructor(products: Array<OrderItem>) {
    this.items = products;
    this.status = OrderStatus.CRIADO;

    this.calculateTotalValue();
  }

  public addNewProduct(product: Product): void {
    this.items.push(new OrderItem(product, 1));

    this.calculateTotalValue();
  }

  public calculateTotalValue(): void {
    let calcValueTotal: number = 0.0;

    for (let item of this.items) {
      calcValueTotal += item.value;
    }

    this.valueTotal = new Money(calcValueTotal);
  }


  getId(): number {
    return this.Id;
  }

  getItems(): Array<OrderItem> {
    return this.items;
  }

  getClient(): Client {
    return this.client;
  }

  setClient(client: Client): void {
    this.client = client
  }

  getValueTotal(): Money {
    return this.valueTotal;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getPayment(): Payment {
    return this.payment;
  }

  setStatus(status: OrderStatus): void {
    this.status = status
  }

  setPayment(payment: Payment) {
    this.payment = payment
  }
}
