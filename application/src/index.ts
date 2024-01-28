import StartUp from "../src/api/startUp";
import prisma from "./external/prismaClient";
import "jest";

const prismaConnection = prisma;
new StartUp(prismaConnection);

