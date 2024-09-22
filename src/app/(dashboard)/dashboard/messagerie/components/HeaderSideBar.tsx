"use client";
import { AddGroup } from "./sidebar/plus";

interface HeaderSideBarProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: () => void;
}

export const HeaderSideBar = ({
  groups,
  setGroups,
  fetchGroups,
}: HeaderSideBarProps) => {
  return (
    <div className="flex items-center justify-between p-5">
      <h1 className="text-lg text-white">Messagerie</h1>
      <AddGroup
        fetchGroups={fetchGroups}
        groups={groups}
        setGroups={setGroups}
      />
    </div>
  );
};
