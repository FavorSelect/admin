"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";

interface Tab {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  defaultTab,
  orientation = "vertical",
  className = "",
}) => {
  const pathname = usePathname();

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        isHorizontal ? "flex gap-3" : "flex flex-col gap-2.5",
        className
      )}
    >
      {tabs.map((tab, index) => {
        const isActive =
          (pathname === "/sellers" && tab.href === defaultTab) ||
          pathname.startsWith(tab.href);

        return isHorizontal ? (
          <Button
            key={index}
            asChild
            role="tab"
            aria-selected={isActive}
            className={cn(
              "py-2 px-4 border-b-2 rounded-none flex items-center gap-2",
              isActive
                ? "border-scarlet-red text-scarlet-red"
                : "border-transparent text-gray-500"
            )}
          >
            <Link href={tab.href}>
              {tab.icon}
              <Span>{tab.label}</Span>
            </Link>
          </Button>
        ) : (
          <Link
            key={index}
            href={tab.href}
            className={cn(
              "relative text-sm font-medium rounded-lg flex gap-x-2 items-center whitespace-nowrap px-2.5 py-3",
              isActive ? "bg-[#fff1f1] text-scarlet-red" : "text-black"
            )}
          >
            {tab.icon}
            <Span>{tab.label}</Span>
          </Link>
        );
      })}
    </div>
  );
};

export default TabNavigation;
