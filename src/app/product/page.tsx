import ProductWrapper from "@/components/organisms/product/ProductWrapper";
import { cookies } from "next/headers";

export default async function Product() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <ProductWrapper token={token} />;
}
