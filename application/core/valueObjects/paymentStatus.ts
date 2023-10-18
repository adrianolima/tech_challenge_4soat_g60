export class PaymentStatus {
  static PENDENTE = "Pendente";
  static PAGO = "Pago";
  static CANCELADO = "Cancelado";
  static RECUSADO = "Recusado";

  private status: string;

  constructor(status: string) {
    if (
      status !== PaymentStatus.PENDENTE &&
      status !== PaymentStatus.PAGO &&
      status !== PaymentStatus.CANCELADO &&
      status !== PaymentStatus.RECUSADO
    ) {
      validate("Status de pagamento inválido");
    }

    this.status = status;
  }

  public getStatus(): string {
    return this.status;
  }
}

const validate = (message: string) => {
  throw new Error(message);
};
