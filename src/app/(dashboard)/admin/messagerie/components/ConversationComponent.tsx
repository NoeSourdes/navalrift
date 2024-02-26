"use client";

import { Button } from "@nextui-org/react";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

interface ConversationComponentProps {
  name_group: string;
  id_group: string;
  creator_group: string;
}

export const ConversationComponent = ({
  name_group,
  id_group,
  creator_group,
}: ConversationComponentProps) => {
  const [message, setMessage] = useState<string>("");
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
        <div className="h-full w-full"></div>
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
