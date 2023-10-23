import { IProductRepository } from "../../../core/ports/IProductRepository";
import { Product } from "../../../core/entities/product";
import { Category } from "../../../core/valueObjects/category";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


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
        throw new Error("Method not implemented.");
    }

    updateProduct(product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    deleteProduct(product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}