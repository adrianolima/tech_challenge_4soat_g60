import { Client } from "../../src/entities/client";
import { CPF } from "../../src/entities/valueObjects/cpf";
import { Prisma } from "@prisma/client";
import CPFExistsError from "../../src/entities/errors/CPFExistsError";
import EmailExistsError from "../../src/entities/errors/EmailExistsError";
import { IClientGateway } from "../interfaces/gateways";
// @ts-ignore
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { DbConnection } from "../interfaces/dbconnection";

const prismaUniqueConstraintErrorCode = "P2002";

export type ClientData = {
  id: number;
  cpf: string;
  email: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};

export class ClienteMapper {
  static map(d: ClientData): Client {
    return Client.New(d.id, d.name, d.email, d.cpf, d.created_at, d.updated_at);
  }
}

export class ClientGateway implements IClientGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }

  async getClient(cpf: CPF): Promise<Client | undefined> {
    const client: any = await this.repositoryData.client.findUnique({
      where: {
        cpf: cpf.getCPF(),
      },
    });

    if (!client) return null;

    return ClienteMapper.map(client);
  }

  async getClients(): Promise<Client[]> {
    const clients: any = await this.repositoryData.client.findMany({});

    return clients.map(ClienteMapper.map);
  }

  async save(client: Client): Promise<Client> {
    try {
      const saved = await this.repositoryData.client.create({
        data: {
          name: client.getName(),
          email: client.getEmail(),
          cpf: client.getCPF(),
        },
      });

      return ClienteMapper.map(saved);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == prismaUniqueConstraintErrorCode) {
          if (e.message.includes("(`cpf`)")) {
            throw new CPFExistsError("Esste CPF já existe na nossa base!");
          }

          if (e.message.includes("(`email`)")) {
            throw new EmailExistsError("Esse e-mail já existe na nossa base!");
          }
        }
      }

      throw e;
    }
  }

  async getClientByID(Id: number): Promise<Client | undefined> {
    const cliente = await this.repositoryData.client.findUnique({
      where: {
        id: Id,
      },
    });

    if (!cliente) return null;

    return ClienteMapper.map(cliente);
  }
}
