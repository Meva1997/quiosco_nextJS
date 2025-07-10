"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.back()}
        className="w-1/2 px-8 py-3 text-xl font-bold text-center cursor-pointer bg-amber-400 lg:w-auto"
      >
        Regresar a Productos
      </button>
    </>
  );
}
