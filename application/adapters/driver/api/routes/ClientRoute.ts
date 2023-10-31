import IAppRoute from "./IAppRoute";
import {CPF} from "../../../../core/valueObjects/cpf";
import {Client} from "../../../../core/entities/client";
import * as express from "express";
import {container} from "tsyringe";
import {ClientService} from "../../../../core/services/clientService";

export default class ClientRoute implements IAppRoute {
  private clientService = container.resolve(ClientService);

  setup(app: express.Application): void {


    app.route("/api/client").get(async (req, res) => {
      res.send({clients: await this.clientService.getClients()});
    });

    app.route("/api/client/:cpf").get(async (req, res) => {
      res.send({
        client: await this.clientService.getClient(new CPF(req.params.cpf)),
      });
    });

    app.route("/api/client").post(async (req, res) => {
      try {
        const {name, email, cpf} = req.body;

        const client = new Client(name, email, cpf);

        const savedClient = await this.clientService.save(client)

        res.send({
          client: savedClient,
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });
  }

}