import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.client.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Fulano da Silva",
      email: "fulanosilva@gmail",
      cpf: "123.456.789-09",
    },
  });

  await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Hamburguer",
      description: "Lorem ipsum dolor sit amet",
      category: "Lanche",
      price: 10.0,
      active: true,
    },
  });

  await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Batata frita",
      description: "Lorem ipsum dolor sit amet",
      category: "Acompanhamento",
      price: 5.5,
      active: true,
    },
  });

  await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Coca Cola",
      description: "Lorem ipsum dolor sit amet",
      category: "Bebida",
      price: 8.3,
      active: true,
    },
  });

  await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: "Fanta",
      description: "Lorem ipsum dolor sit amet",
      category: "Bebida",
      price: 6.0,
      active: false,
    },
  });

  await prisma.product.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: "Sorvete",
      description: "Lorem ipsum dolor sit amet",
      category: "Sobremesa",
      price: 3.0,
      active: true,
    },
  });

  await prisma.product.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      name: "Milk Shake",
      description: "Lorem ipsum dolor sit amet",
      category: "Sobremesa",
      price: 6.0,
      active: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
