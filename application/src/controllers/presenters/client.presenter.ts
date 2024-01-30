import {Client} from "../../domain/entities/client";
import {ClientResponse} from "../model/client.response.model";


export class ClientPresenter {
  static mapList(data: Client[]): ClientResponse[] {
    return data.map(ClientPresenter.map);
  }

  static map(data: Client): ClientResponse {
    return {
      id: data.getId(),
      name: data.getName(),
      email: data.getEmail(),
      cpf: data.getCPF(),
      created_at: data.getCreatedAt(),
      updated_at: data.getUpdatedAt(),
    };
  }
}
