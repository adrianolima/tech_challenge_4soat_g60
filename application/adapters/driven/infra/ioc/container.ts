import "reflect-metadata";
import { container } from "tsyringe";
import { ClientRepository } from "../../repository/clientRepository";

container.register("IClientRepository", {
  useClass: ClientRepository,
});
