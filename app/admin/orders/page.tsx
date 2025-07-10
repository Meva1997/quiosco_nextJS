"use client";
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";

export default function OrdersPage() {
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-4xl font-black animate-bounce text-amber-400">
          Cargando...
        </p>
      </div>
    );
  }

  if (data)
    return (
      <>
        <Heading>Administrar Ordenes</Heading>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 mt-5 lg:grid-cols-2 2xl:grid-cols-3">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay Ordenes Pendientes</p>
        )}
      </>
    );
}
