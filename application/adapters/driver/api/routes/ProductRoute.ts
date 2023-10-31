import IAppRoute from "./IAppRoute";
import {Product} from "../../../../core/entities/product";
import {Category} from "../../../../core/valueObjects/category";
import * as express from "express";
import {container} from "tsyringe";
import {ProductsService} from "../../../../core/services/productsService";

export default class ProductRoute implements IAppRoute {

  private productService = container.resolve(ProductsService);

  setup(app: express.Application): void {


    app.route("/api/products").get(async (req, res) => {
      res.send({products: await this.productService.list()});
    });

    app.route("/api/products").post(async (req, res) => {
      try {
        const {name, category, description, price} = req.body;

        const product = new Product(name, category, description, price);

        res.send({
          product: await this.productService.save(product),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });
    app.route("/api/products/:id").put(async (req, res) => {
      try {
        const {name, category, description, price} = req.body;

        const product = new Product(name, category, description, price);
        product.setId(+req.params.id)

        res.send({
          product: await this.productService.update(product),
        });

      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    app.route("/api/products/:id").delete(async (req, res) => {
      try {
        res.send({
          product: await this.productService.delete(+req.params.id),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });

    app.route("/api/products/:category").get(async (req, res) => {
      try {
        const category = new Category(
          req.params.category.charAt(0).toUpperCase() +
          req.params.category.slice(1)
        );
        res.send({
          products: await this.productService.listByCategory(category),
        });
      } catch (e) {
        res.send({
          error: e.message,
        });
      }
    });
  }

}