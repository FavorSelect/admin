import UserWrapper from "@/components/organisms/users/UserWrapper";
import { cookies } from "next/headers";

export default async function Users() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <UserWrapper token={token} />;
}
