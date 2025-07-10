"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Category } from "@/app/generated/prisma";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();

  return (
    <Link
      href={`/order/${category.slug}`}
      className={` ${
        category.slug === params.category
          ? "bg-amber-400"
          : "hover:bg-amber-200"
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="relative w-16 h-16">
        <Image fill src={`/icon_${category.slug}.svg`} alt="Imagen Categoria" />
      </div>
      <span className="text-xl font-bold">{category.name}</span>
    </Link>
  );
}
