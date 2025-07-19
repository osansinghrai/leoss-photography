import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
