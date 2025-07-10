import { OrderProducts } from "./../../generated/prisma/index.d";
import { Order, Product } from "@/generated/prisma";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  OrderProducts: (OrderProducts & {
    product: Product;
  })[];
};
