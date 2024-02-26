"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { Divider } from "@nextui-org/react";
import { useState } from "react";
import { HeaderSideBar } from "./HeaderSideBar";
import { SearchGroup } from "./sidebar/searchGroup";
export const SideBar = () => {
  const { play, playHover } = useButtonSounds();
  const [groups, setGroups] = useState<Group[]>([]);
  return (
    <div className="flex flex-col">
      <HeaderSideBar setGroups={setGroups} groups={groups} />
      <Divider />
      <SearchGroup setGroups={setGroups} groups={groups} />
    </div>
  );
};
