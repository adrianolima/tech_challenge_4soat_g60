import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {IClientRepository} from "../ports/IClientRepository";
import {CPF} from "../valueObjects/cpf";
import {Client} from "../entities/client";
import RecordNotFoundError from "../errors/RecordNotFoundError";

@injectable()
export class ClientService {
  constructor(
    @inject("IClientRepository") private _clientRepository: IClientRepository
  ) {
  }

  /**
   * Get the client for the specified CPF, otherwise throws an error
   *
   * @throws RecordNotFoundError if no client found for the given CPF
   */
  async getClient(cpf: CPF): Promise<Client> {
    const client = await this._clientRepository.getClient(cpf);

    if (client == null) {
      throw new RecordNotFoundError(`No client found for the given CPF`)
    }

    return client
  }

  /**
   * Get the client for the specified ID, otherwise throws an error
   *
   * @throws RecordNotFoundError if no client found for the given id
   */
  async getClientByID(id: number): Promise<Client> {
    const client = await this._clientRepository.getClientByID(id);

    if (client == null) {
      throw new RecordNotFoundError(`No client found for the given ID`)
    }

    return client
  }

  async getClients(): Promise<Array<Client>> {
    return await this._clientRepository.getClients();
  }

  async save(client: Client): Promise<string> {
    return await this._clientRepository.save(client);
  }
}
