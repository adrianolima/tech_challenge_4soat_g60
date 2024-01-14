import {Client} from "../../../../core/entities/client";

export type ClientResponseDTO = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at: Date
  updated_at: Date
}

export function mapClientToResponse(client: Client): ClientResponseDTO {
  return {
    id: client.getId(),
    name: client.getName(),
    cpf: client.getCPF(),
    email: client.getEmail(),
    updated_at: client.getUpdatedAt(),
    created_at: client.getCreatedAt(),
  }
}