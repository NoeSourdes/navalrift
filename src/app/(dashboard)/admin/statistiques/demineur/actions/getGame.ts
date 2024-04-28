"use server";

import { prisma } from "../../../../../../lib/prisma";

export async function getGame() {
  const games = await prisma.demineurGameSession.findMany({
    select: {
      id: true,
      name: true,
      date: true,
      time: true,
      nb_cout: true,
      win: true,
      avatar: true,
      email: true,
    },
  });
  return games;
}
