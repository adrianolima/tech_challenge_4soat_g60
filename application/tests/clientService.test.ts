import "reflect-metadata";
import { describe, expect, it } from "@jest/globals";
import { container } from "tsyringe";
import { ClientRepository } from "../adapters/driven/repository/clientRepository";
import { ClientService } from "../core/services/clientService";
import { Client } from "../core/entities/client";

container.register("IClientRepository", {
  useClass: ClientRepository,
});

describe("Testing create client", () => {
  it("show return success message when client is created", async () => {
    let clientService = container.resolve(ClientService);
    const client = new Client("John Doe", "jhon@gmail.com", "123.456.789-09");

    let newClient = await clientService.save(client);

    expect(newClient).toEqual("Cliente cadastrado com sucesso!");
  });
});
