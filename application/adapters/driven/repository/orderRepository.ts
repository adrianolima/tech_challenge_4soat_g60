import {IOrderRepository} from "../../../core/ports/IOrderRepository";
import {Order} from "../../../core/entities/order";
import {OrderStatus} from "../../../core/valueObjects/orderStatus";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class OrderRepository implements IOrderRepository {
    getOrderByStatus(order: OrderStatus): Promise<Array<Order>> {
        return Promise.resolve(undefined);
    }

    getOrders(): Promise<Array<Order>> {
        return Promise.resolve(undefined);
    }

    save(items: Order): Promise<Order> {
        return Promise.resolve(undefined);
    }

    async getOrderByID(orderID: number): Promise<Order | null> {
        const order = await prisma.order.findFirst({
                where: {id: orderID},
                include: {
                    payment: true,
                    client: true,
                    items: {
                        include: {product: true},
                    },
                },
            },
        );
        // TODO: map to an order
        return null
        // return order
    }

}