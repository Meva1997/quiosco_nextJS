import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSidebarSummary from "@/components/order/OrderSidebarSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="grid w-full grid-cols-1 lg:flex">
        <OrderSidebar />

        <main className="grid grid-cols-1 p-5 md:w-full md:flex-1 md:h-screen md:overflow-y-scroll">
          {children}
        </main>

        <OrderSidebarSummary />
      </div>

      <ToastNotification />
    </>
  );
}
