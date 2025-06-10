import React from "react";
import Image from "next/image";
import ReusableButton from "@/components/molecules/global/table/ReusableButton";
import { ColumnConfig, RowData } from "@/types";

interface CellRendererProps {
  type: ColumnConfig["type"];
  column: ColumnConfig;
  row: RowData;
  rowIndex: number;
  dropdownId: string | null;
  setDropdownId: (id: string | null) => void;
  token?: string;
  refetch?: () => void;
}

const getCellClass = (key: string, value: string): string => {
  switch (key) {
    case "status":
      return getStatusStyles(value);
    case "userRole":
      return getUserRoleColor(value);
    case "priority":
      return getPriorityStyles(value);
    default:
      return "";
  }
};

const getStatusStyles = (status: string): string => {
  switch (status.trim().toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md";
    case "approved":
      return "bg-green-100 text-green-700 px-3 py-1 rounded-md";
    case "rejected":
      return "bg-red-100 text-red-700 px-3 py-1 rounded-md";
    case "shipped":
      return "bg-green-100 text-green-700 px-3 py-1 rounded-md";
    case "processing":
      return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md";
    case "delivered":
      return "bg-blue-100 text-blue-700 px-3 py-1 rounded-md";
    case "open":
      return "bg-green-100 text-green-700 px-3 py-1 rounded-md";
    case "active":
      return "bg-green-100 text-green-700 px-3 py-1 rounded-md";
    case "inactive":
      return "bg-gray-200 text-gray-700 px-3 py-1 rounded-md";
    case "closed":
      return "bg-red-100 text-red-700 px-3 py-1 rounded-md";
    default:
      return "bg-gray-100 text-gray-700 px-3 py-1 rounded-md";
  }
};

const getPriorityStyles = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700 px-3 py-1 rounded-md";
    case "medium":
      return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md";
    case "low":
      return "bg-blue-100 text-blue-700 px-3 py-1 rounded-md";
    default:
      return "bg-gray-100 text-gray-700 px-3 py-1 rounded-md";
  }
};

const getUserRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "text-cyan-500 font-bold";
    case "hr":
      return "text-indigo-500 font-bold";
    case "executive":
      return "text-orange-400 font-bold";
    default:
      return "text-gray-700";
  }
};

const CellRenderer: React.FC<CellRendererProps> = ({
  type,
  column,
  row,
  rowIndex,
  dropdownId,
  setDropdownId,
  token,
  refetch,
}) => {
  const key = column.key;

  const handleSelect = (option: string) => {
    column.onSelectChange?.({ ...row }, option);
    setDropdownId(null);
  };

  if (column.render) return <>{column.render(row, token, refetch)}</>;

  switch (type) {
    case "text":
      return <span className={getCellClass(key, row[key])}>{row[key]}</span>;

    case "button":
      return column.buttonProps ? (
        <ReusableButton
          label={row[column.buttonProps.labelKey]}
          onClick={() => column.buttonProps?.onClick(row)}
          className={column.buttonProps.className}
        />
      ) : null;

    case "checkbox":
      return <input type="checkbox" checked={row[key]} readOnly />;

    case "custom":
      return Array.isArray(row[key])
        ? row[key].map((item, index) => (
            <div key={index} className="flex items-center gap-2 border">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title || "Image"}
                  width={50}
                  height={50}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          ))
        : null;

    case "image":
      return row[key] ? (
        <Image
          src={row[key]}
          alt="Image"
          width={50}
          height={50}
          className="w-auto h-16 object-cover rounded-full"
        />
      ) : null;

    case "select":
      return (
        <div
          className="relative inline-block dropdown-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-gray-700 text-white p-2 rounded cursor-pointer"
            onClick={() =>
              setDropdownId(
                dropdownId === `${rowIndex}-${key}`
                  ? null
                  : `${rowIndex}-${key}`
              )
            }
          >
            {row[key] || "Select Action"}
          </div>
          {dropdownId === `${rowIndex}-${key}` && column.selectOptions && (
            <ul className="absolute left-0 bg-white border rounded mt-1 z-10 shadow">
              {column.selectOptions.map((option, i) => (
                <li
                  key={i}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case "boolean":
      return (
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            row[key] ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {row[key] ? "Yes" : "No"}
        </span>
      );
    default:
      return null;
  }
};

export default CellRenderer;
