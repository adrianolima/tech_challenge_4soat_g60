import "reflect-metadata";
import { CPF } from "../value_object/cpf";
import { Client } from "../entities/client";
import RecordNotFoundError from "../error/RecordNotFoundError";
import { IClientGateway } from "../../interfaces/gateways";

export class ClientUseCases {
  static async getClient(
    cpf: CPF,
    clientGateway: IClientGateway
  ): Promise<Client> {
    const client = await clientGateway.getClient(cpf);

    if (client == null) {
      throw new RecordNotFoundError(
        `Não foi encontrado nenhum cliente pelo CPF fornecido!`
      );
    }

    return client;
  }

  static async getClientByID(
    id: number,
    clientGateway: IClientGateway
  ): Promise<Client> {
    const client = await clientGateway.getClientByID(id);

    if (client == null) {
      throw new RecordNotFoundError(
        `Não foi encontrado nenhum cliente pelo ID fornecido!`
      );
    }

    return client;
  }

  static async getClients(
    clientGateway: IClientGateway
  ): Promise<Array<Client>> {
    return await clientGateway.getClients();
  }

  static async save(
    client: Client,
    clientGateway: IClientGateway
  ): Promise<Client> {
    return await clientGateway.save(client);
  }
}
