import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="border-b border-border">
      <div className="w-full flex items-center justify-between px-6 py-[5px] max-w-7xl m-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/svg/logo-navalRift.svg"
            alt="NavalRift"
            width={70}
            height={70}
          />
          <p className="font-bold text-inherit text-2xl">
            Naval<span className="text-primary">Rift</span>
          </p>
        </Link>
        <div>
          <Button color="primary" variant="flat">
            <Link href="/sign-in">Se connecter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
