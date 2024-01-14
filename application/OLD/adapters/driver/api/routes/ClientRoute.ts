import IAppRoute from "./IAppRoute";
import {CPF} from "../../../../core/valueObjects/cpf";
import {Client} from "../../../../core/entities/client";
import * as express from "express";
import {container} from "tsyringe";
import {ClientService} from "../../../../core/services/clientService";
import {handleAPIError} from "../error/APIErrorHandler";
import {mapClientToResponse} from "../dto/client";


export default class ClientRoute implements IAppRoute {
  private clientService = container.resolve(ClientService);


  setup(app: express.Application): void {


    app.route("/api/client").get(async (req, res) => {
      try {
        const clientes = await this.clientService.getClients()
        const mappedClients = clientes.map(mapClientToResponse)
        res.send(mappedClients);
      } catch (e) {
        handleAPIError(res, e)
      }
    });

    app.route("/api/client/:cpf").get(async (req, res) => {

      try {
        const cliente = await this.clientService.getClient(new CPF(req.params.cpf))
        res.send(mapClientToResponse(cliente));
      } catch (e) {
        handleAPIError(res, e)
      }
    });

    app.route("/api/client").post(async (req, res) => {
      try {
        const {name, email, cpf} = req.body;

        const client = new Client(name, email, cpf);

        const savedClient = await this.clientService.save(client)

        res.status(201)
        res.send(mapClientToResponse(savedClient));
      } catch (e) {
        handleAPIError(res, e)
      }
    });
  }


  // @ts-ignore


}