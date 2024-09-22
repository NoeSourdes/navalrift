"use server";
import { prisma } from "../../../../../lib/prisma";

type data = {
  name: string;
  time: string;
  click: string;
  formattedDate: string;
  win: string;
  avatar: string;
  email: string;
};

export const stockGame = async (data: data) => {
  await prisma.demineurGameSession.create({
    data: {
      name: data.name,
      time: data.time,
      nb_cout: data.click,
      date: data.formattedDate,
      win: data.win,
      avatar: data.avatar,
      email: data.email,
    },
  });
  return "ok";
};
