import FreeCallClient from "./FreeCallClient";
import { getSiteData } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function FreeCallPage() {
  const { content } = await getSiteData();
  return <FreeCallClient c={content} />;
}
