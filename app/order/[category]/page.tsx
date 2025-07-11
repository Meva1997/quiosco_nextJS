import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
// import { prisma } from "@/src/lib/prisma";
import { PrismaClient } from "@/generated/prisma"; // Importing PrismaClient from the generated path

const prisma = new PrismaClient();

async function getProducts(category: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: category,
        },
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Asegúrate de que params.category esté disponible
  const awaitedParams = await params;
  const products = await getProducts(awaitedParams.category);

  return (
    <>
      <Heading>Elige y personaliza tu pedido a tu gusto</Heading>

      <div className="grid items-start w-1/2 grid-cols-1 gap-4 mx-auto lg:w-full xl:grid-cols-2 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
