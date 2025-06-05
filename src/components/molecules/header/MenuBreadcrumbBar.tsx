import { Button } from "@/components/atoms/Button";
import { useAppDispatch } from "@/store/hook";
import { toggleMobileMenu } from "@/store/slices/toggleSidebarSlice";
import { Menu } from "lucide-react";
import React from "react";

const MenuBreadcrumbBar = () => {
  const dispatch = useAppDispatch();

  const handleHamburgerClick = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <div className="flex gap-x-2 items-center">
      <Button
        onClick={handleHamburgerClick}
        className="w-10 h-10  lg:hidden  "
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </Button>
      <Button className="text-black text-xs sm:text-xs md:text-base font-semibold">
        Dashboard
      </Button>
    </div>
  );
};

export default MenuBreadcrumbBar;
