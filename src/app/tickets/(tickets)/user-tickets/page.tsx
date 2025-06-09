import UserTicketsWrapper from "@/components/organisms/tickets/UserTicketsWrapper";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <UserTicketsWrapper token={token} />;
}
