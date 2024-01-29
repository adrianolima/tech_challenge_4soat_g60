import {Client} from "../domain/entities/client";
import {CPF} from "../domain/value_object/cpf";
import {ClientGateway} from "../gateways/repositories/clients";
import {DbConnection} from "../interfaces/dbconnection";
import {ClientUseCases} from "../domain/usecases/client";
import {ClientPresenter} from "./presenters/client.presenter";

export class ClientController {
  static async getAllClients(dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const allClients = await ClientUseCases.getClients(clientGateway);
    return ClientPresenter.mapList(allClients);
  }

  static async getClientByCpf(cpf: CPF, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClient(cpf, clientGateway);
    return ClientPresenter.map(client);
  }

  static async getClientById(clientId: number, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClientByID(clientId, clientGateway);
    return ClientPresenter.map(client);
  }

  static async createClient(client: Client, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const newClient = await ClientUseCases.save(client, clientGateway);
    return ClientPresenter.map(newClient);
  }
}

