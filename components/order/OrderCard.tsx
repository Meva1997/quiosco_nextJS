import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { completeOrder } from "@/actions/complete-order-action";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="px-4 py-6 mt-16 space-y-4 rounded-lg bg-gray-50 sm:p-6 lg:mt-0 lg:p-8"
    >
      <p className="text-2xl font-medium text-gray-900">
        Cliente: {order.name}{" "}
      </p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="mt-6 space-y-4">
        {order.OrderProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-2 pt-4 border-t border-gray-200"
          >
            <dt className="flex items-center text-sm text-gray-600">
              <span className="font-black">({product.quantity})</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              {product.product.name}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrder}>
        <input type="hidden" name="order_id" value={order.id} />
        <input
          type="submit"
          className="w-full p-3 mt-5 font-bold text-white uppercase bg-indigo-600 cursor-pointer hover:bg-indigo-800"
          value="Marcar Orden Completada"
        />
      </form>
    </section>
  );
}
