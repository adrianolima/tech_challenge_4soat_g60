import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import { container } from "tsyringe";

import { ClientService } from "../../../core/services/clientService";
import "../../driven/infra/ioc/container";

class StartUp {
  public app: express.Application;
  private clientService = container.resolve(ClientService);

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
  }
}

export default new StartUp();
