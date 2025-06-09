"use client";
import Title from "@/components/atoms/Title";
import TabNavigation from "@/components/molecules/global/TabNavigation";
import { shouldHideNavigation } from "@/utils/navigation";

import { Users, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "All Sellers",
    icon: <Users className="w-5 h-5" />,
    href: "/sellers",
  },
  {
    label: "Pending Sellers",
    icon: <Clock className="w-5 h-5" />,
    href: "/sellers/pending-sellers",
  },
];

export default function SellersLayout({
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
          <Title text="Sellers" />
          <TabNavigation tabs={tabs} orientation="horizontal" />
        </>
      )}

      <div>{children}</div>
    </div>
  );
}
