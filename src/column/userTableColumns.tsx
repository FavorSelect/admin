import { ColumnConfig } from "@/types";

import CanReviewCheckbox from "@/components/molecules/users/CanReviewCheckbox";

export const userTableColumns: ColumnConfig[] = [
  { key: "id", type: "text", label: "ID" },
  { key: "name", type: "text", label: "Name" },
  { key: "email", type: "text", label: "Email" },
  { key: "status", type: "text", label: "Status" },
  {
    key: "canReview",
    type: "custom",
    label: "Can Review",
    render: (row) =>
      row?.id ? (
        <CanReviewCheckbox
          userId={Number(row.id)}
          initialValue={row.canReview}
        />
      ) : null,
  },
];
