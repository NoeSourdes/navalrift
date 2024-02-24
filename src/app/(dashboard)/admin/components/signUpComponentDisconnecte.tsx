"use client";

import { InputsComponentsSignUp } from "@/app/(auth)/sign-up/components/inputs";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

interface SingUpComponentDisconnecteProps {
  setSignIn: (value: boolean) => void;
}

export default function page({ setSignIn }: SingUpComponentDisconnecteProps) {
  return (
    <div className="relative py-5">
      <Link href="/" className="absolute top-2 left-2 flex items-center">
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
        <div className="relative w-full px-5 space-y-5 z-20 overflow-y-auto mt-16">
          <div className="space-y-2">
            <h1 className="text-2xl">Créer un compte</h1>
            <h4 className="text-gray-400">
              Créez un nouveau compte pour commencer
            </h4>
          </div>
          <div className="space-y-2">
            <Button
              onClick={() => {
                signIn("google", { callbackUrl: "/admin" });
              }}
              variant="bordered"
              size="lg"
              className="w-full"
            >
              <Image
                src="/svg/google.svg"
                alt="Google"
                width={25}
                height={25}
              />
              Se connecter avec Google
            </Button>
            <Button
              onClick={() => {
                signIn("github", { callbackUrl: "/admin" });
              }}
              variant="bordered"
              size="lg"
              className="w-full"
            >
              <FaGithub size={25} className="text-gray-400" />
              Se connecter avec GitHub
            </Button>
          </div>
          <div className="flex items-center w-full gap-5">
            <span className="w-full border-t border-[#3F3F46]"></span>
            <span className="text-[#3F3F46]">OU</span>
            <span className="w-full border-t border-[#3F3F46]"></span>
          </div>
          <div className=" overflow-hidden">
            <InputsComponentsSignUp setSignIn={setSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
}
