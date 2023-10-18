export class OrderStatus {
  static EM_PREPARACAO = "Em preparação";
  static PRONTO = "Pronto";
  static RECEBIDO = "Recebido";
  static FINALIZADO = "Finalizado";

  private status: string;

  constructor(status: string) {
    if (
      status !== OrderStatus.EM_PREPARACAO &&
      status !== OrderStatus.FINALIZADO &&
      status !== OrderStatus.PRONTO &&
      status !== OrderStatus.FINALIZADO
    ) {
      validate("Status de pedido inválido");
    }

    this.status = status;
  }

  getStatus(): string {
    return this.status;
  }
}

const validate = (message: string) => {
  throw new Error(message);
};
