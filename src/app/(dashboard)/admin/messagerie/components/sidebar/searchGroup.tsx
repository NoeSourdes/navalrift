"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { DeleteGroupDB, RenameGroupDB } from "@/app/actions/users/groupe";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GroupModal } from "../GroupModal";
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
  const [renameGroupe, setRenameGroupe] = useState(false);
  const [nameGroup, setNameGroup] = useState("");
  const [idGroup, setIdGroup] = useState("");
  const [isActionGood, setIsActionGood] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const onOpenChange = (id: string, open: boolean) => {
    setIsOpen((prev) => ({ ...prev, [id]: open }));
  };

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
        onOpenChange(id_group, true);

        break;
      case "quit":
        console.log("quit");
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
    fetchGroups();
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
                <GroupModal
                  group={group}
                  fetchGroups={fetchGroups}
                  handleDeleteGroup={handleDeleteGroup}
                  handleRenameGroup={handleRenameGroup}
                  idGroup={idGroup}
                  isActionGood={isActionGood}
                  isOpen={isOpen[group.id] || false}
                  onOpenChange={(open) => onOpenChange(group.id, open)}
                  renameGroupe={renameGroupe}
                  setNameGroup={setNameGroup}
                  loading={loading}
                  nameGroup={nameGroup}
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
