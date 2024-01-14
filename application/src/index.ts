import StartUp from "../src/api/startUp";
import prisma from "./external/prismaClient";

const prismaConnection = prisma;
new StartUp(prismaConnection);
