import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main(){

  try {
    await prisma.product.deleteMany(); // Limpia la tabla de productos
    await prisma.category.deleteMany(); // Limpia la tabla de categorías

    await prisma.category.createMany({
      data: categories,
    })
    await prisma.product.createMany({
      data: products,
    })
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

main()
  .then( async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error in main function:", e);
    await prisma.$disconnect();
    process.exit(1);
  })