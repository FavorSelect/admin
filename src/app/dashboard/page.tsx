import DashboardWrapper from "@/components/organisms/dashboard/DashboardWrapper";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <DashboardWrapper token={token} />;
}
