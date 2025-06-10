"use client";
import Title from "@/components/atoms/Title";
import TabNavigation from "@/components/molecules/global/TabNavigation";

import { Store, Ticket } from "lucide-react";

const tabs = [
  {
    label: "Category",
    icon: <Store className="w-5 h-5" />,
    href: "/categories",
  },
  {
    label: "Sub Category",
    icon: <Ticket className="w-5 h-5" />,
    href: "/categories/sub-category-list",
  },
];

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-5">
      <Title text="Category" />
      <TabNavigation tabs={tabs} orientation="horizontal" />
      <div>{children}</div>
    </div>
  );
}
