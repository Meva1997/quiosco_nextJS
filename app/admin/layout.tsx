import ToastNotification from "@/components/ui/ToastNotification";
import AdminSidebar from "@/components/admin/AdminSideBar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex">
        <aside className="bg-white md:w-72 md:h-screen">
          <AdminSidebar />
        </aside>

        <main className="p-5 bg-gray-100 md:flex-1 md:h-screen md:overflow-y-scroll">
          {children}
        </main>
      </div>

      <ToastNotification />
    </>
  );
}
