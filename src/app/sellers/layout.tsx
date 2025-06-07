import Title from "@/components/atoms/Title";
import TabNavigation from "@/components/molecules/global/TabNavigation";

import { Users, Clock } from "lucide-react";

const tabs = [
  {
    label: "All Sellers",
    icon: <Users className="w-5 h-5" />,
    href: "/sellers/all-sellers",
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
  return (
    <div className="flex flex-col space-y-5">
      <Title text="Sellers" />
      <TabNavigation
        tabs={tabs}
        defaultTab="/sellers/all-sellers"
        orientation="horizontal"
      />
      <div>{children}</div>
    </div>
  );
}
