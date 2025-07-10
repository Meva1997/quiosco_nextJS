import { OrderWithProducts } from "@/src/types";
import React from "react";

type LatestOrderItemProps = {
  order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <div className="p-5 space-y-5 bg-white rounded-lg shadow">
      <p className="text-2xl font-bold text-slate-600">Cliente: {order.name}</p>
      <ul
        role="list"
        className="text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
      >
        {order.OrderProducts.map((product) => (
          <li key={product.id} className="flex py-6 text-lg">
            <p>
              <span className="font-bold">({product.quantity}) </span>
              {product.product.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
