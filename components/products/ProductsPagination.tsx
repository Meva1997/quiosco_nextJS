import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center gap-5 py-10">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="px-4 py-2 text-sm text-gray-900 bg-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-300"
        >
          &laquo;
        </Link>
      )}

      {pages.map((currentPage) => (
        <Link
          href={`/admin/products?page=${currentPage}`}
          key={currentPage}
          className={`${
            page === currentPage ? "font-black bg-amber-400" : "bg-white"
          } px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-300`}
        >
          {currentPage}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="px-4 py-2 text-sm text-gray-900 bg-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-300"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
