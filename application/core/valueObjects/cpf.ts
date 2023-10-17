export class CPF {
  private value: string;

  constructor(cpf: string) {
    this.value = cpf;

    if (this.value.length < 11) {
      validate("Este CPF é inválido");
    }
  }

  getCPF(): string {
    return this.value;
  }
}

const validate = (message: string) => {
  throw new Error(message);
};
