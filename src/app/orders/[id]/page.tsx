import OrderDetailsWrapper from "@/components/organisms/orders/OrderDetailsWrapper";
import { cookies } from "next/headers";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <OrderDetailsWrapper id={id} token={token} />;
}
