import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import "../../driven/infra/ioc/container";
import IAppRoute from "./routes/IAppRoute";
import OrderRoute from "./routes/OrderRoute";
import ClientRoute from "./routes/ClientRoute";
import swaggerUi = require("swagger-ui-express");
import fs = require("fs");
import ProductRoute from "./routes/ProductRoute";
import OrderQueueRoute from "./routes/OrderQueueRoute";

class StartUp {
  public app: express.Application;

  /* Swagger files start */
  private swaggerFile: any =
    process.cwd() + "/adapters/driver/api/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private swaggerDocument = JSON.parse(this.swaggerData);

  private routes: IAppRoute[] = [
    new OrderRoute(),
    new ClientRoute(),
    new ProductRoute(),
    new OrderQueueRoute(),
  ]

  /* Swagger files end */

  constructor() {
    this.app = express();

    this.middler();
    this.initRoutes();
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
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(compression());
  }

  initRoutes() {

    for (let route of this.routes) {
      route.setup(this.app)
    }

    this.app.route("/ping").get((req, res) => {
      res.send("pong");
    });

    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocument, null, null)
    );

  }
}

export default new StartUp();
