import IAppRoute from "./IAppRoute";
import * as express from "express";
import { handleAPIError } from "../error/APIErrorHandler";
import { DbConnection } from "../../interfaces/dbconnection";

export default class ClientRoute implements IAppRoute {
  private dbConnection: DbConnection;

  protected ROUTE_BASE_PATH = "/api/client";

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  setup(app: express.Application): void {
    app.route(this.ROUTE_BASE_PATH).get(async (req, res) => {
      try {
        //TODO
        // const clientes = await this.clientService.getClients();
        // const mappedClients = clientes.map(mapClientToResponse);
        // res.send(mappedClients);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH + "/:cpf").get(async (req, res) => {
      try {
        //TODO
        // const cliente = await this.clientService.getClient(
        //   new CPF(req.params.cpf)
        // );
        // res.send(mapClientToResponse(cliente));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH).post(async (req, res) => {
      try {
        //TODO
        // const { name, email, cpf } = req.body;
        // const client = new Client(name, email, cpf);
        // const savedClient = await this.clientService.save(client);
        // res.status(201);
        // res.send(mapClientToResponse(savedClient));
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }

  // @ts-ignore
}
