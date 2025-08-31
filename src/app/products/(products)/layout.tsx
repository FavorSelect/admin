"use client";
import Title from "@/components/atoms/Title";
import TabNavigation from "@/components/molecules/global/TabNavigation";
import { shouldHideNavigation } from "@/utils/navigation";

import { List, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Product List",
    icon: <List className="w-5 h-5" />,
    href: "/products",
  },
  {
    label: "Add Product",
    icon: <Plus className="w-5 h-5" />,
    href: "/products/add-product",
  },
];

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavigation = shouldHideNavigation(pathname);

  return (
    <div className="flex flex-col space-y-5">
      {!hideNavigation && (
        <>
          <Title text="Tickets" />
          <TabNavigation tabs={tabs} orientation="horizontal" />
        </>
      )}

      <div>{children}</div>
    </div>
  );
}
