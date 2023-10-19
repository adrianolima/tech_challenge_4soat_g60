import { CPF } from "../valueObjects/cpf";
import { Email } from "../valueObjects/email";
import { Name } from "../valueObjects/name";

export class Client {
  private id: number;
  private name: Name;
  private email: Email;
  private CPF: CPF;

  constructor(name: string, email: string, cpf: string) {
    this.name = new Name(name);
    this.email = new Email(email);
    this.CPF = new CPF(cpf);
  }

  public getName(): string {
    return this.name.getName();
  }

  public getEmail(): string {
    return this.email.getEmail();
  }

  public getCPF(): string {
    return this.CPF.getCPF();
  }
}
