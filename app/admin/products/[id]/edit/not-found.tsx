import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <Heading> Producto No Encontrado</Heading>
      <Link
        href="/admin/products"
        className="w-full px-10 py-3 text-xl font-bold text-center text-black cursor-pointer bg-amber-400 lg:w-auto"
      >
        Ir a Productos
      </Link>
    </div>
  );
}
