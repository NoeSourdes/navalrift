"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { DeleteGroupDB, RenameGroupDB } from "@/app/actions/users/groupe";
import {
  Button,
  Divider,
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
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NoGroup } from "./NoGroup";
import { AddGroup } from "./plus";

interface SearchGroupProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: () => void;
}

export const SearchGroup = ({
  groups,
  setGroups,
  fetchGroups,
}: SearchGroupProps) => {
  const { data: session } = useSession();
  const { play, playHover } = useButtonSounds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [renameGroupe, setRenameGroupe] = useState(false);
  const [nameGroup, setNameGroup] = useState("");
  const [idGroup, setIdGroup] = useState("");
  const [isActionGood, setIsActionGood] = useState(false);
  const [loading, setLoading] = useState(false);

  const user_id = session?.user?.id ? session.user.id : "";

  useEffect(() => {
    if (user_id) {
      fetchGroups();
    }
  }, [fetchGroups, user_id]);

  const handleGroupAction = (action: string, id_group: string) => {
    play();
    switch (action) {
      case "delete":
        setRenameGroupe(false);
        setIsActionGood(false);
        setIdGroup(id_group);
        onOpen();
        break;
      case "quit":
        console.log("quit");
        break;
      case "rename":
        setIsActionGood(false);
        setRenameGroupe(true);
        setIdGroup(id_group);
        onOpen();
        break;
      default:
        break;
    }
  };

  const handleRenameGroup = async (name: string, id_group: string) => {
    play();
    setLoading(true);
    const renameGroup = await RenameGroupDB(name, id_group);
    if (renameGroup.success) {
      setIsActionGood(true);
      toast.success(renameGroup.message);
    } else {
      setIsActionGood(false);
      toast.error(renameGroup.message);
    }
    setRenameGroupe(false);
    setLoading(false);
    fetchGroups();
  };
  const handleDeleteGroup = async (id_group: string) => {
    play();
    setLoading(true);
    const deleteGroup = await DeleteGroupDB(id_group);
    if (deleteGroup.success) {
      setIsActionGood(true);
      toast.success(deleteGroup.message);
    } else {
      setIsActionGood(false);
      toast.error(deleteGroup.message);
    }
    setRenameGroupe(false);
    setLoading(false);
    fetchGroups();
  };

  const handleActionFilter = (action: string) => {
    play();
    switch (action) {
      case "name":
        console.log("name");
        break;
      case "date":
        console.log("date");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {groups.length > 0 ? (
        <div>
          <div className="flex items-center justify-between gap-2 m-5">
            <AddGroup
              fetchGroups={fetchGroups}
              groups={groups}
              setGroups={setGroups}
            />
            <Input
              size="sm"
              variant="underlined"
              label="Rechercher un groupe"
            />
          </div>
          <Divider />
          <div className="flex flex-col">
            {groups.map((group) => (
              <>
                <div className="border-l-2 border-primary py-2 px-5 cursor-pointer hover:bg-black/25 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <h5>Créateur : {group.isCreator}</h5>
                      </div>
                      <div
                        key={group.id}
                        className="flex items-center justify-between"
                      >
                        <p>{group.name}</p>
                      </div>
                    </div>
                    <Dropdown>
                      <DropdownTrigger>
                        <div
                          onClick={() => play()}
                          className=" cursor-pointer hover:text-primary transition-colors"
                        >
                          <MoreHorizontal />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu variant="faded" aria-label="Group Actions">
                        {session?.user?.name === group.isCreator ? (
                          <DropdownItem
                            onMouseEnter={() => playHover()}
                            onClick={() =>
                              handleGroupAction("rename", group.id)
                            }
                          >
                            Renommer le groupe
                          </DropdownItem>
                        ) : (
                          <></>
                        )}
                        {session?.user?.name === group.isCreator ? (
                          <DropdownItem
                            onMouseEnter={() => playHover()}
                            color="danger"
                            onClick={() =>
                              handleGroupAction("delete", group.id)
                            }
                          >
                            Supprimer le groupe
                          </DropdownItem>
                        ) : (
                          <>
                            <DropdownItem
                              onMouseEnter={() => playHover()}
                              color="danger"
                              onClick={() =>
                                handleGroupAction("quit", group.id)
                              }
                            >
                              Quitter le groupe
                            </DropdownItem>
                          </>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <Divider />
                <Modal
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
                          {renameGroupe
                            ? "Renommer le groupe"
                            : "Supprimer le groupe"}
                          <p className="text-sm text-gray-500">
                            {renameGroupe
                              ? "Entrez le nouveau nom du groupe"
                              : "Etes-vous sûr de vouloir supprimer le groupe ?"}
                          </p>
                        </ModalHeader>
                        <ModalBody>
                          <div className="flex flex-col gap-3">
                            {renameGroupe ? (
                              <Input
                                placeholder="Entrez le nouveau nom du groupe"
                                onChange={(e) => setNameGroup(e.target.value)}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Annuler
                          </Button>
                          <Button
                            isLoading={loading}
                            onPress={
                              isActionGood
                                ? onClose
                                : renameGroupe
                                ? () => handleRenameGroup(nameGroup, idGroup)
                                : () => handleDeleteGroup(idGroup)
                            }
                            color="primary"
                          >
                            {isActionGood
                              ? "Terminer"
                              : renameGroupe
                              ? "Renommer"
                              : "Supprimer"}
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </>
            ))}
          </div>
        </div>
      ) : (
        <NoGroup
          fetchGroups={fetchGroups}
          setGroups={setGroups}
          groups={groups}
        />
      )}
    </div>
  );
};
