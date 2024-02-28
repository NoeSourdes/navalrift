"use client";

import { useAppContext } from "@/context";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { NavBar } from "../components/navBar";

export default function Page() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const token = params.get("token");
  const { lien } = useAppContext();
  return (
    <div className="w-full relative">
      <div>
        <NavBar />
      </div>
      <div className="fixed top-20 left-0 right-0 lg:bottom-28 bottom-96 flex justify-center items-start max-lg:mt-24 lg:items-center max-w-7xl m-auto px-10">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-72 bg-primary rounded-full blur-[100px] z-10 max-lg:hidden"></div>
        <div className="relative flex lg:items-center max-lg:flex-col-reverse gap-10 lg:gap-16 z-20">
          <div className="relative overflow-hidden">
            <div className="relative-image">
              <Image
                className="border border-border rounded-xl"
                src="/svg/app.svg"
                alt="NavalRift"
                width={650}
                height={650}
              />
            </div>
          </div>
          <div className="lg:max-w-md flex flex-col gap-7">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              <span className="text-primary">Connectez-vous</span> ou{" "}
              <span className="text-primary">inscrivez-vous</span> pour
              continuer
            </h1>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: lien,
                  });
                }}
                variant="bordered"
                size="lg"
              >
                <Image
                  src="/svg/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                avec Google
              </Button>
              <Button
                onClick={() => {
                  signIn("github", {
                    callbackUrl: lien,
                  });
                }}
                variant="bordered"
                size="lg"
              >
                <FaGithub size={20} className="text-gray-400" />
                avec GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0">
        <div className="flex flex-col items-center justify-center pb-5">
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
    </div>
  );
}
