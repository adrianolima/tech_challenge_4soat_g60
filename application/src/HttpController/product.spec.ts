import { describe, expect, jest, it, test } from "@jest/globals";
import { DbConnection } from "../interfaces/dbconnection";
import { afterEach, beforeEach } from "node:test";
import { ProductUseCases } from "../domain/usecases/product";
import { ProductController } from "./product";
import { ProductGateway } from "../gateways/repositories/products";
import { Category } from "../domain/value_object/category";

jest.mock("../domain/usecases/product");
jest.mock("../gateways/repositories/products");

const name = "Sobremesa";
const description = "Algo para comer";
const category = "Sobremesa";
const price = 5;
const active = true;

describe("ProductController", () => {
  let mockDbConnection: DbConnection;

  beforeEach(() => {
    mockDbConnection = mockDbConnection;
  });

  it(" Should get all products", async () => {
    const mockGetProducts = jest.spyOn(ProductUseCases, "list");
    mockGetProducts.mockResolvedValueOnce([]);

    const result = await ProductController.getAllProducts(mockDbConnection);

    expect(result).toEqual([]);
    expect(mockGetProducts).toHaveBeenCalledWith(expect.any(ProductGateway));
  });

  it(" Should get product by category", async () => {
    const mockGetProduct = jest.spyOn(ProductUseCases, "listByCategory");
    mockGetProduct.mockResolvedValueOnce(null);

    const result = await ProductController.getAllProductsByCategory(
      new Category("Lanche"),
      mockDbConnection
    );

    expect(result).toBeNull();
    expect(mockGetProduct).toHaveBeenCalledWith(
      { category: "Lanche" },
      expect.any(ProductGateway)
    );
  });

  it(" Should get all products", async () => {
    const mockGetProducts = jest.spyOn(ProductUseCases, "list");
    mockGetProducts.mockResolvedValueOnce([]);

    const result = await ProductController.getAllProducts(mockDbConnection);

    expect(result).toEqual([]);
    expect(mockGetProducts).toHaveBeenCalledWith(expect.any(ProductGateway));
  });

  it(" Should delete product by ID", async () => {
    const mockGetProduct = jest.spyOn(ProductUseCases, "delete");
    mockGetProduct.mockResolvedValueOnce(null);

    const result = await ProductController.deleteProduct(1, mockDbConnection);
    expect(result).toBeNull();
    expect(mockGetProduct).toHaveBeenCalledWith(1, expect.any(ProductGateway));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

