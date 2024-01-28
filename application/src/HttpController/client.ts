import { ClientPresenter } from "./presenters/client.presenter";
import { Client } from "../domain/entities/client";
import { CPF } from "../domain/value_object/cpf";
import { ClientGateway } from "../gateways/repositories/clients";
import { DbConnection } from "../interfaces/dbconnection";
import { ClientUseCases } from "../domain/usecases/client";

export class ClientController {
  static async getAllClients(dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const allClients = await ClientUseCases.getClients(clientGateway);

    const adapted = ClientPresenter.adaptClients(allClients);
    return adapted;
  }

  static async getClientByCpf(cpf: CPF, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClient(cpf, clientGateway);

    const adapted = ClientPresenter.adaptClient(client);
    return adapted;
  }

  static async getClientById(clientId: number, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClientByID(clientId, clientGateway);

    const adapted = ClientPresenter.adaptClient(client);
    return adapted;
  }

  static async createClient(client: Client, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const newClient = await ClientUseCases.save(client, clientGateway);

    const adapted = ClientPresenter.adaptClient(newClient);
    return adapted;
  }
}

