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
import { Plus } from "lucide-react";
import { useState } from "react";

export const HeaderSideBar = () => {
  const { play, playHover } = useButtonSounds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createGroupe, setCreateGroupe] = useState(false);

  return (
    <div className="flex items-center justify-between p-5">
      <h1 className="text-lg text-white">Messagerie</h1>
      <Dropdown>
        <DropdownTrigger
          className="flex items-center gap-3"
          onClick={() => play()}
        >
          <Button
            onMouseEnter={() => playHover()}
            isIconOnly
            radius="full"
            color="primary"
            variant="faded"
          >
            <Plus />
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
  );
};
