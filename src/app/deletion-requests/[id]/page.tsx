import { deletionRequestsData } from "@/data/deletionRequestsData";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function DeletionDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const request = deletionRequestsData.find(
    (item) => item.requestId === `#${id}`
  );

  if (!request) return notFound();

  return (
    <div className="space-y-3 text-sm">
      <h1 className="text-xl font-semibold">Deletion Request Details</h1>
      <p>
        <strong>Request ID:</strong> {request.requestId}
      </p>
      <p>
        <strong>User:</strong> {request.user}
      </p>
      <p>
        <strong>Date:</strong> {request.date}
      </p>
      <p>
        <strong>Status:</strong> {request.status}
      </p>
    </div>
  );
}
