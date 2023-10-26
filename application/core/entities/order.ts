import { Client } from "./client";
import { Product } from "./product";
import { Money } from "../valueObjects/money";
import { OrderStatus } from "../valueObjects/orderStatus";
import { OrderItem } from "./orderItem";

export class Order {
  private Id: number;
  private items: Array<OrderItem>;
  private client?: Client;
  private valueTotal: Money;
  private status: OrderStatus;

  constructor(products: Array<OrderItem>, client: Client) {
    this.items = products;
    this.client = client;
    this.status = new OrderStatus(OrderStatus.AGUARDANDO_PREPARO);

    this.calculateTotalValue();
  }

  public addNewProduct(product: Product): void {
    this.items.push(new OrderItem(product, 1));

    this.calculateTotalValue();
  }

  public calculateTotalValue(): void {
    let calcValueTotal: number = 0;

    for (let item of this.items) {
      calcValueTotal += item.value;
    }

    this.valueTotal = new Money(calcValueTotal);
  }
}
