import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../ports/IClientRepository";
import { CPF } from "../valueObjects/cpf";
import { Client } from "../entities/client";

@injectable()
export class ClientService {
  constructor(
    @inject("IClientRepository") private _clientRepository: IClientRepository
  ) {}

  async getClient(cpf: CPF): Promise<Client> {
    return await this._clientRepository.getClient(cpf);
  }

  async getClients(): Promise<Array<Client>> {
    return await this._clientRepository.getClients();
  }

  async save(client: Client): Promise<string> {
    return await this._clientRepository.save(client);
  }
}
