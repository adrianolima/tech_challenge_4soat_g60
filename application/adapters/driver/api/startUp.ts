import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";

class StartUp {
  public app: express.Application;

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
  }
}

export default new StartUp();
