import { inject, injectable } from "tsyringe";

import { IPaymentRepository } from "../ports/IPaymentRepository";

@injectable()
export class PaymentService implements IPaymentRepository {
  constructor(
    @inject("IPaymentRepository") private _clientRepository: IPaymentRepository
  ) {}

  async save(orderId: number): Promise<String> {
    return await this._clientRepository.save(orderId);
  }

  async pay(id: number): Promise<string> {
    return await this._clientRepository.pay(id);
  }
}
