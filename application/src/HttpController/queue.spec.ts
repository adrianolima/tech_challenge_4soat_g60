import { describe, expect, jest, it, test } from "@jest/globals";
import { OrderQueueUseCases } from "../domain/usecases/queue";
import { afterEach, beforeEach } from "node:test";
import { OrderGateway } from "../gateways/repositories/orders";
import { DbConnection } from "../interfaces/dbconnection";
import {OrderQueueController} from "./queue.controller";

jest.mock("../domain/usecases/queue");

describe("OrderQueueController", () => {
  let mockDbConnection: DbConnection;

  beforeEach(() => {
    mockDbConnection = mockDbConnection;
  });

  it("should get orders with status pending", async () => {
    const mockGetPendingOrders = jest.spyOn(
      OrderQueueUseCases,
      "getPendingOrders"
    );
    mockGetPendingOrders.mockResolvedValueOnce([]);

    const result = await OrderQueueController.getOrdersWithStatusPending(
      mockDbConnection
    );

    expect(result).toEqual([]);
    expect(mockGetPendingOrders).toHaveBeenCalledWith(expect.any(OrderGateway));
  });

  it("should get orders with status preparing", async () => {
    const mockGetPreparingOrders = jest.spyOn(
      OrderQueueUseCases,
      "getPreparingOrders"
    );
    mockGetPreparingOrders.mockResolvedValueOnce(null);

    const result = await OrderQueueController.getOrdersWithStatusPreparing(
      mockDbConnection
    );
    expect(result).toBeNull();
    expect(mockGetPreparingOrders).toHaveBeenCalledWith(
      expect.any(OrderGateway)
    );
  });

  it("should get orders with status prepared", async () => {
    const mockGetPreparedOrders = jest.spyOn(
      OrderQueueUseCases,
      "getPreparedOrders"
    );
    mockGetPreparedOrders.mockResolvedValueOnce(null);

    const result = await OrderQueueController.getOrdersWithStatusPrepared(
      mockDbConnection
    );

    expect(result).toBeNull();
    expect(mockGetPreparedOrders).toHaveBeenCalledWith(
      expect.any(OrderGateway)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

