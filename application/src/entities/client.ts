import { CPF } from "./valueObjects/cpf";
import { Email } from "./valueObjects/email";
import { Name } from "./valueObjects/name";

export class Client {
  private id: number;
  private name: Name;
  private email: Email;
  private cpf: CPF;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor(name: string, email: string, cpf: string) {
    this.name = new Name(name);
    this.email = new Email(email);
    this.cpf = new CPF(cpf);
  }

  static New(
    id: number,
    name: string,
    email: string,
    cpf: string,
    createdAt?: Date,
    updatedAt?: Date
  ): Client {
    const c = new Client(name, email, cpf);
    c.id = id;
    c.createdAt = createdAt;
    c.updatedAt = updatedAt;
    return c;
  }

  public getName(): string {
    return this.name.getName();
  }

  public getEmail(): string {
    return this.email.getEmail();
  }

  public getCPF(): string {
    return this.cpf.getCPF();
  }

  getId() {
    return this.id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
