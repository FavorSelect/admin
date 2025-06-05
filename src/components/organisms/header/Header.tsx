import React from "react";
import { cn } from "@/utils/cn";
import Profile from "@/components/molecules/header/Profile";
import MenuBreadcrumbBar from "@/components/molecules/header/MenuBreadcrumbBar";

const Header = () => {
  return (
    <div
      className={cn(
        "flex items-center bg-white justify-between h-14 border-b border-b-pale-rose px-3 flex-shrink-0 sticky top-0 z-30"
      )}
    >
      <MenuBreadcrumbBar />
      <Profile />
    </div>
  );
};

export default Header;
