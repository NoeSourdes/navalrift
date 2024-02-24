"use client";

import { CheckEmailVerififed } from "@/app/actions/users/checkEmailVerififed";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, useDisclosure } from "@nextui-org/react";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoEyeSharp } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";
import { toast } from "sonner";
import { z } from "zod";
import { FormResetPassowrd } from "./formResetPassowrd";

interface InputsComponentsSignInProps {
  setSignIn?: (value: boolean) => void;
}

export const InputsComponentsSignIn = ({
  setSignIn,
}: InputsComponentsSignInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const FormSchema = z.object({
    email: z
      .string()
      .email("L'email est invalide")
      .min(1, "L'email est requis"),
    password: z.string().min(1, "Le mot de passe est requis"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: Cookies.get("email") || "",
      password: Cookies.get("password") || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const checkEmail = await CheckEmailVerififed(values.email);
    if (!checkEmail) {
      toast.error("Veuillez vérifier votre email pour continuer");
      setLoading(false);
      return;
    }
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    setLoading(false);
    if (signInData?.error) {
      switch (signInData.error) {
        case "CredentialsSignin":
          toast.error("Erreur de connexion. Vérifiez vos identifiants.");
          break;
        case "EmailCreateAccount":
          toast.error("Impossible de créer un compte avec cet email.");
          break;
        default:
          toast.error("Une erreur inconnue est survenue.");
      }
    } else {
      if (Cookies.get("rememberMe") === "true") {
        Cookies.set("email", values.email);
        Cookies.set("password", values.password);
      }
      router.push("/admin");
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <>
              <Input
                size="lg"
                label="Email"
                variant="underlined"
                placeholder="Entrer votre email"
                {...field}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                size="lg"
                label="Mot de passe"
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
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </>
          )}
        />
        <div className="space-y-5">
          <div className="flex items-center justify-between pt-2">
            <Checkbox
              onChange={(e) =>
                Cookies.set("rememberMe", e.target.checked.toString())
              }
            >
              Se souvenir de moi
            </Checkbox>
            <FormResetPassowrd />
          </div>
          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            color="primary"
            size="lg"
            className="w-full"
          >
            Se connecter
          </Button>
          <p className="text-center flex justify-center items-center gap-1">
            Besoin de créer un compte?{" "}
            {setSignIn ? (
              <div
                onClick={() => setSignIn(false)}
                className="text-primary hover:text-blue-700 transition-colors cursor-pointer"
              >
                S&apos;inscrire
              </div>
            ) : (
              <Link
                href="/sign-up"
                className="text-primary hover:text-blue-700 transition-colors"
              >
                S&apos;inscrire
              </Link>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};
