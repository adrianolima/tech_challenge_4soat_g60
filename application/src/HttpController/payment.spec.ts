import { describe, expect, jest, it, test } from "@jest/globals";
import { PaymentUseCases } from "../domain/usecases/payment";
import { afterEach, beforeEach } from "node:test";
import { DbConnection } from "../interfaces/dbconnection";
import { PaymentGateway } from "../gateways/repositories/payments";
import { PaymentGatewayGateway } from "../gateways/services/gateway";
import { OrderGateway } from "../gateways/repositories/orders";
import {PaymentController} from "./payment.controller";

jest.mock("../domain/usecases/payment");
jest.mock("../gateways/repositories/payments");

describe("PaymentController", () => {
  let mockDbConnection: DbConnection;

  beforeEach(() => {
    mockDbConnection = mockDbConnection;
  });

  it(" Should get all payments", async () => {
    const mockGetPayments = jest.spyOn(PaymentUseCases, "getAllPayments");
    mockGetPayments.mockResolvedValueOnce([]);

    const result = await PaymentController.getAllPayments(mockDbConnection);

    expect(result).toEqual([]);
    expect(mockGetPayments).toHaveBeenCalledWith(expect.any(PaymentGateway));
  });

  it(" Should get payment by ID", async () => {
    const mockGetPayment = jest.spyOn(PaymentUseCases, "getPayment");
    mockGetPayment.mockResolvedValueOnce(null);

    const result = await PaymentController.getPayment(1, mockDbConnection);

    expect(result).toBeNull();
    expect(mockGetPayment).toHaveBeenCalledWith(1, expect.any(PaymentGateway));
  });

  it(" Should create a new Payment", async () => {
    const mockGetPayment = jest.spyOn(PaymentUseCases, "save");
    mockGetPayment.mockResolvedValueOnce(null);

    const result = await PaymentController.createPayment(1, mockDbConnection);

    expect(result).toBeNull();
    expect(mockGetPayment).toHaveBeenCalledWith(
      1,

      expect.any(OrderGateway),
      expect.any(PaymentGatewayGateway),
      expect.any(PaymentGateway)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

