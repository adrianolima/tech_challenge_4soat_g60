import { CPF } from "../valueObjects/cpf";
import { Email } from "../valueObjects/email";
import { Name } from "../valueObjects/name";

export class Client {
  private Id: number;
  private Name: Name;
  private Email: Email;
  private CPF: CPF;

  constructor(name: string, email: string, cpf: string) {
    this.Name = new Name(name);
    this.Email = new Email(email);
    this.CPF = new CPF(cpf);
  }

  public getName(): string {
    return this.Name.getName();
  }

  public getEmail(): string {
    return this.Email.getEmail();
  }

  public getCPF(): string {
    return this.CPF.getCPF();
  }
}
