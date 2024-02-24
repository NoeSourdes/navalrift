"use client";

import { InputsComponentsSignIn } from "@/app/(auth)/sign-in/components/inputs";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";

interface SingInComponentDisconnecteProps {
  setSignIn: (value: boolean) => void;
}

export const SingInComponentDisconnecte = ({
  setSignIn,
}: SingInComponentDisconnecteProps) => {
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
      case "AdapterError":
        setSentanceError("Erreur d'adaptateur");
        break;
    }
  }, []);
  return (
    <div className="relative px-5 py-5">
      <div className="absolute top-2 left-2 flex items-center">
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
      <div className="h-full w-full flex justify-center items-center">
        <div className="relative w-full sm:max-w-md max-w-sm space-y-5 z-20 overflow-y-auto mt-16">
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
            <InputsComponentsSignIn setSignIn={setSignIn} />
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
