export class OrderStatus {
  static CRIADO = "Criado"; // Pedido criado mas não associado a nenhum cliente
  static CANCELADO = "Cancelado"; // Cliente desistiu do pagamento
  static AGUARDANDO_PAGAMENTO = "Aguardando Pagamento"; // Cliente se autenticou (fez cadastro)
  static AGUARDANDO_PREPARO = "Aguardando Preparo"; // Cliente realizou o pagamento
  static EM_PREPARACAO = "Em preparação";
  static PRONTO = "Pronto";
  static ENTREGUE = "Entregue";

  private status: string;

  constructor(status: string) {
    if (
      ![
        OrderStatus.CRIADO,
        OrderStatus.CANCELADO,
        OrderStatus.AGUARDANDO_PAGAMENTO,
        OrderStatus.AGUARDANDO_PREPARO,
        OrderStatus.EM_PREPARACAO,
        OrderStatus.PRONTO,
        OrderStatus.ENTREGUE,
      ].includes(status)
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
