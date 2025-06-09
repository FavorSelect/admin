import SellerTicketDetailsWrapper from "@/components/organisms/tickets/SellerTicketDetailsWrapper";
import { cookies } from "next/headers";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <SellerTicketDetailsWrapper id={id} token={token} />;
}
