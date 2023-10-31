import {IProductRepository} from "../../../core/ports/IProductRepository";
import {Product} from "../../../core/entities/product";
import {Category} from "../../../core/valueObjects/category";
import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


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
    const product: any = await prisma.product.findMany({
      where: {
        category: category.getCategory()
      }
    });
    return product;
  }

  async getProducts(): Promise<Product[]> {
    const product: any = await prisma.product.findMany({
      where: {
        active: true
      }
    });
    return product;
  }

  async saveProduct(product: Product): Promise<Product> {
    const save: any = await prisma.product.create({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory()
      },
    });

    return save;
  }

  async updateProduct(product: Product): Promise<Product> {
    const update: any = await prisma.product.update({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory(),
      },
      where: {
        id: product.getId()
      }
    });

    return update;
  }

  async deleteProduct(id: number): Promise<any> {
    const deleteProduct = await prisma.product.delete({
      where: {
        id,
      },
    })

    return deleteProduct
  }

}