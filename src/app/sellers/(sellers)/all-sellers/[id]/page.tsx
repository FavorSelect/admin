import SellerDetailsWrapper from "@/components/organisms/sellers/SellerDetailsWrapper";
import { cookies } from "next/headers";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <SellerDetailsWrapper id={id} token={token} />;
}
