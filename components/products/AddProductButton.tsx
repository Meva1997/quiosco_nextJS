"use client";

import { Product } from "@/app/generated/prisma";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder);

  return (
    <button
      type="button"
      className="block w-1/2 p-3 mx-auto my-5 font-bold text-white uppercase transition-colors bg-indigo-600 rounded-lg cursor-pointer lg:w-1/2 hover:bg-indigo-800"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  );
}
