import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-full h-96 rounded-[25px]">
        <div className="relative w-full h-full bg-[#27272A]/50 border-[#3F4047] rounded-[25px] flex flex-col justify-center items-center px-5 z-20 space-y-10 max-w-4xl mx-auto border">
          <h3 className="sm:text-4xl text-3xl font-bold text-center">
            Prêt à vivre une{" "}
            <span className="text-primary">aventure épique</span> dans le monde
            de la <span className="text-primary">bataille navale</span> ?
          </h3>
          <Link href="/sign-in">
            <Button
              size="lg"
              className="bg-gradient-to-tr from-blue-500 to-blue-800 text-white shadow-lg"
            >
              Rejoindre NavalRift
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-7 pb-10">
        <div className="flex items-center">
          <Image
            src="/svg/logo-navalRift.svg"
            alt="NavalRift"
            width={70}
            height={70}
          />
          <p className="font-bold text-inherit text-2xl">
            Naval<span className="text-primary">Rift</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link className=" font-light text-gray-300" href="#">
            Termes
          </Link>
          <Link className=" font-light text-gray-300" href="#">
            Confidentialité
          </Link>
          <Link className=" font-light text-gray-300" href="#">
            Cookies
          </Link>
          <Link className=" font-light text-gray-300" href="#">
            Mentions légales
          </Link>
        </div>
      </div>
    </div>
  );
};
