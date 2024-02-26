"use server";
import { prisma } from "@/lib/prisma";

export const createGroupMessage = async (
  name_group: string,
  id_user: string
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id_user,
      },
    });
    if (!user) {
      return { success: false, message: "L'utilisateur est introuvable" };
    }
    const group = await prisma.group.findUnique({
      where: {
        name: name_group,
      },
    });
    if (group) {
      return { success: false, message: "Le groupe existe déjà" };
    }
    await prisma.group.create({
      data: {
        name: name_group,
        users: {
          connect: {
            id: id_user,
          },
        },
      },
    });
    return { success: true, message: "Le groupe a bien été créé" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Une erreur inconnue s'est produite" };
  }
};

export const SearchGroupDB = async (user_id: string) => {
  const userGroupsDB = await prisma.group.findMany({
    where: {
      users: {
        some: {
          id: user_id,
        },
      },
    },
  });
  return userGroupsDB;
};
