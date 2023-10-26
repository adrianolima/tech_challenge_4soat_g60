import { Client } from "../../../core/entities/client";
import { IClientRepository } from "../../../core/ports/IClientRepository";
import { CPF } from "../../../core/valueObjects/cpf";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ClientRepository implements IClientRepository {
  async getClient(cpf: CPF): Promise<Client> {
    const client: any = await prisma.client.findUnique({
      where: {
        cpf: cpf.getCPF(),
      },
    });

    return client;
  }

  async getClients(): Promise<Client[]> {
    const clients: any = await prisma.client.findMany({});

    return clients;
  }

  async save(client: Client): Promise<string> {
    await prisma.client.create({
      data: {
        name: client.getName(),
        email: client.getEmail(),
        cpf: client.getCPF(),
      },
    });

    return "Cliente cadastrado com sucesso!";
  }
}
