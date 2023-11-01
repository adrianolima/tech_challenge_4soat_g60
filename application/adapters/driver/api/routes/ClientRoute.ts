import IAppRoute from "./IAppRoute";
import {CPF} from "../../../../core/valueObjects/cpf";
import {Client} from "../../../../core/entities/client";
import * as express from "express";
import {container} from "tsyringe";
import {ClientService} from "../../../../core/services/clientService";
import CPFExistsError from "../../../../core/errors/CPFExistsError";
import {Class} from "type-fest";
import APIErrorHandler from "../error/APIErrorHandler";
import {ClientResponseDTO} from "../dto/client";


export default class ClientRoute implements IAppRoute {
  private clientService = container.resolve(ClientService);


  setup(app: express.Application): void {


    app.route("/api/client").get(async (req, res) => {
      try {
        const clientes = await this.clientService.getClients()
        const mappedClients = clientes.map(this.mapToResponse)
        res.send(mappedClients);
      } catch (e) {
        this.handleError(res, e)
      }
    });

    app.route("/api/client/:cpf").get(async (req, res) => {

      try {
        const cliente = await this.clientService.getClient(new CPF(req.params.cpf))
        res.send(this.mapToResponse(cliente));
      } catch (e) {
        this.handleError(res, e)
      }
    });

    app.route("/api/client").post(async (req, res) => {
      try {
        const {name, email, cpf} = req.body;

        const client = new Client(name, email, cpf);

        const savedClient = await this.clientService.save(client)

        res.status(201)
        res.send(this.mapToResponse(savedClient));
      } catch (e) {
        this.handleError(res, e)
      }
    });
  }

  mapToResponse(client: Client): ClientResponseDTO {
    return {
      id: client.getId(),
      name: client.getName(),
      cpf: client.getCPF(),
      email: client.getEmail(),
      updated_at: client.getUpdatedAt(),
      created_at: client.getCreatedAt(),
    }
  }

  // @ts-ignore
  handleError(res: Response<any, any>, e: Error) {

    const statusCode = APIErrorHandler.getStatusCodeFor(e)

    res.status(statusCode)
    res.send({
      code: statusCode,
      error: e.message,
    });

  }

}