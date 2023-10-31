import {Client} from "./client";
import {Product} from "./product";
import {Money} from "../valueObjects/money";
import {OrderStatus} from "../valueObjects/orderStatus";
import {OrderItem} from "./orderItem";
import {Payment} from "./payment";

export class Order {
  private _id: number;
  private _items: Array<OrderItem>;
  private _client?: Client;
  private _payment?: Payment;
  private _valueTotal: Money;
  private _status: OrderStatus;

  constructor(products: Array<OrderItem>) {
    this._items = products;
    this._status = OrderStatus.CRIADO;

    this.calculateTotalValue();
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

  get client(): Client {
    return this._client;
  }

  get payment(): Payment {
    return this._payment;
  }

  get valueTotal(): Money {
    return this._valueTotal;
  }

  get status(): OrderStatus {
    return this._status;
  }

  setClient(client: Client): void {
    this._client = client
  }

  setStatus(status: OrderStatus): void {
    this._status = status
  }

  setPayment(payment: Payment) {
    this._payment = payment
  }
}
