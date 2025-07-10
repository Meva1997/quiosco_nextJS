"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSidebarSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(
    () => order.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [order]
  );
  const clearOrder = useStore((state) => state.clearOrder);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    // Validate the form data against the schema this comes from the client
    const result = OrderSchema.safeParse(data); // Validate the form data against the schema
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return; // If validation fails, show error messages
    }

    // validate the data against the schema this comes from the server
    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    // If the order is created successfully, reset the order state
    toast.success("Pedido creado correctamente");
    clearOrder();
  };

  return (
    <aside className="p-5 lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96">
      <h1 className="text-4xl font-black text-center">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="my-10 text-center">El carrito esta vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="mt-20 text-2xl text-center">
            Total a pagar:{" "}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              placeholder="Nombre del Cliente"
              className="w-full p-2 bg-white border border-gray-100"
              name="name"
            />
            <input
              type="submit"
              className="w-full py-2 font-bold text-center text-white uppercase bg-black rounded cursor-pointer"
              value="Confirmar Pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
// This component displays the order summary in the sidebar, including the list of products, their quantities, subtotals, and the total amount to be paid.
