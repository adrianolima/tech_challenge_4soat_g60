import { Client } from "../../domain/entities/client";

export type ClientResponse = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at: Date;
  updated_at: Date;
};

export const ClientAdapter = {
  adaptClients: function (data: Client[]): ClientResponse[] {
    if (data === null) return null;

    let allData = data.map((item) => {
      return {
        id: item.getId(),
        name: item.getName(),
        email: item.getEmail(),
        cpf: item.getCPF(),
        created_at: item.getCreatedAt(),
        updated_at: item.getUpdatedAt(),
      };
    });

    return allData;
  },

  adaptClient: function (data: Client): ClientResponse {
    if (data === null) return null;

    return {
      id: data.getId(),
      name: data.getName(),
      email: data.getEmail(),
      cpf: data.getCPF(),
      created_at: data.getCreatedAt(),
      updated_at: data.getUpdatedAt(),
    };
  },
};
