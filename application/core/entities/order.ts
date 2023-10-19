import { Client } from "./client";
import { Product } from "./product";
import { Money } from "../valueObjects/money";
import { OrderStatus } from "../valueObjects/orderStatus";

export class Order {
  private id: number;
  private products: Array<Product>;
  private client: Client;
  private valueTotal: Money;
  private status: OrderStatus;

  constructor(products: Array<Product>, client: Client) {
    this.products = products;
    this.client = client;
    this.status = new OrderStatus(OrderStatus.EM_PREPARACAO);

    this.calculateTotalValue();
  }

  public addNewProduct(product: Product): void {
    this.products.push(product);

    this.calculateTotalValue();
  }

  public calculateTotalValue(): void {
    let calcValueTotal: number = 0;

    for (let product of this.products) {
      calcValueTotal += product.getValueProduct();
    }

    this.valueTotal = new Money(calcValueTotal);
  }
}
