import {Client} from "../../domain/entities/client";
import {CPF} from "../../domain/value_object/cpf";
import CPFExistsError from "../../domain/error/CPFExistsError";
import EmailExistsError from "../../domain/error/EmailExistsError";
import {IClientGateway} from "../../interfaces/gateways";
import {DbConnection} from "../../interfaces/dbconnection";
import {ClientModelMapper} from "../mapper/client.mapper";
import ClientModel from "../model/client.model";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

const prismaUniqueConstraintErrorCode = "P2002";


export class ClientGateway implements IClientGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }

  async getClient(cpf: CPF): Promise<Client | undefined> {
    const client: ClientModel = await this.repositoryData.client.findUnique({
      where: {
        cpf: cpf.getCPF(),
      },
    });

    if (!client) return null;

    return ClientModelMapper.map(client);
  }

  async getClients(): Promise<Client[]> {
    const clients: ClientModel[] = await this.repositoryData.client.findMany({});

    return clients.map(ClientModelMapper.map);
  }

  async save(client: Client): Promise<Client> {
    try {
      const saved: ClientModel = await this.repositoryData.client.create({
        data: {
          name: client.getName(),
          email: client.getEmail(),
          cpf: client.getCPF(),
        },
      });

      return ClientModelMapper.map(saved);
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
    const cliente: ClientModel = await this.repositoryData.client.findUnique({
      where: {
        id: Id,
      },
    });

    if (!cliente) return null;

    return ClientModelMapper.map(cliente);
  }
}
