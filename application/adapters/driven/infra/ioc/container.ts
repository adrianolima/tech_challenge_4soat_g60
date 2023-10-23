import "reflect-metadata";
import { container } from "tsyringe";
import { ClientRepository } from "../../repository/clientRepository";
import { ClientService } from "../../../../core/services/clientService";
import { ProductRepository } from "../../repository/productRepository";
import { ProductsService } from "../../../../core/services/productsService";

container.register("IClientRepository", {
  useClass: ClientRepository,
});


container.register("ClientService", {
  useClass: ClientService,
});

container.register("IProductRepository", {
  useClass: ProductRepository,
});

container.register("ProductsService", {
  useClass: ProductsService,
});

