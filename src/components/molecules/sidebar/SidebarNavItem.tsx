import Link from "next/link";
import { cn } from "@/utils/cn";
import React from "react";

interface SidebarNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isExpanded: boolean;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  href,
  icon: Icon,
  label,
  isActive,
  isExpanded,
  onClick,
}) => (
  <Link
    href={href}
    className={cn(
      "group relative flex items-center gap-3 p-3 text-sm font-normal rounded-md transition-all duration-200",
      " hover:bg-pale-rose font-medium",
      isActive ? "bg-pale-rose text-white" : "text-gray-700",
      !isExpanded && "justify-center"
    )}
    onClick={onClick}
  >
    <div
      className={cn(
        "flex items-center justify-center transition-colors duration-200",
        isActive ? "text-dark-chocolate" : "text-gray-900"
      )}
    >
      <Icon className="h-5 w-5 transition-colors duration-200" />
    </div>
    {isExpanded && (
      <span
        className={cn(
          "transition-opacity duration-200",
          isActive ? "text-dark-chocolate" : "text-gray-700"
        )}
      >
        {label}
      </span>
    )}
  </Link>
);

export default SidebarNavItem;
