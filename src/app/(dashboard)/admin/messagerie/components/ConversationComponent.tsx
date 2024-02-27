"use client";

import { useAppContext } from "@/context";
import { Button } from "@nextui-org/react";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

interface ConversationComponentProps {
  name_group: string;
  id_group: string;
  creator_group: string;
  user_id: string;
  img_user: string;
}

interface MsgDataTypes {
  img: string;
  id_group: string;
  message: string;
  user_id: string;
  time: string;
}

export const ConversationComponent = ({
  name_group,
  id_group,
  creator_group,
  user_id,
  img_user,
}: ConversationComponentProps) => {
  const { sockets } = useAppContext();
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<MsgDataTypes[]>([]);
  console.log("chat", chat);

  const sendMessage = async () => {
    console.log("send message");
    if (message) {
      const msgData: MsgDataTypes = {
        img: img_user,
        id_group,
        message,
        user_id,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await sockets.emit("send_msg", msgData);
      setMessage("");
      // await sockets.emit("send_msg", msgData, (confirmation: any) => {
      //   console.log("message envoyé au groupe : ", confirmation.id_group);
      //   setMessage("");
      // });
    }
  };

  useEffect(() => {
    sockets.on("receive_msg", (data: MsgDataTypes) => {
      setChat((prev) => [...prev, data]);
    });
  }, [sockets]);

  return (
    <div className="flex flex-col w-full h-full gap-6 p-6">
      <div className="w-full flex items-center justify-between h-20 rounded-xl bg-blue-800/75 p-2">
        <div>
          <h1 className="text-2xl text-white font-semibold">{name_group}</h1>
          <p className="text-gray-400">{creator_group}</p>
        </div>
        <div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(id_group);
              toast("Code copié");
            }}
            variant="faded"
            color="primary"
          >
            Copier le code du groupe
          </Button>
        </div>
      </div>
      <div className="h-full w-full rounded-xl flex flex-col">
        <div className="h-full w-full">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                msg.user_id === user_id ? "justify-end" : "justify-start"
              }`}
            >
              <Image
                src={msg.img}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div
                className={`p-3 rounded-xl mb-2 ${
                  msg.user_id === user_id
                    ? "bg-blue-800/75 text-white"
                    : "bg-blue-900/75 text-gray-400"
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-xs text-gray-400 w-full flex justify-end">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-blue-800/75 p-5 rounded-xl flex items-end gap-2 shadow-xl">
          <div className="w-full h-full flex justify-center items-center">
            <TextareaAutosize
              maxRows={5}
              placeholder="Écrivez votre message..."
              className="w-full h-full bg-transparent focus:outline-none px-3 py-2 border-2 border-border rounded-[25px]"
              style={{ resize: "none" }}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button
            isDisabled={!message}
            onClick={sendMessage}
            isIconOnly
            variant="faded"
            color="primary"
            className="flex items-center justify-center rounded-full border-2 border-border"
          >
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </div>
  );
};
