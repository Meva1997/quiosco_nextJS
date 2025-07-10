import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const awaitedSearchParams = await searchParams;
  const products = await searchProducts(awaitedSearchParams.search);

  return (
    <>
      <Heading>
        Resultados de Busqueda:{" "}
        <span className="text-2xl font-black uppercase text-amber-500">
          {awaitedSearchParams.search}
        </span>
      </Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>

      {products.length === 0 && (
        <p className="mt-5 font-black text-center animate-pulse">
          No se encontraron productos para {awaitedSearchParams.search}
        </p>
      )}
      <ProductTable products={products} />
    </>
  );
}
