"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import { OrderWithProducts } from "@/src/types";

export default function OrdersPage() {
  const url = "/orders/api";
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
        <h1 className="mt-20 text-6xl font-black text-center">
          Ordenes Listas
        </h1>
        <Logo />

        {data.length ? (
          <div className="grid max-w-5xl grid-cols-2 gap-5 mx-auto mt-10">
            {data.map((order) => (
              <LatestOrderItem order={order} key={order.id} />
            ))}
          </div>
        ) : (
          <p>No hay ordenes listas</p>
        )}
      </>
    );
}
