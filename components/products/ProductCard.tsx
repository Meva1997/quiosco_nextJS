import { Product } from "@/app/generated/prisma";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <>
      <div className="bg-white border">
        <Image
          width={400}
          height={500}
          src={imagePath}
          alt={`Imagen platillo ${product.name}`}
          style={{ objectFit: "cover" }}
          className="w-full"
        />

        <div className="p-5">
          <h3 className="font-bold text-md xl:text-2xl">{product.name}</h3>
          <p className="mt-5 text-2xl font-black text-amber-500 xl:text-4xl">
            {formatCurrency(product.price)}
          </p>
        </div>

        <AddProductButton product={product} />
      </div>
    </>
  );
}
