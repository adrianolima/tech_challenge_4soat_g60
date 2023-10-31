export interface IPaymentRepository {
  save(orderId: number): Promise<String>;
  pay(id: number): Promise<string>;
}
