"use client";

import { resetPassword } from "@/app/actions/users/resetPassword";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

export const FormResetPassowrd = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      toast.error("Email invalide");
      return;
    }
    const message = await resetPassword(email);
    toast.success(message);
    setLoading(false);
  };

  return (
    <>
      <p onClick={onOpen} className="text-primary text-sm cursor-pointer">
        Mot de passe oublié ?
      </p>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        backdrop="blur"
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
                  isLoading={loading}
                  disabled={loading}
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
