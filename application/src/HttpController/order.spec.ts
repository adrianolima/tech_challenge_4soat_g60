import { describe, expect, jest, it, test } from "@jest/globals";
import { DbConnection } from "../interfaces/dbconnection";
import { afterEach, beforeEach } from "node:test";
import { OrderUseCases } from "../domain/usecases/order";
import { OrderController } from "./order";
import { OrderGateway } from "../gateways/repositories/orders";
import { Order } from "../domain/entities/order";
import { OrderItem } from "../domain/entities/orderItem";
import { Product } from "../domain/entities/product";
import { ProductGateway } from "../gateways/repositories/products";
import ProductInactiveError from "../domain/error/ProductInactiveError";
import RecordNotFoundError from "../domain/error/RecordNotFoundError";
import { ClientGateway } from "../gateways/repositories/clients";

jest.mock("../domain/usecases/order");
jest.mock("../gateways/repositories/orders");

const id = 1;
const orderId = 2;
const value = 236.5;
const total = 600;

const name = "Bebida";
const description = "Algo para beber";
const category = "Bebida";
const price = 5;
const active = true;

const product = new Product(name, category, description, price, active);
const quantity = 56;

const products = new OrderItem(product, quantity);

const order = new Order([products, products]);

describe("OrderController", () => {
  let mockDbConnection: DbConnection;

  beforeEach(() => {
    mockDbConnection = mockDbConnection;
  });

  it(" Should get all orders", async () => {
    const mockGetOrders = jest.spyOn(OrderUseCases, "listAll");
    mockGetOrders.mockResolvedValueOnce([]);

    const result = await OrderController.getAllOrders(mockDbConnection);

    expect(result).toEqual([]);
    expect(mockGetOrders).toHaveBeenCalledWith(expect.any(OrderGateway));
  });

  it(" Should get order by ID", async () => {
    const mockGetOrder = jest.spyOn(OrderUseCases, "getOrderByID");
    mockGetOrder.mockResolvedValueOnce(null);

    const result = await OrderController.getOrderById(1, mockDbConnection);

    expect(result).toBeNull();
    expect(mockGetOrder).toHaveBeenCalledWith(1, expect.any(OrderGateway));
  });

  it(" Should handle a error when can't get order by ID", async () => {
    const mockGetOrder = jest.spyOn(OrderUseCases, "getOrderByID");
    mockGetOrder.mockImplementationOnce(() => {
      throw new RecordNotFoundError(
        "Nenhum pedido foi encontrado pelo ID fornecido: 1"
      );
    });

    await expect(
      OrderController.getOrderById(1, mockDbConnection)
    ).rejects.toThrowError("Nenhum pedido foi encontrado pelo ID fornecido: 1");

    expect(mockGetOrder).toHaveBeenCalledWith(1, expect.any(OrderGateway));
    jest.restoreAllMocks();
  });

  it(" Should create a new Order", async () => {
    const mockGetOrder = jest.spyOn(OrderUseCases, "save");
    mockGetOrder.mockResolvedValueOnce(null);

    const result = await OrderController.createOrder(order, mockDbConnection);

    expect(result).toBeNull();
    expect(mockGetOrder).toHaveBeenCalledWith(
      order,
      expect.any(OrderGateway),
      expect.any(ProductGateway)
    );
  });

  it(" Should get link a orber to a custumer by ID", async () => {
    const mockGetOrder = jest.spyOn(OrderUseCases, "linkToClient");
    mockGetOrder.mockResolvedValueOnce(null);

    const result = await OrderController.linkClientToOrder(
      1,
      2,
      mockDbConnection
    );

    expect(result).toBeNull();

    expect(mockGetOrder).toHaveBeenCalledWith(
      1,
      expect.any(OrderGateway),
      expect.any(ClientGateway),
      2
    );
  });

  it(" Should update a existing Order", async () => {
    const mockGetOrder = jest.spyOn(OrderUseCases, "updateOrderStatus");
    mockGetOrder.mockResolvedValueOnce(null);

    const result = await OrderController.updateOrder(
      1,
      order,
      mockDbConnection
    );

    expect(result).toBeNull();
    expect(mockGetOrder).toHaveBeenCalledWith(
      1,
      order,
      expect.any(OrderGateway)
    );
  });

  it(" Should handle a error when try to update a non existing Order by ID", async () => {
    const mockGetOrder = jest.spyOn(OrderUseCases, "updateOrderStatus");
    mockGetOrder.mockImplementationOnce(() => {
      throw new RecordNotFoundError(
        "Nenhum produto foi encontrado pelo ID fornecido: 1"
      );
    });

    await expect(
      OrderController.updateOrder(1, order, mockDbConnection)
    ).rejects.toThrowError(
      "Nenhum produto foi encontrado pelo ID fornecido: 1"
    );

    expect(mockGetOrder).toHaveBeenCalledWith(
      1,
      order,
      expect.any(OrderGateway)
    );
    jest.restoreAllMocks();
  });

  it(" Should handle a error when try to update a non existing Order by ID", async () => {
    const mockGetOrder = jest.spyOn(OrderUseCases, "updateOrderStatus");
    mockGetOrder.mockImplementationOnce(() => {
      throw new ProductInactiveError(
        "O produto requisitado está indisponível: Batata"
      );
    });

    await expect(
      OrderController.updateOrder(1, order, mockDbConnection)
    ).rejects.toThrowError("O produto requisitado está indisponível: Batata");

    expect(mockGetOrder).toHaveBeenCalledWith(
      1,
      order,
      expect.any(OrderGateway)
    );
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

