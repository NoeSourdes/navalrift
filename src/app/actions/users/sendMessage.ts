"use server";
import { prisma } from "../../../lib/prisma";

interface MsgDataTypes {
  img: string;
  id_group: string;
  message: string;
  user_id: string;
  time: string;
}

export const createMessage = async (msgData: MsgDataTypes) => {
  return await prisma.message.create({
    data: {
      content: msgData.message,
      authorId: msgData.user_id,
      groupId: msgData.id_group,
      image: msgData.img,
    },
  });
};

export const getMessagesByGroupId = async (groupId: string) => {
  return await prisma.message.findMany({
    where: {
      groupId: groupId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
