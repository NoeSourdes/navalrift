"use client";

import { resetPassword } from "@/app/actions/users/resetPassword";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

export const FormResetPassowrd = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      toast.error("Email invalide");
      return;
    }
    const message = await resetPassword(email);
    toast.success(message);
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
              <form className="space-y-5">
                <Input
                  size="lg"
                  label="Email"
                  placeholder="Entrer votre email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
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
