import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import { ReduxProvider } from "@/providers/ReduxProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/layout/Layout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Favoor E-commerce Admin",
  description: "Favor Select Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased bg-light-gray overflow-x-hidden font-montserrat`}
      >
        <ReduxProvider>
          <Layout>{children}</Layout>
          <Toaster position="top-center" reverseOrder={false} />
        </ReduxProvider>
      </body>
    </html>
  );
}
