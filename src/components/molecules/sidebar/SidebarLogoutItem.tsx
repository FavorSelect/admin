import Link from "next/link";
import { LogOut } from "lucide-react";
import { cn } from "@/utils/cn";
import React from "react";

const SidebarLogoutItem: React.FC<{
  isExpanded: boolean;
  isActive: boolean;
}> = ({ isExpanded, isActive }) => (
  <div className="flex-shrink-0 border-t border-gray-100">
    <Link
      href="#"
      className={cn(
        "group flex items-start gap-3 p-3 text-xs font-normal rounded-md transition-all duration-300 hover:text-dark-chocolate hover:bg-pale-rose",
        isActive && "bg-pale-rose text-white",
        !isExpanded && "justify-center",
        "text-gray-700"
      )}
    >
      <LogOut size={20} />
      {isExpanded && "Logout"}
    </Link>
  </div>
);

export default SidebarLogoutItem;
