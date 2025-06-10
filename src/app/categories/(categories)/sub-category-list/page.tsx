import SubCategoryWrapper from "@/components/organisms/categories/SubCategoryWrapper";
import { cookies } from "next/headers";

export default async function SubCategory() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <SubCategoryWrapper token={token} />;
}
