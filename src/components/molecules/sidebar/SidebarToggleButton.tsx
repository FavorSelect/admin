import { Button } from "@/components/atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const SidebarToggleButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = ({ isOpen, onClick }) => (
  <div className="hidden group-hover:block lg:hidden bg-white absolute top-1/2 -translate-y-1/2 -right-5 rounded-full border border-gray-200">
    <Button
      onClick={onClick}
      className="p-2 text-[#1C0D0D] hover:text-gray-800 focus:outline-none"
    >
      {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </Button>
  </div>
);

export default SidebarToggleButton;
