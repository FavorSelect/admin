"use client";
import { ColumnConfig, RowData } from "@/types";
import React, { useState, useEffect } from "react";
import CellRenderer from "@/components/molecules/global/table/CellRenderer";
import { cn } from "@/utils/cn";

interface ReusableTableProps {
  data: RowData[];
  columns: ColumnConfig[];
  isExpandTableWidth?: boolean;
  token?: string;
  refetch?: () => void;
  categories?: { id: string; categoryName: string }[];
}

const Table: React.FC<ReusableTableProps> = ({
  data,
  columns,
  isExpandTableWidth,
  token,
  refetch,
  categories,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown-container")) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("no-scrollbar", isExpandTableWidth && "w-[2300px]")}>
      <table className="min-w-full overflow-x-auto border-collapse border border-pale-rose rounded-lg">
        <thead>
          <tr className="bg-pale-rose">
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2.5 text-sm font-medium text-dark-chocolate text-center"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column) => (
                <td
                  key={`${row.id || rowIndex}-${column.key}`}
                  className="border-b border-pale-rose py-2.5 font-normal text-sm text-dark-chocolate text-center"
                >
                  <CellRenderer
                    type={column.type}
                    column={column}
                    row={row}
                    rowIndex={rowIndex}
                    dropdownId={openDropdownId}
                    setDropdownId={setOpenDropdownId}
                    token={token}
                    refetch={refetch}
                    categories={categories}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
