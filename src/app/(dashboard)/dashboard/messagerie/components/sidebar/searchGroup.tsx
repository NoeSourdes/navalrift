"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import {
  DeleteGroupDB,
  QuitGroupDB,
  RenameGroupDB,
} from "@/app/actions/users/groupe";
import { useAppContext } from "@/context";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GroupModal } from "../GroupModal";
import { NoGroup } from "./NoGroup";
import { AddGroup } from "./plus";

interface SearchGroupProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchGroup = ({
  groups,
  setGroups,
  fetchGroups,
  setOpen,
}: SearchGroupProps) => {
  const { data: session } = useSession();
  const { play, playHover } = useButtonSounds();
  const [renameGroupe, setRenameGroupe] = useState(false);
  const [quitGroupe, setQuitGroupe] = useState(false);
  const [nameGroup, setNameGroup] = useState("");
  const [idGroup, setIdGroup] = useState("");
  const [isActionGood, setIsActionGood] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const onOpenChange = (id: string, open: boolean) => {
    setIsOpen((prev) => ({ ...prev, [id]: open }));
  };
  const user_id = session?.user?.id ? session.user.id : "";
  const {
    setIsSelectGroupe,
    isSelectGroupe,
    setNameGroupeSelected,
    nameGroupeSelected,
    setIdGroupeSelected,
    idGroupeSelected,
    setCreatorGroupSelected,
    creatorGroupSelected,
    sockets,
  } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (user_id) {
      fetchGroups();
    }
  }, [fetchGroups, user_id]);

  const handleGroupAction = async (action: string, id_group: string) => {
    play();
    switch (action) {
      case "delete":
        setRenameGroupe(false);
        setIsActionGood(false);
        setIdGroup(id_group);
        onOpenChange(id_group, true);

        break;
      case "quit":
        setRenameGroupe(false);
        setQuitGroupe(true);
        setIsActionGood(false);
        setIdGroup(id_group);
        onOpenChange(id_group, true);
        break;
      case "rename":
        setIsActionGood(false);
        setRenameGroupe(true);
        setIdGroup(id_group);
        onOpenChange(id_group, true);

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
    onOpenChange(id_group, false);
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
    onOpenChange(id_group, false);
    setLoading(false);
    router.push("/dashboard/messagerie");
    fetchGroups();
  };

  const handleQuitGroup = async (id_group: string, id_user: string) => {
    play();
    setLoading(true);
    const quitGroupResult = await QuitGroupDB(id_group, id_user);
    if (quitGroupResult.success) {
      setIsActionGood(true);
      toast.success(quitGroupResult.message);
    } else {
      setIsActionGood(false);
      toast.error(quitGroupResult.message);
    }
    setRenameGroupe(false);
    onOpenChange(id_group, false);
    setLoading(false);
    router.push("/dashboard/messagerie");
    fetchGroups();
  };

  // partie de la gestion des sockets pour les groupes

  const handleJoinGroup = async (id_group: string) => {
    if (id_group) {
      await sockets.emit("join_conversation", id_group);
    }
  };

  // gestions des routes pour les groupes

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
                <div
                  key={group.id}
                  onClick={() => {
                    setIsSelectGroupe(true);
                    setNameGroupeSelected(group.name);
                    setIdGroupeSelected(group.id);
                    setCreatorGroupSelected(group.isCreator);
                    handleJoinGroup(group.id);
                    setOpen(false);
                    play();
                  }}
                  className="py-2 px-5 cursor-pointer hover:bg-black/25 transition-colors"
                  style={{
                    backgroundColor:
                      nameGroupeSelected === group.name
                        ? "rgba(0,0,0,0.25)"
                        : "",
                    borderLeft:
                      nameGroupeSelected === group.name
                        ? "2px solid #2F6EE7"
                        : "",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Link href={`/dashboard/messagerie/${group.id}`}>
                      <div className="">
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
                    </Link>
                    {group.isCreator === session?.user?.name ? (
                      <Dropdown>
                        <DropdownTrigger>
                          <div
                            onClick={() => play()}
                            className=" cursor-pointer hover:text-primary transition-colors"
                          >
                            <MoreHorizontal />
                          </div>
                        </DropdownTrigger>
                        <DropdownMenu
                          variant="faded"
                          aria-label="Group Actions"
                        >
                          <DropdownItem
                            onMouseEnter={() => playHover()}
                            onClick={() =>
                              handleGroupAction("rename", group.id)
                            }
                          >
                            Renommer le groupe
                          </DropdownItem>
                          <DropdownItem
                            onMouseEnter={() => playHover()}
                            color="danger"
                            onClick={() =>
                              handleGroupAction("delete", group.id)
                            }
                          >
                            Supprimer le groupe
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <Dropdown>
                        <DropdownTrigger>
                          <div
                            onClick={() => play()}
                            className=" cursor-pointer hover:text-primary transition-colors"
                          >
                            <MoreHorizontal />
                          </div>
                        </DropdownTrigger>
                        <DropdownMenu
                          variant="faded"
                          aria-label="Group Actions"
                        >
                          <DropdownItem
                            color="danger"
                            onMouseEnter={() => playHover()}
                            onClick={() => handleGroupAction("quit", group.id)}
                          >
                            Quitter le groupe
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    )}
                  </div>
                </div>
                <Divider />
                <GroupModal
                  group={group}
                  fetchGroups={fetchGroups}
                  handleDeleteGroup={handleDeleteGroup}
                  handleQuitGroup={handleQuitGroup}
                  handleRenameGroup={handleRenameGroup}
                  idGroup={idGroup}
                  isActionGood={isActionGood}
                  isOpen={isOpen[group.id] || false}
                  onOpenChange={(open) => onOpenChange(group.id, open)}
                  renameGroupe={renameGroupe}
                  setNameGroup={setNameGroup}
                  loading={loading}
                  nameGroup={nameGroup}
                  userId={user_id}
                  quitGroupe={quitGroupe}
                />
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
