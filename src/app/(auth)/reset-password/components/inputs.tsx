"use client";

import { ChangePassword } from "@/app/actions/users/changePasswordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoEyeSharp } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";
import { toast } from "sonner";
import { z } from "zod";

interface InputsComponentsResetPasswordProps {
  resetPasswordToken: string;
}

export const InputsComponentsResetPassword = ({
  resetPasswordToken,
}: InputsComponentsResetPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const FormSchema = z
    .object({
      email: z
        .string()
        .email("L'email est invalide")
        .min(1, "L'email est requis"),
      password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .min(1, "Le mot de passe est requis"),
      confirmPassword: z
        .string()
        .min(1, "La confirmation du mot de passe est requise"),
      termsAccepted: z
        .boolean()
        .refine(
          (val) => val === true,
          "Vous devez accepter les termes et les conditions"
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Les mots de passe ne correspondent pas",
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const password = values.password;
    const message = await ChangePassword(password, resetPasswordToken);
    if (message) {
      toast.success(message);
      router.push("/sign-in");
    } else {
      toast.error("Erreur inconnue");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <Input
                {...field}
                isRequired
                size="lg"
                label="Email"
                variant="underlined"
                placeholder="Entrer votre email"
              />
              {form.formState.errors.email && (
                <p className="text-error text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <Input
                {...field}
                isRequired
                size="lg"
                label="Mot de passe"
                variant="underlined"
                placeholder="Entrer votre nouveau mot de passe"
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
                <p className="text-error text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <>
              <Input
                {...field}
                isRequired
                size="lg"
                label="Confirmer le mot de passe"
                variant="underlined"
                placeholder="Confirmer votre mot de passe"
                type={isVisible ? "text" : "password"}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-error text-sm">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </>
          )}
        />
        <div className="space-y-5">
          <Controller
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <div>
                <Checkbox
                  className="mt-[1px]py-0 my-0"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  <p>
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
                      confidentialité
                    </Link>
                  </p>
                </Checkbox>
                {form.formState.errors.termsAccepted && (
                  <p className="text-error text-sm ">
                    {form.formState.errors.termsAccepted.message}
                  </p>
                )}
              </div>
            )}
          />
          <Button
            isLoading={loading}
            disabled={loading}
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
          >
            Rénitialiser le mot de passe
          </Button>
        </div>
      </form>
    </div>
  );
};