import DeletionRequestWrapper from "@/components/organisms/deletion-request/DeletionRequestWrapper";
import { cookies } from "next/headers";

export default async function DeletionRequest() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;

  return <DeletionRequestWrapper token={token} />;
}
