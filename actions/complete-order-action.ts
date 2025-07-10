"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { toast } from "react-toastify";

export async function completeOrder(formData: FormData) {
  const data = {
    orderId: formData.get("order_id"),
  };

  const result = OrderIdSchema.safeParse(data);
  if (result.success) {
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId, // Usar el ID de la orden validado
        },
        data: {
          status: true, // Marcar la orden como completada
          orderReadyAt: new Date(Date.now()), // Establecer la fecha de completado
        },
      });

      revalidatePath("/admin/orders"); // Revalidar la ruta para actualizar la UI
    } catch (error) {
      console.error("Error completing order:", error);
    }
  }
}
