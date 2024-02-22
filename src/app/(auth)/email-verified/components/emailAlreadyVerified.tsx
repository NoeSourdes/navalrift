"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const EmailAlreadyVerified = () => {
  const router = useRouter();
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
              <h2 className="text-2xl font-bold">
                Email déjà vérifié ou vérification expirée
              </h2>
              <p className="text-sm text-default-400">
                Votre email a déjà été vérifié ou le lien de vérification a
                expiré
              </p>
            </ModalHeader>
            <ModalBody>
              <Button
                onClick={() => {
                  router.push("/sign-in");
                }}
                size="lg"
                color="primary"
                className="w-full"
              >
                Revenir à la page de connexion
              </Button>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
