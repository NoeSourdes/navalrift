"use client";

import {
  createMessage,
  getMessagesByGroupId,
} from "@/app/actions/users/sendMessage";
import { useAppContext } from "@/context";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoreVertical, SendHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

interface ConversationComponentProps {
  name_group: string;
  id_group: string;
  creator_group: string;
  user_id: string;
  img_user: string;
  chat: MsgDataTypes[];
  setChat: React.Dispatch<React.SetStateAction<MsgDataTypes[]>>;
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
  chat,
  setChat,
}: ConversationComponentProps) => {
  const { sockets } = useAppContext();
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const loadMessages = async () => {
      const messages = await getMessagesByGroupId(id_group);
      const adaptedMessages = messages.map((msg) => ({
        img: msg.image || "",
        id_group: msg.groupId,
        message: msg.content,
        user_id: msg.authorId,
        time: msg.createdAt.getHours() + ":" + msg.createdAt.getMinutes(),
      }));
      setChat(adaptedMessages);
    };

    loadMessages();
  }, [id_group, setChat]);

  const sendMessage = async () => {
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
      setChat((pre) => [...pre, msgData]);
      setMessage("");
      await createMessage(msgData);
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chat]);
  return (
    <div className="flex flex-col w-full h-full lg:p-6 p-3">
      <div className="w-full flex items-center justify-between h-20 rounded-lg bg-blue-800/75 p-2">
        <div className="max-lg:ml-7">
          <h1 className="text-2xl text-white font-semibold">{name_group}</h1>
          <p className="text-gray-400">{creator_group}</p>
        </div>
        <div className="max-lg:hidden">
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
        <div className="lg:hidden block">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="faded" color="primary">
                <MoreVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded">
              <DropdownItem
                onClick={() => {
                  navigator.clipboard.writeText(id_group);
                  toast("Code du groupe copié");
                }}
                key="copy"
              >
                Copier le code du groupe
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="grow w-full rounded-lg flex flex-col overflow-y-scroll">
        <div className="w-full my-5">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 mb-2 ${
                msg.user_id === user_id ? "justify-end" : "justify-start"
              }`}
            >
              {msg.user_id !== user_id && (
                <Image
                  src={msg.img}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <div
                className={`p-3 rounded-xl ${
                  msg.user_id === user_id
                    ? "bg-blue-800/75 text-foreground"
                    : "bg-border/75 text-foreground"
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-xs text-gray-400 w-full flex justify-end">
                  {msg.time}
                </p>
              </div>
              {msg.user_id === user_id && (
                <Image
                  src={msg.img}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="w-full bg-blue-800/75 lg:p-5 p-3 rounded-lg flex items-end gap-2 shadow-xl">
        <div className="w-full h-full flex justify-center items-center">
          <TextareaAutosize
            maxRows={5}
            placeholder="Écrivez votre message..."
            className="w-full h-full bg-transparent focus:outline-none px-3 py-2 border-2 border-border rounded-[25px]"
            style={{ resize: "none" }}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            value={message}
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
  );
};
