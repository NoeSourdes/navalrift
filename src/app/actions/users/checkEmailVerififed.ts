"use server";

import { prisma } from "@/lib/prisma";

export const CheckEmailVerififed = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return false;
  }
  const checkEmailVerififedValue = user.emailVerified;
  return checkEmailVerififedValue;
};
