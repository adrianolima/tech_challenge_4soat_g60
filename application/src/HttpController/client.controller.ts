<<<<<<<< HEAD:application/src/HttpController/client.ts
import { ClientPresenter } from "./presenters/client.presenter";
import { Client } from "../domain/entities/client";
import { CPF } from "../domain/value_object/cpf";
import { ClientGateway } from "../gateways/repositories/clients";
import { DbConnection } from "../interfaces/dbconnection";
import { ClientUseCases } from "../domain/usecases/client";
========
import {Client} from "../domain/entities/client";
import {CPF} from "../domain/value_object/cpf";
import {ClientGateway} from "../gateways/repositories/clients";
import {DbConnection} from "../interfaces/dbconnection";
import {ClientUseCases} from "../domain/usecases/client";
import {ClientPresenter} from "./presenter/client.presenter";
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/client.controller.ts

export class ClientController {
  static async getAllClients(dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const allClients = await ClientUseCases.getClients(clientGateway);
<<<<<<<< HEAD:application/src/HttpController/client.ts

    const adapted = ClientPresenter.adaptClients(allClients);
    return adapted;
========
    return ClientPresenter.mapList(allClients);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/client.controller.ts
  }

  static async getClientByCpf(cpf: CPF, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClient(cpf, clientGateway);
<<<<<<<< HEAD:application/src/HttpController/client.ts

    const adapted = ClientPresenter.adaptClient(client);
    return adapted;
========
    return ClientPresenter.map(client);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/client.controller.ts
  }

  static async getClientById(clientId: number, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const client = await ClientUseCases.getClientByID(clientId, clientGateway);
<<<<<<<< HEAD:application/src/HttpController/client.ts

    const adapted = ClientPresenter.adaptClient(client);
    return adapted;
========
    return ClientPresenter.map(client);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/client.controller.ts
  }

  static async createClient(client: Client, dbConnection: DbConnection) {
    const clientGateway = new ClientGateway(dbConnection);
    const newClient = await ClientUseCases.save(client, clientGateway);
<<<<<<<< HEAD:application/src/HttpController/client.ts

    const adapted = ClientPresenter.adaptClient(newClient);
    return adapted;
========
    return ClientPresenter.map(newClient);
>>>>>>>> 0106251 (Ajustes clean arch):application/src/HttpController/client.controller.ts
  }
}

