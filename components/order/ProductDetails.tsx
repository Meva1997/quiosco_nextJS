import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
};

const MAX_ITEMS = 10; // Maximum number of items allowed in the order

export default function ProductDetails({ item }: ProductDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQunatity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );
  const deleteProduct = useStore((state) => state.deleteProduct);

  return (
    <div className="p-4 space-y-1 bg-white border-t border-gray-200 shadow ">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => deleteProduct(item.id)}>
            <XCircleIcon className="w-8 h-8 text-red-600 cursor-pointer hover:scale-110" />
          </button>
        </div>
        <p className="text-2xl font-black text-amber-500">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            className="cursor-pointer hover:scale-110"
          >
            <MinusIcon className="w-6 h-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            className="cursor-pointer hover:scale-105 disabled:opacity-10"
            disabled={disableIncreaseButton}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
