"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import { ConversationComponent } from "./components/ConversationComponent";

export default function Messagerie() {
  const {
    isSelectGroupe,
    nameGroupeSelected,
    idGroupeSelected,
    creatorGroupSelected,
  } = useAppContext();
  return (
    <div className="h-full w-full rounded-xl">
      <div className="h-full w-full  bg-blue-900 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>
        {!isSelectGroupe ? (
          <div className="z-10 flex flex-col items-center justify-center gap-2">
            <Image
              src="/svg/no_data.svg"
              alt="no_data"
              width={200}
              height={200}
            />
            <h1 className="text-xl mt-5 text-center text-gray-400">
              Sélectionnez un groupe pour commencer à discuter
            </h1>
          </div>
        ) : (
          <div className="relative w-full h-full z-20">
            <ConversationComponent
              name_group={nameGroupeSelected}
              id_group={idGroupeSelected}
              creator_group={creatorGroupSelected}
            />
          </div>
        )}
      </div>
    </div>
  );
}
