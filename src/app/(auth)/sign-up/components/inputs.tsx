"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";

export const InputsComponentsSignUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="space-y-3">
      <Input
        isRequired
        size="lg"
        type="email"
        variant="underlined"
        label="Email"
        placeholder="Entrer votre email"
      />
      <Input
        isRequired
        size="lg"
        label="Password"
        variant="underlined"
        placeholder="Entrer votre mot de passe"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <RiEyeCloseLine className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <IoEyeSharp className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      <Input
        isRequired
        size="lg"
        label="Confirmer le mot de passe"
        variant="underlined"
        placeholder="Confirmer votre mot de passe"
        type={isVisible ? "text" : "password"}
      />
      <div className="space-y-5">
        <Checkbox className="">
          J&apos;accepte les{" "}
          <Link
            href="#"
            className="text-primary hover:text-blue-700 transition-colors"
          >
            Termes
          </Link>{" "}
          et la{" "}
          <Link
            href="#"
            className="text-primary hover:text-blue-700 transition-colors"
          >
            Politique de confidentialité
          </Link>
        </Checkbox>
        <Button color="primary" size="lg" className="w-full">
          S&apos;inscrire
        </Button>
        <p className="text-center">
          Vous avez déjà un compte?{" "}
          <Link
            href="/sign-in"
            className="text-primary hover:text-blue-700 transition-colors"
          >
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};
