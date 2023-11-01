import IAppRoute from "./IAppRoute";
import {Product} from "../../../../core/entities/product";
import {Category} from "../../../../core/valueObjects/category";
import * as express from "express";
import {container} from "tsyringe";
import {ProductsService} from "../../../../core/services/productsService";
import {mapProductToResponse} from "../dto/product";
import {handleAPIError} from "../error/APIErrorHandler";

export default class ProductRoute implements IAppRoute {

  private productService = container.resolve(ProductsService);

  setup(app: express.Application): void {


    app.route("/api/products").get(async (req, res) => {
      const products = await this.productService.list()
      res.send(products.map(mapProductToResponse));
    });

    app.route("/api/products").post(async (req, res) => {
      try {
        const {name, category, description, price} = req.body;

        const product = new Product(name, category, description, price);
        const savedProduct = await this.productService.save(product)

        res.send(mapProductToResponse(savedProduct));
      } catch (e) {
        handleAPIError(res, e)
      }
    });

    app.route("/api/products/:id").put(async (req, res) => {
      try {
        const {name, category, description, price} = req.body;

        const product = new Product(name, category, description, price);
        product.setId(+req.params.id)

        const updatedProduct = await this.productService.update(product);

        res.send(mapProductToResponse(updatedProduct));

      } catch (e) {
        handleAPIError(res, e)
      }
    });

    app.route("/api/products/:id").delete(async (req, res) => {
      try {

        await this.productService.delete(+req.params.id)
        
        res.sendStatus(204)
      } catch (e) {
        handleAPIError(res, e)
      }
    });

    app.route("/api/products/:category").get(async (req, res) => {
      try {
        const category = new Category(
          req.params.category.charAt(0).toUpperCase() +
          req.params.category.slice(1)
        );

        const products = await this.productService.listByCategory(category)

        res.send(products.map(mapProductToResponse));
      } catch (e) {
        handleAPIError(res, e)
      }
    });
  }

}