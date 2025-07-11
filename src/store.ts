import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@/app/generated/prisma";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQunatity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  deleteProduct: (id: Product["id"]) => void;
  clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    // categoryId, image, // and other properties are not needed in the order item
    const { ...data } = product; // Exclude categoryId and image from the order item
    let order: OrderItem[] = [];
    if (get().order.find((item) => item.id === product.id)) {
      order = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1, // Increment quantity
              subtotal: (item.quantity + 1) * item.price, // Update subtotal based on quantity and price
            }
          : item
      );
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1, // Default quantity to 1
          subtotal: 1 * product.price, // Calculate subtotal based on price
        },
      ];
    }

    set(() => ({
      order,
    }));
  },
  increaseQunatity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1, // Increment quantity
              subtotal: (item.quantity + 1) * item.price, // Update subtotal based on quantity and price
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1, // Ensure quantity does not go below 1
              subtotal:
                (item.quantity > 1 ? item.quantity - 1 : 1) * item.price, // Update subtotal based on quantity and price
            }
          : item
      ),
    }));
  },
  deleteProduct: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
  clearOrder: () => {
    set(() => ({
      order: [],
    }));
  },
}));
