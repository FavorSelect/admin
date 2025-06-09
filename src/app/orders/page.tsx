import OrderWrapper from "@/components/organisms/orders/OrderWrapper";
import { cookies } from "next/headers";

export default async function Orders() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;

  return <OrderWrapper token={token} />;
}
