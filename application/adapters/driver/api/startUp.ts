import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import { container } from "tsyringe";
import swaggerUi = require("swagger-ui-express");
import fs = require("fs");

import { ClientService } from "../../../core/services/clientService";
import { ProductsService } from "../../../core/services/productsService";
import "../../driven/infra/ioc/container";
import { Category } from "../../../core/valueObjects/category";
import { CPF } from "../../../core/valueObjects/cpf";
import { Client } from "../../../core/entities/client";
import { Product } from "../../../core/entities/product";
import { Payment } from "../../../core/entities/payment";
import { PaymentService } from "../../../core/services/paymentService";

class StartUp {
  public app: express.Application;
  private clientService = container.resolve(ClientService);
  private productService = container.resolve(ProductsService);
  private paymentService = container.resolve(PaymentService);

  /* Swagger files start */
  private swaggerFile: any =
    process.cwd() + "/adapters/driver/api/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.app = express();

    this.middler();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,OPTIONS,PUT,POST,DELETE",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send({ message: "Api está online" });
    });

    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocument, null, null)
    );

    this.app.route("/api/clients").get(async (req, res) => {
      res.send({ clients: await this.clientService.getClients() });
    });

    this.app.route("/api/client/:cpf").get(async (req, res) => {
      res.send({
        client: await this.clientService.getClient(new CPF(req.params.cpf)),
      });
    });

    this.app.route("/api/client").post(async (req, res) => {
      try {
        const { name, email, cpf } = req.body;

        const client = new Client(name, email, cpf);

        res.send({
          client: await this.clientService.save(client),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    this.app.route("/api/products").get(async (req, res) => {
      res.send({ products: await this.productService.list() });
    });

    this.app.route("/api/products").post(async (req, res) => {
      try {
        const { name, category, description, price } = req.body;

        const product = new Product(name, category, description, price);

        res.send({
          product: await this.productService.save(product),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    this.app.route("/api/products/:id").put(async (req, res) => {
      try {
        const { name, category, description, price } = req.body;

        const product = new Product(name, category, description, price);
        product.setId(+req.params.id);

        res.send({
          product: await this.productService.update(product),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    this.app.route("/api/products/:id").delete(async (req, res) => {
      try {
        res.send({
          product: await this.productService.delete(+req.params.id),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    this.app.route("/api/products/:category").get(async (req, res) => {
      try {
        const category = new Category(
          req.params.category.charAt(0).toUpperCase() +
            req.params.category.slice(1)
        );

        res.send({
          products: await this.productService.listByCategory(category),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    this.app.route("/api/payments").post(async (req, res) => {
      const { order_id } = req.body;

      try {
        res.send({
          payment: await this.paymentService.save(order_id),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    this.app.route("/api/payments/:id/pay").put(async (req, res) => {
      try {
        res.send({
          payment: await this.paymentService.pay(Number(req.params.id)),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });
  }
}

export default new StartUp();
