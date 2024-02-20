import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { InputsComponentsSignUp } from "./components/inputs";

export default function page() {
  return (
    <div className="relative h-screen px-5 py-5">
      <div className="absolute -rotate-12 w-full max-sm:max-w-[200px] max-w-[400px] h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-blue-800 z-10 blur-[300px] max-sm:blur-[200px]"></div>

      <Link
        href="/"
        className="absolute sm:top-5 sm:left-5 top-2 left-2 flex items-center"
      >
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
      <div className="h-full w-full flex justify-center items-center">
        <div className="relative w-full max-w-md space-y-5 bg-background rounded-[25px] p-5 z-20">
          <div className="space-y-2">
            <h1 className="text-2xl">Créer un compte</h1>
            <h4 className="text-gray-400">
              Créez un nouveau compte pour commencer
            </h4>
          </div>
          <div className="space-y-2">
            <Button variant="bordered" size="lg" className="w-full">
              <Image
                src="/svg/google.svg"
                alt="Google"
                width={25}
                height={25}
              />
              Se connecter avec Google
            </Button>
            <Button variant="bordered" size="lg" className="w-full">
              <FaGithub size={25} className="text-gray-400" />
              Se connecter avec GitHub
            </Button>
          </div>
          <div className="flex items-center w-full gap-5">
            <span className="w-full border-t border-[#3F3F46]"></span>
            <span className="text-[#3F3F46]">OU</span>
            <span className="w-full border-t border-[#3F3F46]"></span>
          </div>
          <InputsComponentsSignUp />
        </div>
      </div>
    </div>
  );
}
