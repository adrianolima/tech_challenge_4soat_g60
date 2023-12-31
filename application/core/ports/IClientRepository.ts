import { Client } from "../entities/client";
import { CPF } from "../valueObjects/cpf";

export interface IClientRepository {
  getClient(cpf: CPF): Promise<Client | undefined>;
  getClientByID(Id: number): Promise<Client | undefined>;
  getClients(): Promise<Array<Client>>;
  save(client: Client): Promise<Client>;
}
