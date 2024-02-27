"use client";

import { AddGroup } from "./plus";

interface NoGroupProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  fetchGroups: () => void;
}

export const NoGroup = ({ setGroups, groups, fetchGroups }: NoGroupProps) => {
  return (
    <div className="p-5">
      <p className="text-center text-sm text-gray-400">
        Vous n&apos;avez pas encore créé ou rejoint de groupe. Commencez dès
        maintenant.
      </p>
      <div className="flex justify-center mt-5">
        <AddGroup
          fetchGroups={fetchGroups}
          groups={groups}
          setGroups={setGroups}
          mainButton={true}
        />
      </div>
    </div>
  );
};
