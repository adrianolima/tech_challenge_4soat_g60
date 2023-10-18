import { PaymentStatus } from "../valueObjects/paymentStatus";
import { Order } from "./order";

export class Payment {
  private Id: number;
  private order: Order;
  private status: PaymentStatus;

  constructor(order: Order) {
    this.order = order;
    this.status = new PaymentStatus(PaymentStatus.PENDENTE);
  }

  public doPayment(): void {
    this.status = new PaymentStatus(PaymentStatus.PAGO);
  }
}
