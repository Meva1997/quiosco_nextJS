"use client";

import { SearchSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
  const router = useRouter();

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form className="flex items-center gap-2" action={handleSearchForm}>
      <input
        type="text"
        placeholder="Buscar Producto"
        className="w-full p-2 placeholder-gray-400 bg-white border-2 border-amber-400 outline-indigo-600"
        name="search"
      />
      <input
        type="submit"
        value={"Buscar"}
        className="p-2 text-white uppercase bg-indigo-600 cursor-pointer hover:bg-indigo-800"
      />
    </form>
  );
}
