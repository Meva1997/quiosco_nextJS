import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { PrismaClient } from "@/generated/prisma";
// import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function EditProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params; // Usa `await` para resolver `params`
  const product = await getProductById(+resolvedParams.id);

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>
      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
