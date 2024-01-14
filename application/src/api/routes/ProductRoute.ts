import IAppRoute from "./IAppRoute";
import { Product } from "../../entities/product";
import { Category } from "../../entities/valueObjects/category";
import * as express from "express";
import { container } from "tsyringe";
import { mapProductToResponse } from "../dto/product";
import { handleAPIError } from "../error/APIErrorHandler";
import { DbConnection } from "../../interfaces/dbconnection";

export default class ProductRoute implements IAppRoute {
  private dbConnection: DbConnection;

  protected ROUTE_BASE_PATH = "/api/products";

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  setup(app: express.Application): void {
    app.route(this.ROUTE_BASE_PATH).get(async (req, res) => {
      // const products = await this.productService.list();
      // res.send(products.map(mapProductToResponse));
    });

    app.route(this.ROUTE_BASE_PATH).post(async (req, res) => {
      try {
        // const { name, category, description, price, active } = req.body;
        // const product = new Product(name, category, description, price, active);
        // const savedProduct = await this.productService.save(product);
        // res.send(mapProductToResponse(savedProduct));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH + "/:id").put(async (req, res) => {
      try {
        // const { name, category, description, price, active } = req.body;
        // const product = new Product(name, category, description, price, active);
        // product.setId(+req.params.id);
        // const updatedProduct = await this.productService.update(product);
        // res.send(mapProductToResponse(updatedProduct));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH + "/:id").delete(async (req, res) => {
      try {
        // await this.productService.delete(+req.params.id);
        // res.sendStatus(204);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH + "/:category").get(async (req, res) => {
      try {
        // const category = new Category(
        //   req.params.category.charAt(0).toUpperCase() +
        //     req.params.category.slice(1)
        // );
        // const products = await this.productService.listByCategory(category);
        // res.send(products.map(mapProductToResponse));
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
