import {Product} from "./product";

export class OrderItem {


    private _id: number;
    private _orderId: number;
    private _product: Product;
    private _quantity: number;
    private _value: number;
    private _total: number;

    constructor(product: Product, quantity: number) {
        this._product = product;
        this._quantity = quantity;
        this._value = product.getValueProduct()
        this._total = this._quantity * this._value
    }


    get id(): number {
        return this._id;
    }

    get orderId(): number {
        return this._orderId;
    }

    get product(): Product {
        return this._product;
    }

    get quantity(): number {
        return this._quantity;
    }

    get value(): number {
        return this._value;
    }

    get total(): number {
        return this._total;
    }
}

