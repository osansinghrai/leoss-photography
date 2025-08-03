import type { Metadata } from "next";
import "./globals.css";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata: Metadata = {
  title: "Leoss Photography",
  description: "A portfolio showcasing my photography work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden max-w-full ">
        <AdminHeader />
        <AdminSidebar />
        <div className="ml-64 flex-1 p-8">{children}</div>
      </body>
    </html>
  );
}
