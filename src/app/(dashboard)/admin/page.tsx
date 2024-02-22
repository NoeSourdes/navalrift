import { auth } from "@/lib/auth";
import { Test } from "./components/test";

export default async function page() {
  const session = await auth();
  return <Test />;
}
