"use server";

import { prisma } from "../../../lib/prisma";

interface GameDataTypes {
  id: string;
  playerId: string;
}

export const createGame = async (gameData: GameDataTypes) => {
  return await prisma.battleShipGame.create({
    data: {
      token: gameData.id,
      players: [gameData.playerId],
      dateExpire: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });
};

export const getGame = async (token: string) => {
  return await prisma.battleShipGame.findUnique({
    where: {
      token: token,
    },
  });
};

export const deleteGame = async (token: string) => {
  return await prisma.battleShipGame.delete({
    where: {
      token: token,
    },
  });
};

export const addPlayer = async (token: string, playerId: string) => {
  return await prisma.battleShipGame.update({
    where: {
      token: token,
    },
    data: {
      players: {
        push: playerId,
      },
    },
  });
};
