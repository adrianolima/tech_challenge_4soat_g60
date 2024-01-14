import {Client} from "../../../core/entities/client";
import {IClientRepository} from "../../../core/ports/IClientRepository";
import {CPF} from "../../../core/valueObjects/cpf";
import {Prisma, PrismaClient} from "@prisma/client";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import CPFExistsError from "../../../core/errors/CPFExistsError";
import EmailExistsError from "../../../core/errors/EmailExistsError";

const prisma = new PrismaClient();
const prismaUniqueConstraintErrorCode = "P2002"

export type ClientData = {
  id: number
  cpf: string
  email: string
  name: string
  created_at?: Date
  updated_at?: Date
}

export class ClienteMapper {
  static map(d: ClientData): Client {
    return Client.New(
      d.id,
      d.name,
      d.email,
      d.cpf,
      d.created_at,
      d.updated_at
    )
  }
}

export class ClientRepository implements IClientRepository {
  async getClient(cpf: CPF): Promise<Client | undefined> {
    const client: any = await prisma.client.findUnique({
      where: {
        cpf: cpf.getCPF(),
      },
    });

    if (!client) return null

    return ClienteMapper.map(client);
  }

  async getClients(): Promise<Client[]> {
    const clients: any = await prisma.client.findMany({});

    return clients.map(ClienteMapper.map);
  }

  async save(client: Client): Promise<Client> {
    try {
      const saved = await prisma.client.create({
        data: {
          name: client.getName(),
          email: client.getEmail(),
          cpf: client.getCPF(),
        },
      });

      return ClienteMapper.map(saved)
    } catch (e) {

      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == prismaUniqueConstraintErrorCode) {

          if (e.message.includes("(`cpf`)")) {
            throw new CPFExistsError("The CPF entered already exists")
          }

          if (e.message.includes("(`email`)")) {
            throw new EmailExistsError("The email entered already exists")
          }
        }
      }

      throw e
    }
  }

  async getClientByID(Id: number): Promise<Client | undefined> {
    const cliente = await prisma.client.findUnique({
      where: {
        id: Id,
      },
    });

    if (!cliente) return null

    return ClienteMapper.map(cliente)
  }
}
