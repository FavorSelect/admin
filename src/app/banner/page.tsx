import BannerWrapper from "@/components/organisms/banner/BannerWrapper";
import { cookies } from "next/headers";

export default async function Banner() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token || token === "undefined") return;
  return <BannerWrapper token={token} />;
}
