"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { Button, Divider } from "@nextui-org/react";
import { HeaderSideBar } from "./HeaderSideBar";
import { NoGroup } from "./NoGroup";

export const SideBar = () => {
  const { play, playHover } = useButtonSounds();
  return (
    <div className="flex flex-col">
      <HeaderSideBar />
      <Divider />
      <NoGroup />
    </div>
  );
};
