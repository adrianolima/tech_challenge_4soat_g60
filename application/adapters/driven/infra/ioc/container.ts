import "reflect-metadata";
import { container } from "tsyringe";

import { ClientRepository } from "../../repository/clientRepository";
import { ClientService } from "../../../../core/services/clientService";
import { ProductRepository } from "../../repository/productRepository";
import { ProductsService } from "../../../../core/services/productsService";
import { PaymentRepository } from "../../repository/paymentRepository";
import { PaymentService } from "../../../../core/services/paymentService";
import MercadoPagoPaymentGateway from "../../gateway/mercadoPagoPaymentGateway";

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

container.register("IPaymentRepository", {
  useClass: PaymentRepository,
});

container.register("PaymentService", {
  useClass: PaymentService,
});

container.register("IPaymentGateway", {
  useClass: MercadoPagoPaymentGateway,
});
