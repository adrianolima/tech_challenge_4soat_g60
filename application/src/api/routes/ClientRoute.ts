import * as express from "express";

import IAppRoute from "../../interfaces/IAppRoute";
import { handleAPIError } from "../error/APIErrorHandler";
import { DbConnection } from "../../interfaces/dbconnection";
import { Client } from "../../domain/entities/client";
import { CPF } from "../../domain/value_object/cpf";
import {ClientController} from "../../controllers/client.controller";

export default class ClientRoute implements IAppRoute {
  private dbConnection: DbConnection;

  protected ROUTE_BASE_PATH = "/api/clients";

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  setup(app: express.Application): void {
    app.route(this.ROUTE_BASE_PATH).get(async (req, res) => {
      try {
        const clientes = await ClientController.getAllClients(this.dbConnection);

        res.status(200).send(clientes);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH + "/:cpf").get(async (req, res) => {
      try {
        const cpf = new CPF(req.params.cpf);

        const cliente = await ClientController.getClientByCpf(cpf, this.dbConnection);

        res.status(200).send(cliente);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH).post(async (req, res) => {
      try {
        const { name, email, cpf } = req.body;

        const client = new Client(name, email, cpf);

        const savedClient = await ClientController.createClient(client, this.dbConnection);

        res.status(201).send(savedClient);
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
