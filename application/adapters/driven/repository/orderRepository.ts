import {IOrderRepository} from "../../../core/ports/IOrderRepository";
import {Order} from "../../../core/entities/order";
import {OrderStatus} from "../../../core/valueObjects/orderStatus";
import {Prisma, PrismaClient} from "@prisma/client";
import {PaymentData, PaymentMapper} from "./paymentRepository";
import {ClientData, ClienteMapper} from "./clientRepository";
import {ProductData, ProductMapper} from "./productRepository";
import {OrderItem} from "../../../core/entities/orderItem";
import OrderItemUncheckedUpdateManyWithoutOrderNestedInput = Prisma.OrderItemUncheckedUpdateManyWithoutOrderNestedInput;

const prisma = new PrismaClient();

type OrderData = {
  client?: ClientData
  payment?: PaymentData
  items: OrderItemData[]
  id: number
  client_id: number
  payment_id: number
  status: string
  total: Prisma.Decimal
  created_at?: Date
  updated_at?: Date
}

type OrderItemData = {
  id: number
  order_id: number
  product_id: number
  quantity: Prisma.Decimal
  price: Prisma.Decimal
  total: Prisma.Decimal
  orderId?: number
  product: ProductData
}

export class OrderMapper {
  static map(d: OrderData): Order {
    return Order.New(
      d.id,
      d.items.map(OrderItemMapper.map),

      d.total.toNumber(),
      d.status,
      !d.client ? null : ClienteMapper.map(d.client),
      !d.payment ? null : PaymentMapper.map(d.payment),
      d.created_at,
      d.updated_at
    )
  }
}

export class OrderItemMapper {
  static map(d: OrderItemData): OrderItem {
    return OrderItem.New(
      d.id,
      d.orderId,
      ProductMapper.map(d.product),
      d.quantity.toNumber(),
      d.price.toNumber(),
      d.total.toNumber()
    )
  }
}

export class OrderRepository implements IOrderRepository {
  async getOrderByStatus(status: OrderStatus): Promise<Array<Order>> {
    const dados = await prisma.order.findMany({
      where: {status: status.getStatus()},
      include: {
        payment: true,
        client: true,
        items: {
          include: {product: true},
        },
      }
    })
    return dados.map(OrderMapper.map)
  }

  async getOrders(): Promise<Array<Order>> {
    const dados = await prisma.order.findMany({
      include: {
        payment: true,
        client: true,
        items: {
          include: {product: true},
        },
      }
    })
    return dados.map(OrderMapper.map)
  }

  async save(o: Order): Promise<Order> {

    const data = {
      client_id: o.client?.getId(),
      payment_id: o.payment?.id,
      status: o.status.getStatus(),
      total: o.valueTotal.getValueMoney(),
      items: {
        create: o.items.map(i => ({
          product_id: i.product.getId(),
          quantity: i.quantity,
          price: i.value,
          total: i.total,
        }))
      }
    }

    const savedOrder = await prisma.order.create({
        data: data,
      }
    )

    return this.getOrderByID(savedOrder.id)
  }

  async update(o: Order): Promise<Order> {

    const data = {
      id: o.id,
      client_id: o.client?.getId(),
      payment_id: o.payment?.id,
      status: o.status.getStatus(),
      total: o.valueTotal.getValueMoney(),
    }

    const savedOrder = await prisma.order.update({
        data: data,
        where: {
          id: o.id
        },
        include: {
          payment: true,
          client: true,
          items: {
            include: {product: true},
          },
        },
      }
    )

    return this.getOrderByID(savedOrder.id)
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

    return OrderMapper.map(order)
  }

}