"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export const NoGroup = () => {
  const { play, playHover } = useButtonSounds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createGroupe, setCreateGroupe] = useState(false);
  return (
    <div className="p-5">
      <p className="text-center text-sm text-gray-400">
        Vous n&apos;avez pas encore créé ou rejoint de groupe. Commencez dès
        maintenant.
      </p>
      <div className="flex justify-center mt-5">
        <Dropdown>
          <DropdownTrigger
            className="flex items-center gap-3"
            onClick={() => play()}
          >
            <Button
              onClick={() => play()}
              onMouseEnter={() => playHover()}
              color="primary"
            >
              Ajouter un groupe
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="faded">
            <DropdownItem
              onPress={() => {
                setCreateGroupe(true);
                onOpen();
              }}
              onMouseEnter={() => playHover()}
              onClick={() => play}
              key="Create_group"
            >
              Créer un nouveau groupe
            </DropdownItem>
            <DropdownItem
              onPress={() => {
                setCreateGroupe(false);
                onOpen();
              }}
              onMouseEnter={() => playHover()}
              onClick={() => play}
              key="Join_group"
            >
              Rejoindre un groupe
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
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
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {createGroupe ? "Créer un groupe" : "Rejoindre un groupe"}
                  <p className="text-sm text-gray-500">
                    {createGroupe
                      ? "Créer un nouveau groupe pour discuter avec vos amis"
                      : "Rejoignez un groupe en utilisant le code du groupe"}
                  </p>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-3">
                    {createGroupe ? (
                      <Input placeholder="Entrez le nom du groupe" />
                    ) : (
                      <Input placeholder="Entrez le code du groupe" />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Annuler
                  </Button>
                  <Button color="primary">Créer</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
