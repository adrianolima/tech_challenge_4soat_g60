import { Product } from "../../src/entities/product";
import { Category } from "../../src/entities/valueObjects/category";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import RecordNotFoundError from "../../src/entities/errors/RecordNotFoundError";
import { IProductGateway } from "../interfaces/gateways";
import { DbConnection } from "../interfaces/dbconnection";

const prismaErrorRecordNotFound = "P2025";

export type ProductData = {
  id: number;
  name: string;
  description: string;
  category: string;
  // @ts-ignore
  price: Prisma.Decimal;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class ProductMapper {
  static map(d: ProductData): Product {
    return Product.New(
      d.id,
      d.name,
      d.description,
      d.category,
      d.price.toNumber(),
      d.active,
      d.created_at,
      d.updated_at
    );
  }
}

export class ProductGateway implements IProductGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }

  async getProductsByCategory(category: Category): Promise<Product[]> {
    const products: any = await this.repositoryData.product.findMany({
      where: {
        category: category.getCategory(),
      },
    });
    return products.map(ProductMapper.map);
  }

  async getProductByIDs(ids: number[]): Promise<Product[]> {
    const products: any = await this.repositoryData.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return products.map(ProductMapper.map);
  }

  async getProducts(): Promise<Product[]> {
    const products: any = await this.repositoryData.product.findMany({
      where: {
        active: true,
      },
    });
    return products.map(ProductMapper.map);
  }

  async saveProduct(product: Product): Promise<Product> {
    const save: any = await this.repositoryData.product.create({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory(),
        active: product.getActive(),
      },
    });

    return ProductMapper.map(save);
  }

  async updateProduct(product: Product): Promise<Product> {
    const update: any = await this.repositoryData.product.update({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory(),
        active: product.getActive(),
      },
      where: {
        id: product.getId(),
      },
    });

    return ProductMapper.map(update);
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await this.repositoryData.product.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == prismaErrorRecordNotFound) {
          throw new RecordNotFoundError("No product found for the given id");
        }
      }
      throw e;
    }
  }
}
