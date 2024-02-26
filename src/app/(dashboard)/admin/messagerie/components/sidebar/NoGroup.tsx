"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { createGroupMessage } from "@/app/actions/users/groupe";
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
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface NoGroupProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: () => void;
}

export const NoGroup = ({ setGroups, groups, fetchGroups }: NoGroupProps) => {
  const { play, playHover } = useButtonSounds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createGroupe, setCreateGroupe] = useState(false);
  const [isGroupCreated, setGroupCreated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [nameGroup, setNameGroup] = useState("");
  const [codeGroup, setCodeGroup] = useState("");

  const { data: session } = useSession();
  const user_id = session?.user?.id ? session.user.id : "";
  const name_user = session?.user?.name ? session.user.name : "";

  const handleCreateGroupe = async () => {
    setLoading(true);
    const createGroupe = await createGroupMessage(
      nameGroup,
      user_id,
      name_user
    );
    if (createGroupe.success) {
      setGroupCreated(true);
      toast.success(createGroupe.message);
      const newGroup: Group = {
        id: user_id,
        isCreator: name_user,
        name: nameGroup,
      };
      const newGroups = [...groups, newGroup];
      fetchGroups();
      setGroups(newGroups);
      setCreateGroupe(false);
    } else {
      toast.error(createGroupe.message);
    }
    setLoading(false);
  };

  const handleJoinGroupe = async () => {};

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
                      <Input
                        placeholder="Entrez le nom du groupe"
                        onChange={(e) => setNameGroup(e.target.value)}
                      />
                    ) : (
                      <Input
                        placeholder="Entrez le code du groupe"
                        onChange={(e) => setCodeGroup(e.target.value)}
                      />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Annuler
                  </Button>
                  <Button
                    isLoading={loading}
                    onPress={
                      isGroupCreated
                        ? onClose
                        : createGroupe
                        ? handleCreateGroupe
                        : handleJoinGroupe
                    }
                    color="primary"
                  >
                    {isGroupCreated ? "Terminer" : "Créer"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
