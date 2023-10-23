import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import { container } from "tsyringe";

import { ClientService } from "../../../core/services/clientService";
import { ProductsService } from "../../../core/services/productsService";
import "../../driven/infra/ioc/container";
import { Category } from "../../../core/valueObjects/category";

class StartUp {
  public app: express.Application;
  private clientService = container.resolve(ClientService);
  private productService = container.resolve(ProductsService);

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

    this.app.route("/clients").get(async (req, res) => {
      res.send({ clients: await this.clientService.getClients() });
    });

    this.app.route("/products").get(async (req, res) => {
      res.send({ products: await this.productService.list() });
    });

    this.app.route("/products/:category").get(async (req, res, next) => {
     
      try {
        const category = new Category(
          req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)
        );
        res.send({ products: await this.productService.listByCategory(category) });
      } catch(e){
        next(e)
      }
      
    });
  }
}

export default new StartUp();
