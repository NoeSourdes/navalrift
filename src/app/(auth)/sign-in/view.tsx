"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { InputsComponentsSignIn } from "./components/inputs";

export const SingInPage = () => {
  const [errorLogin, setErrorLogin] = useState(false);
  const [sentanceError, setSentanceError] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error) setErrorLogin(true);
    switch (error) {
      case "OAuthSignin":
        setSentanceError("Erreur de connexion avec le fournisseur OAuth");
        break;
      case "OAuthCallback":
        setSentanceError("Erreur de rappel OAuth");
        break;
      case "OAuthCreateAccount":
        setSentanceError(
          "Impossible de créer un utilisateur OAuth dans la base de données"
        );
        break;
      case "EmailCreateAccount":
        setSentanceError(
          "Impossible de créer un utilisateur avec l'email fourni"
        );
        break;
      case "Callback":
        setSentanceError("Erreur de rappel");
        break;
      case "OAuthAccountNotLinked":
        setSentanceError(
          "Le compte est déjà lié à un autre fournisseur soit Google, soit GitHub"
        );
        break;
      case "EmailSignin":
        setSentanceError("Erreur de connexion avec l'email");
        break;
      case "CredentialsSignin":
        setSentanceError("Erreur de connexion avec les identifiants");
        break;
      case "SessionRequired":
        setSentanceError("Session requise");
        break;
    }
  }, []);
  return (
    <div className="relative px-5 py-5">
      <div className="hidden sm:block absolute -rotate-12 w-full max-sm:max-w-[200px] max-w-[400px] h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-800 to-blue-800 z-10 blur-[300px] max-sm:blur-[200px]"></div>

      <Link
        href="/"
        className="absolute sm:top-5 sm:left-5 top-0 left-2 flex items-center"
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
        <div className="relative w-full sm:max-w-md max-w-sm space-y-5 sm:bg-background sm:rounded-[25px] sm:p-5 z-20 overflow-y-auto md:mt-24 mt-16">
          <div className="space-y-2">
            <h1 className="text-2xl">Content de te revoir</h1>
            <h4 className="text-gray-400">
              Connectez-vous à votre compte pour continuer
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
          <div className="overflow-hidden">
            <InputsComponentsSignIn />
          </div>
          {errorLogin && (
            <div className="flex justify-center items-center border border-error rounded-xl p-5">
              <p className="text-error font-medium text-center">
                {sentanceError}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
