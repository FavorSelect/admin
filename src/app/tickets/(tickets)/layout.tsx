"use client";
import Title from "@/components/atoms/Title";
import TabNavigation from "@/components/molecules/global/TabNavigation";
import { shouldHideNavigation } from "@/utils/navigation";

import { Store, Ticket } from "lucide-react";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Seller Tickets",
    icon: <Store className="w-5 h-5" />,
    href: "/tickets",
  },
  {
    label: "User Tickets",
    icon: <Ticket className="w-5 h-5" />,
    href: "/tickets/user-tickets",
  },
];

export default function TicketsLayout({
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
