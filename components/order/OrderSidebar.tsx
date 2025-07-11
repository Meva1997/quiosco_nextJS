// import { prisma } from "../../src/lib/prisma";
import { PrismaClient } from "@/generated/prisma"; // Importing PrismaClient from the generated path
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

const prisma = new PrismaClient();

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside className="w-full mb-0 bg-white lg:w-72 lg:h-screen">
      <Logo />
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}
