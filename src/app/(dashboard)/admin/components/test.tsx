import { auth } from "@/lib/auth";
import Image from "next/image";
import { ButtonLogout } from "./buttonLogout";

export const Test = async () => {
  const session = await auth();
  return (
    <div>
      <h1>{session?.user?.email}</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.id}</h1>
      <Image
        src={session?.user?.image ? session?.user.image : ""}
        alt="user"
        width={100}
        height={100}
      />
      <ButtonLogout />
    </div>
  );
};
