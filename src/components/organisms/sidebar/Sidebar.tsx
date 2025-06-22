import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import SidebarHeader from "@/components/molecules/sidebar/SidebarHeader";
import SidebarNavItem from "@/components/molecules/sidebar/SidebarNavItem";
import SidebarToggleButton from "@/components/molecules/sidebar/SidebarToggleButton";
import SidebarLogoutItem from "@/components/molecules/sidebar/SidebarLogoutItem";
import { cn } from "@/utils/cn";

import {
  X,
  Home,
  ShoppingCart,
  Users,
  Store,
  PackageCheck,
  LayoutGrid,
  Award,
  GalleryHorizontalEnd,
  Ticket,
  ShieldAlert,
  Warehouse,
} from "lucide-react";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType<{
    fill?: string;
    width?: number;
    height?: number;
    className?: string;
  }>;
};

const items: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Deletion", href: "/deletion-requests", icon: ShieldAlert },
  { label: "Categories", href: "/categories", icon: LayoutGrid },
  { label: "Memberships", href: "/membership", icon: Award },
  { label: "Product", href: "/product", icon: PackageCheck },
  { label: "Users", href: "/users", icon: Users },
  { label: "Sellers", href: "/sellers", icon: Store },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Banner", href: "/banner", icon: GalleryHorizontalEnd },
  { label: "Tickets", href: "/tickets", icon: Ticket },
  { label: "Address", href: "/warehouse-address", icon: Warehouse },
];

interface SidebarProps {
  toggleAppSlidebar: () => void;
  isOpen: boolean;
  isMobileMenuOpen: boolean;
  handleHamburgerClick: () => void;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleAppSlidebar,
  isOpen,
  isMobileMenuOpen,
  handleHamburgerClick,
  setIsMobileMenuOpen,
}) => {
  const rawPathname = usePathname();
  const pathname = rawPathname === "/" ? "/dashboard" : rawPathname;
  const isExpanded = isOpen || isMobileMenuOpen;

  return (
    <div>
      <div
        className={cn(
          "fixed top-0 left-0 z-30 shadow-md h-screen transition-all duration-300 transform bg-white border-r border-r-pale-rose group",
          isMobileMenuOpen
            ? "translate-x-0 scale-100 shadow-active"
            : "-translate-x-full shadow-hidden",
          "lg:translate-x-0 lg:rounded-md lg:shadow-none",
          isExpanded ? "w-56" : "w-20"
        )}
      >
        <div className="flex flex-col h-full gap-y-3 relative">
          <Button
            className="hover:bg-[#F5F7FA] px-1 py-1 absolute right-1 top-1 rounded-full block lg:hidden z-[62]"
            onClick={handleHamburgerClick}
          >
            <X className="w-5 h-5 text-gray-500" />
          </Button>

          <SidebarHeader isOpen={isExpanded} />

          <nav className="flex-grow overflow-y-auto space-y-2 no-scrollbar px-2.5">
            {items.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === ""
                  : pathname.startsWith(item.href);

              return (
                <SidebarNavItem
                  key={index}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={isActive}
                  isExpanded={isExpanded}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              );
            })}
          </nav>

          <SidebarToggleButton isOpen={isOpen} onClick={toggleAppSlidebar} />

          <SidebarLogoutItem
            isExpanded={isExpanded}
            isActive={pathname === "#"}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
