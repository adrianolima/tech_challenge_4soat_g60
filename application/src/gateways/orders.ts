import { Order } from "../../src/entities/order";
import { OrderStatus } from "../../src/entities/valueObjects/orderStatus";
import { Prisma } from "@prisma/client";
import { PaymentData, PaymentMapper } from "./payments";
import { ClientData, ClienteMapper } from "./clients";
import { ProductData, ProductMapper } from "./products";
import { OrderItem } from "../../src/entities/orderItem";

// @ts-ignore
import OrderItemUncheckedUpdateManyWithoutOrderNestedInput = Prisma.OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
import { IOrderGateway } from "../interfaces/gateways";
import { DbConnection } from "../interfaces/dbconnection";

type OrderData = {
  client?: ClientData;
  payment?: PaymentData;
  items: OrderItemData[];
  id: number;
  client_id: number;
  payment_id: number;
  status: string;
  // @ts-ignore
  total: Prisma.Decimal;
  created_at?: Date;
  updated_at?: Date;
};

type OrderItemData = {
  id: number;
  order_id: number;
  product_id: number;
  // @ts-ignore
  quantity: Prisma.Decimal;
  // @ts-ignore
  price: Prisma.Decimal;
  // @ts-ignore
  total: Prisma.Decimal;
  orderId?: number;
  product: ProductData;
};

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
    );
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
    );
  }
}

export class OrderGateway implements IOrderGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }

  async getOrderByStatus(status: OrderStatus): Promise<Array<Order>> {
    const dados = await this.repositoryData.order.findMany({
      where: { status: status.getStatus() },
      include: {
        payment: true,
        client: true,
        items: {
          include: { product: true },
        },
      },
    });
    return dados.map(OrderMapper.map);
  }

  async getOrders(): Promise<Array<Order>> {
    const dados = await this.repositoryData.order.findMany({
      include: {
        payment: true,
        client: true,
        items: {
          include: { product: true },
        },
      },
    });
    return dados.map(OrderMapper.map);
  }

  async save(o: Order): Promise<Order> {
    const data = {
      client_id: o.client?.getId(),
      payment_id: o.payment?.id,
      status: o.status.getStatus(),
      total: o.valueTotal.getValueMoney(),
      items: {
        create: o.items.map((i) => ({
          product_id: i.product.getId(),
          quantity: i.quantity,
          price: i.value,
          total: i.total,
        })),
      },
    };

    const savedOrder = await this.repositoryData.order.create({
      data: data,
    });

    return this.getOrderByID(savedOrder.id);
  }

  async update(o: Order): Promise<Order> {
    const data = {
      id: o.id,
      client_id: o.client?.getId(),
      payment_id: o.payment?.id,
      status: o.status.getStatus(),
      total: o.valueTotal.getValueMoney(),
    };

    const savedOrder = await this.repositoryData.order.update({
      data: data,
      where: {
        id: o.id,
      },
      include: {
        payment: true,
        client: true,
        items: {
          include: { product: true },
        },
      },
    });

    return this.getOrderByID(savedOrder.id);
  }

  async getOrderByID(orderID: number): Promise<Order | null> {
    const order = await this.repositoryData.order.findFirst({
      where: { id: orderID },
      include: {
        payment: true,
        client: true,
        items: {
          include: { product: true },
        },
      },
    });

    return OrderMapper.map(order);
  }
}
