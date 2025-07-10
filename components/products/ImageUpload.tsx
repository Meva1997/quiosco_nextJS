"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <CldUploadWidget
      uploadPreset="product_images"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          // // @ts-ignore
          setImageUrl(result.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label htmlFor="" className="text-slate-800">
              Imagen Producto
            </label>
            <div
              className="relative flex flex-col items-center justify-center gap-4 p-10 transition cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>

              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageUrl}
                    alt="Imagen de Producto"
                  />
                </div>
              )}
            </div>
          </div>
          {image && !imageUrl && (
            <div className="space-y-2">
              <label htmlFor="">Imagen Actual: </label>
              <div className="relative w-64 h-64 mt-2">
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={getImagePath(image)}
                  alt="Imagen de Producto"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
            </div>
          )}
          <input
            type="hidden"
            name="image"
            defaultValue={imageUrl ? imageUrl : image}
          />{" "}
          {/*// This input
          will hold the image URL */}
        </>
      )}
    </CldUploadWidget>
  );
}
