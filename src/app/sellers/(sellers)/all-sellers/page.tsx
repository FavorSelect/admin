import SellersWrapper from "@/components/organisms/sellers/SellersWrapper";
import { cookies } from "next/headers";

export default async function AllSellers() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <SellersWrapper token={token} />;
}
