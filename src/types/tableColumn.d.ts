/* eslint-disable @typescript-eslint/no-explicit-any */
export type CellType =
  | "button"
  | "text"
  | "checkbox"
  | "image"
  | "select"
  | "custom"
  | "boolean";

export interface RowData {
  id?: string | number;
  [key: string]: any;
}

export interface ColumnConfig {
  key: string;
  type: CellType;
  label: string;
  buttonProps?: {
    labelKey: string;
    onClick: (row: RowData) => void;
    className: string;
  };
  selectOptions?: string[];
  onSelectChange?: (row: RowData, value: string) => void;
  render?: (
    row: RowData,
    token?: string,
    refetch?: () => void
  ) => React.ReactNode;
}
