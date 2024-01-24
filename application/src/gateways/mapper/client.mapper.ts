import {Client} from "../../domain/entities/client";
import ClientModel from "../model/client.model";

export class ClientModelMapper {
  static map(d: ClientModel): Client {
    return Client.New(d.id, d.name, d.email, d.cpf, d.created_at, d.updated_at);
  }
}