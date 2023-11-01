import "reflect-metadata";
import { describe, expect, it } from "@jest/globals";

import { Client } from "../core/entities/client";

describe("Testing client errors", () => {
  it("should return error when cpf is invalid", () => {
    expect(() => new Client("John Doe", "john@gmail.com", "123")).toThrow(
      "Este CPF é inválido"
    );
  });

  it("show return error when name is empty", () => {
    expect(() => new Client("", "john@gmail.com", "123.456.789-09")).toThrow(
      "O campo nome é obrigatório"
    );
  });
});
