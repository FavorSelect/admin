import MembershipWrapper from "@/components/organisms/membership/MembershipWrapper";
import { cookies } from "next/headers";

export default async function MemberShip() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <MembershipWrapper token={token} />;
}
