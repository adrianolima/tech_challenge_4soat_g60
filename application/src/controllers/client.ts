import { Client } from "../entities/client";
import { CPF } from "../entities/valueObjects/cpf";
import { ClientGateway } from "../gateways/clients";
import { DbConnection } from "../interfaces/dbconnection";
import { ClientUseCases } from "../usecases/client";

export class ClientController {
  static async getAllClients(dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const allClients = await ClientUseCases.getClients(clientGateway);

    return allClients;
  }

  static async getClientByCpf(cpf: CPF, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClient(cpf, clientGateway);

    return client;
  }

  static async getClientById(clientId: number, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClientByID(clientId, clientGateway);

    return client;
  }

  static async createClient(client: Client, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const newClient = ClientUseCases.save(client, clientGateway);

    return newClient;
  }
}
