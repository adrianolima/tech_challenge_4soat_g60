import "reflect-metadata";
import { container } from "tsyringe";
import { ClientRepository } from "../../repository/clientRepository";
import { ClientService } from "../../../../core/services/clientService";

container.register("IClientRepository", {
  useClass: ClientRepository,
});


container.register("ClientService", {
  useClass: ClientService,
});
