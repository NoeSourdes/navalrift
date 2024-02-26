"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { SearchGroupDB } from "@/app/actions/users/groupe";
import { Divider } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { HeaderSideBar } from "./HeaderSideBar";
import { SearchGroup } from "./sidebar/searchGroup";
export const SideBar = () => {
  const { play, playHover } = useButtonSounds();
  const [groups, setGroups] = useState<Group[]>([]);
  const { data: session } = useSession();
  const user_id = session?.user?.id ? session.user.id : "";
  const fetchGroups = useCallback(async () => {
    let userGroupsDB = await SearchGroupDB(user_id);
    userGroupsDB = userGroupsDB.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setGroups(userGroupsDB);
  }, [user_id, setGroups]);
  return (
    <div className="flex flex-col">
      <HeaderSideBar
        fetchGroups={fetchGroups}
        setGroups={setGroups}
        groups={groups}
      />
      <Divider />
      <SearchGroup
        fetchGroups={fetchGroups}
        setGroups={setGroups}
        groups={groups}
      />
    </div>
  );
};
