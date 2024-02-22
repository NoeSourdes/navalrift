"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export const ChangePassword = async (
  newPassword: string,
  resetPasswordToken: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  });
  if (!user) {
    throw new Error("Utlisateur non trouvé");
  }
  const dateExpires = user.resetPasswordTokenExpires;
  const today = new Date();
  if (!dateExpires) {
    throw new Error("Le lien a expiré");
  }
  if (dateExpires < today) {
    throw new Error("Le lien a expiré");
  }
  const hashedPassword = await hash(newPassword, 10);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpires: null,
    },
  });
  return "Mot de passe modifié avec succès !";
};
