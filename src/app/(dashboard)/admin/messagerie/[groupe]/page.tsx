"use client";

import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ConversationComponent } from "../components/ConversationComponent";

interface MsgDataTypes {
  img: string;
  id_group: string;
  message: string;
  user_id: string;
  time: string;
}

export default function Page({ params }: { params: { groupe: string } }) {
  const { nameGroupeSelected, creatorGroupSelected, sockets } = useAppContext();
  const [chat, setChat] = useState<MsgDataTypes[]>([]);
  useEffect(() => {
    const messageHandler = (data: MsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    };

    sockets.on("receive_msg", messageHandler);

    // Se désabonner lors du nettoyage
    return () => {
      sockets.off("receive_msg", messageHandler);
    };
  }, [sockets]);

  const { data: session } = useSession();
  return (
    <div className="h-full w-full rounded-xl overflow-hidden">
      <div className="h-full w-full  bg-blue-900 bg-dot-[#0070EF] relative flex items-center justify-center rounded-lg overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>
        <div className="relative z-20 h-full w-full">
          <ConversationComponent
            chat={chat}
            setChat={setChat}
            name_group={nameGroupeSelected}
            id_group={params.groupe}
            creator_group={creatorGroupSelected}
            user_id={session?.user?.id ? session.user.id : ""}
            img_user={session?.user?.image ? session.user.image : ""}
          />
        </div>
      </div>
    </div>
  );
}
