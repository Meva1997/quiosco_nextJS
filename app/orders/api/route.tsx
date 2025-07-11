// import { prisma } from "@/src/lib/prisma";
import { PrismaClient } from "@/generated/prisma"; // Importing PrismaClient from the generated path

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  const orders = await prisma.order.findMany({
    take: 5,
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
    include: {
      OrderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return Response.json(orders);
}
