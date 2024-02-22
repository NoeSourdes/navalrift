"use client";

import { resetPassword } from "@/app/actions/users/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormResetPassowrd = () => {
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    email: z
      .string()
      .email("L'email est invalide")
      .min(1, "L'email est requis"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const message = await resetPassword(values.email);
    toast.success(message);
    setLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={true}
        size="3xl"
        backdrop="blur"
        hideCloseButton={true}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="pb-5 pt-2">
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Mot de passe oublié ?</h2>
              <p className="text-sm text-default-400">
                Entrez votre adresse email pour recevoir un lien de
                réinitialisation.
              </p>
            </ModalHeader>
            <ModalBody>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        label="Email"
                        placeholder="
                        Entrez votre adresse email
                      "
                        size="lg"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <Button
                  isLoading={loading}
                  disabled={loading}
                  type="submit"
                  size="lg"
                  color="primary"
                  className="w-full"
                >
                  Envoyer
                </Button>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
