import PendingSellersWrapper from "@/components/organisms/sellers/PendingSellersWrapper";
import { cookies } from "next/headers";

export default async function PendingSellers() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <PendingSellersWrapper token={token} />;
}
