"use client";

import { updateProductAction } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!;
  const handleSubmit = async (formData: FormData) => {
    // Prevent the default form submission
    const data = {
      // Extract form data
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await updateProductAction(result.data, id);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    toast.success("Producto actualizado correctamente");
    router.push("/admin/products");
  };

  return (
    <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
      <form action={handleSubmit} className="space-y-5">
        {children}{" "}
        {/* // This is where the ProductForm component will be rendered */}
        <input
          type="submit"
          className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer hover:bg-indigo-800"
          value={"Guardar Cambios"}
        />
      </form>
    </div>
  );
}
