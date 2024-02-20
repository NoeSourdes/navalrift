"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";

export const InputsComponentsSignIn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="space-y-3">
      <Input
        size="lg"
        type="email"
        variant="underlined"
        label="Email"
        placeholder="Entrer votre email"
      />
      <Input
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
      <div className="flex items-center justify-between">
        <Checkbox>Se souvenir de moi</Checkbox>
        <Link href="#" className="text-gray-400">
          Mot de passe oublié ?
        </Link>
      </div>
      <Button color="primary" size="lg" className="w-full">
        Se connecter
      </Button>
      <p className="text-center">
        Besoin de créer un compte?{" "}
        <Link
          href="/sign-up"
          className="text-primary hover:text-blue-700 transition-colors"
        >
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
};
