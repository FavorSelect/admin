import CategoriesWrapper from "@/components/organisms/categories/CategoriesWrapper";
import { cookies } from "next/headers";

export default async function CategoryList() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  console.log(token);

  if (!token || token === "undefined") return;
  return <CategoriesWrapper token={token} />;
}
