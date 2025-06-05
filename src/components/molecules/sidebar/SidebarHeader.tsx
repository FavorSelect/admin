import React from "react";
import Image from "next/image";
import logo from "/public/logo.svg";
import smallLogo from "/public/small-logo.svg";
import Link from "next/link";
import { cn } from "@/utils/cn";

type SidebarHeaderProps = {
  isOpen: boolean;
};

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen }) => {
  return (
    <div
      className={cn(
        "sticky top-0 flex items-center h-14 border-b border-b-pale-rose flex-shrink-0 px-2.5",
        isOpen ? "justify-between" : "justify-center"
      )}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
    >
      <Link href="/" className="flex items-center justify-center">
        {isOpen ? (
          <Image
            src={logo}
            alt="Full Logo"
            width={170}
            height={50}
            className="h-auto"
          />
        ) : (
          <Image
            src={smallLogo}
            alt="Mobile Logo"
            width={40}
            height={40}
            className="w-[30px] h-auto"
          />
        )}
      </Link>
    </div>
  );
};

export default SidebarHeader;
