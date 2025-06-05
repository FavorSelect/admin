import { cn } from "@/utils/cn";
import React from "react";

const Title = ({ text, className }: { text: string; className?: string }) => {
  return (
    <h2 className={cn("text-lg font-semibold mb-1", className)}>{text}</h2>
  );
};

export default Title;
