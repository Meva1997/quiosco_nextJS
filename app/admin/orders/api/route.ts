import { prisma } from "@/src/lib/prisma";

// Esta función obtiene las órdenes pendientes desde la base de datos
// y las devuelve como un JSON.

export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: false, // Solo obtener órdenes pendientes
    },
    include: {
      OrderProducts: {
        include: {
          product: true, // Incluir detalles del producto
        },
      },
    },
  });

  return Response.json(orders);
}
