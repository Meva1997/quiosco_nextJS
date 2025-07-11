import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
// import { prisma } from "@/src/lib/prisma";
import { PrismaClient } from "@/generated/prisma"; // Importing PrismaClient from the generated path
import Link from "next/link";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function productsCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize; // Calculate the number of products to skip based on the current page
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
  return products;
}

// This type is used to ensure that the products returned from getProducts
// include the category information, which is necessary for the ProductTable component.
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const resolvedSearchParams = await searchParams; // Resolve the searchParams promise
  const page = +resolvedSearchParams.page || 1; // Get the page number from
  const pageSize = 10;

  // If the page number is less than 1, redirect to the first page
  if (page < 0) redirect("/admin/products");

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productsCount();
  //solo usar Promise.all si ambas promesas son independientes
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  // Calculate the total number of pages based on the total products and page size
  const totalPages = Math.ceil(totalProducts / pageSize);

  // If the requested page exceeds the total pages, redirect to the first page
  if (page > totalPages) redirect("/admin/products");

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/products/new"}
          className="w-full px-10 py-3 text-xl font-bold text-center cursor-pointer bg-amber-400 lg:w-auto"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}
