import { Product } from "./product";

export class OrderItem {
  get value(): number {
    return this._value;
  }
    private id: number;
    private orderId: number;
    private product: Product;
    private quantity: number;
    private _value: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
    this._value = product.getValueProduct()
  }
}

