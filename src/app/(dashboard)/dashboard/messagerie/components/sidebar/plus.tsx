"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { JoinGroupDB, createGroupMessage } from "@/app/actions/users/groupe";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AddGroupProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: () => void;
  mainButton?: boolean;
}

export const AddGroup = ({
  groups,
  setGroups,
  fetchGroups,
  mainButton,
}: AddGroupProps) => {
  const { play, playHover } = useButtonSounds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createGroupe, setCreateGroupe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [nameGroup, setNameGroup] = useState("");
  const [codeGroup, setCodeGroup] = useState("");

  const { data: session } = useSession();
  const user_id = session?.user?.id ? session.user.id : "";
  const name_user = session?.user?.name ? session.user.name : "";
  const router = useRouter();

  const handleCreateGroupe = async (onClose: () => void) => {
    if (!nameGroup) {
      toast.error("Veuillez entrer le nom du groupe");
      return;
    }
    setLoading(true);
    const createGroupe = await createGroupMessage(
      nameGroup,
      user_id,
      name_user
    );
    if (createGroupe.success) {
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
    onClose();
  };

  const handleJoinGroupe = async (onClose: () => void) => {
    if (!codeGroup) {
      toast.error("Veuillez entrer le code du groupe");
      return;
    }
    setLoading(true);
    const Join_group = await JoinGroupDB(user_id, codeGroup);
    if (Join_group.success) {
      toast.success(Join_group.message);
      fetchGroups();
    } else {
      toast.error(Join_group.message);
    }
    setLoading(false);
    onClose();
  };
  return (
    <div>
      <Dropdown>
        <DropdownTrigger
          className="flex items-center gap-3"
          onClick={() => play()}
        >
          {mainButton ? (
            <Button
              size="sm"
              onMouseEnter={() => playHover()}
              radius="full"
              color="primary"
              variant="faded"
            >
              Ajouter un groupe
            </Button>
          ) : (
            <Button
              size="sm"
              onMouseEnter={() => playHover()}
              isIconOnly
              radius="full"
              color="primary"
              variant="faded"
            >
              <Plus />
            </Button>
          )}
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
          {(onClose: any) => (
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
                      onChange={(e: any) => setNameGroup(e.target.value)}
                    />
                  ) : (
                    <Input
                      placeholder="Entrez le code du groupe"
                      onChange={(e: any) => setCodeGroup(e.target.value)}
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
                  onPress={() =>
                    createGroupe
                      ? handleCreateGroupe(onClose)
                      : handleJoinGroupe(onClose)
                  }
                  color="primary"
                >
                  {createGroupe ? "Créer" : "Rejoindre"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
