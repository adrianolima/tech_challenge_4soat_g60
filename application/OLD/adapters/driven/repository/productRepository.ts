import {IProductRepository} from "../../../core/ports/IProductRepository";
import {Product} from "../../../core/entities/product";
import {Category} from "../../../core/valueObjects/category";
import {Prisma, PrismaClient} from "@prisma/client";
import CPFExistsError from "../../../core/errors/CPFExistsError";
import EmailExistsError from "../../../core/errors/EmailExistsError";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import RecordNotFoundError from "../../../core/errors/RecordNotFoundError";

const prisma = new PrismaClient();

const prismaErrorRecordNotFound = "P2025"

export type ProductData = {
  id: number
  name: string
  description: string
  category: string
  price: Prisma.Decimal
  active: boolean
  created_at?: Date
  updated_at?: Date
}

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
    )
  }
}

export class ProductRepository implements IProductRepository {

  async getProductsByCategory(category: Category): Promise<Product[]> {
    const products: any = await prisma.product.findMany({
      where: {
        category: category.getCategory()
      }
    });
    return products.map(ProductMapper.map);
  }

  async getProductByIDs(ids: number[]): Promise<Product[]> {
    const products: any = await prisma.product.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });
    return products.map(ProductMapper.map);
  }

  async getProducts(): Promise<Product[]> {
    const products: any = await prisma.product.findMany({
      where: {
        active: true
      }
    });
    return products.map(ProductMapper.map);
  }

  async saveProduct(product: Product): Promise<Product> {
    const save: any = await prisma.product.create({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory(),
        active: product.getActive()
      },
    });

    return ProductMapper.map(save);
  }

  async updateProduct(product: Product): Promise<Product> {
    const update: any = await prisma.product.update({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory(),
        active: product.getActive()
      },
      where: {
        id: product.getId()
      }
    });

    return ProductMapper.map(update);
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await prisma.product.delete({
        where: {
          id,
        }
      })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == prismaErrorRecordNotFound) {
          throw new RecordNotFoundError("No product found for the given id")
        }
      }
      throw e
    }
  }

}