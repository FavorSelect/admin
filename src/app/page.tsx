import { cookies } from "next/headers";
import Dashboard from "./dashboard/page";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <Dashboard />;
}
