import { Client } from "./client";
import { Product } from "./product";
import { Money } from "../value_object/money";
import { OrderStatus } from "../value_object/orderStatus";
import { OrderItem } from "./orderItem";
import { Payment } from "./payment";

export class Order {
  private _id: number;
  private _items: Array<OrderItem>;
  private _client?: Client;
  private _payment?: Payment;
  private _valueTotal: Money;
  private _status: OrderStatus;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(products: Array<OrderItem>) {
    this._items = products;
    this._status = OrderStatus.CRIADO;

    this.calculateTotalValue();
  }

  static New(
    id: number,
    items: Array<OrderItem>,
    valueTotal: number,
    status: string,
    client?: Client,
    payment?: Payment,
    createdAt?: Date,
    updatedAt?: Date
  ): Order {
    const o = new Order([]);
    o._id = id;
    o._items = items;
    o._client = client;
    o._payment = payment;
    o._valueTotal = new Money(valueTotal);
    o._status = new OrderStatus(status);
    o._createdAt = createdAt;
    o._updatedAt = updatedAt;
    return o;
  }

  public addProduct(product: Product): void {
    this._items.push(new OrderItem(product, 1));

    this.calculateTotalValue();
  }

  public calculateTotalValue(): void {
    let calcValueTotal: number = 0.0;

    for (let item of this._items) {
      calcValueTotal += item.value;
    }

    this._valueTotal = new Money(calcValueTotal);
  }

  get id(): number {
    return this._id;
  }

  get items(): Array<OrderItem> {
    return this._items;
  }

  get client(): Client | null {
    return this._client;
  }

  get payment(): Payment | null {
    return this._payment;
  }

  get valueTotal(): Money {
    return this._valueTotal;
  }

  get status(): OrderStatus {
    return this._status;
  }

  setClient(client: Client): void {
    this._client = client;
  }

  setStatus(status: OrderStatus): void {
    this._status = status;
  }

  setPayment(payment: Payment) {
    this._payment = payment;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
