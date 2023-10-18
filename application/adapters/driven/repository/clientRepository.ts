import { Client } from "../../../core/entities/client";
import { IClientRepository } from "../../../core/ports/IClientRepository";
import { CPF } from "../../../core/valueObjects/cpf";

export class ClientRepository implements IClientRepository {
  async getClient(cpf: CPF): Promise<Client> {
    throw new Error("Method not implemented.");
  }

  async getClients(): Promise<Client[]> {
    throw new Error("Method not implemented.");
  }

  async save(client: Client): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
