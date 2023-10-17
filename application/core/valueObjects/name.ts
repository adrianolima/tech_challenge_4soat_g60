export class Name {
  private value: string;

  constructor(name: string) {
    this.value = name;
    if (this.value) {
      validate("O campo nome é obrigatório");
    }

    if (this.value.length < 3) {
      validate("O nome deve ter no mínimo 3 caracteres");
    }
  }

  getName(): string {
    return this.value;
  }
}

const validate = (message: string) => {
  throw new Error(message);
};
