import { describe, expect, jest, it, test } from "@jest/globals";
import { ClientController } from "./client";
import { ClientUseCases } from "../domain/usecases/client";
import { Client } from "../domain/entities/client";
import { afterEach, beforeEach } from "node:test";
import { DbConnection } from "../interfaces/dbconnection";
import { CPF } from "../domain/value_object/cpf";
import { ClientGateway } from "../gateways/repositories/clients";

jest.mock("../domain/usecases/client");
jest.mock("../gateways/repositories/clients");

const name = "Janne Doe";
const email = "janne@mail.com";
const cpf = "00000000000";

const expectClient = new Client(name, email, cpf);

describe("ClientController", () => {
  let mockDbConnection: DbConnection;

  beforeEach(() => {
    mockDbConnection = mockDbConnection;
  });

  it(" Should get all clients", async () => {
    const mockGetClients = jest.spyOn(ClientUseCases, "getClients");
    mockGetClients.mockResolvedValueOnce([]);

    const result = await ClientController.getAllClients(mockDbConnection);

    expect(result).toEqual([]);
    expect(mockGetClients).toHaveBeenCalledWith(expect.any(ClientGateway));
  });

  it(" Should get client by CPF", async () => {
    const mockGetClient = jest.spyOn(ClientUseCases, "getClient");
    mockGetClient.mockResolvedValueOnce(null);

    const result = await ClientController.getClientByCpf(
      new CPF("12345678900"),
      mockDbConnection
    );

    expect(result).toBeNull();
    expect(mockGetClient).toHaveBeenCalledWith(
      new CPF("12345678900"),
      expect.any(ClientGateway)
    );
  });

  it(" Should get client by ID", async () => {
    const mockGetClient = jest.spyOn(ClientUseCases, "getClientByID");
    mockGetClient.mockResolvedValueOnce(null);

    const result = await ClientController.getClientById(1, mockDbConnection);

    expect(result).toBeNull();
    expect(mockGetClient).toHaveBeenCalledWith(1, expect.any(ClientGateway));
  });

  it(" Should create a new Client", async () => {
    const mockGetClient = jest.spyOn(ClientUseCases, "save");
    mockGetClient.mockResolvedValueOnce(null);

    const result = await ClientController.createClient(
      expectClient,
      mockDbConnection
    );

    expect(result).toBeNull();
    expect(mockGetClient).toHaveBeenCalledWith(
      expectClient,
      expect.any(ClientGateway)
    );
  });

  it(" Should handle an error when getting client by CPF", async () => {
    const mockGetClients = jest.spyOn(ClientUseCases, "getClient");
    mockGetClients.mockImplementationOnce(() => {
      throw new Error("Não foi encontrado nenhum cliente pelo CPF fornecido!");
    });

    await expect(
      ClientController.getClientByCpf(new CPF("12345678900"), mockDbConnection)
    ).rejects.toThrowError(
      "Não foi encontrado nenhum cliente pelo CPF fornecido!"
    );

    expect(mockGetClients).toHaveBeenCalledWith(
      new CPF("12345678900"),
      expect.any(ClientGateway)
    );

    jest.restoreAllMocks();
  });

  it(" Should handle an error when getting client by ID", async () => {
    const mockGetClients = jest.spyOn(ClientUseCases, "getClientByID");
    mockGetClients.mockImplementationOnce(() => {
      throw new Error("Não foi encontrado nenhum cliente pelo ID fornecido!");
    });

    await expect(
      ClientController.getClientById(1, mockDbConnection)
    ).rejects.toThrowError(
      "Não foi encontrado nenhum cliente pelo ID fornecido!"
    );

    expect(mockGetClients).toHaveBeenCalledWith(1, expect.any(ClientGateway));

    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

