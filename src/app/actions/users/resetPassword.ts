"use server";
import { ResetPasswordEmail } from "./../../../../emails/reset-password";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import crypto from "crypto";

export const resetPassword = async (email: string) => {
  console.log(email);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const PasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expire = new Date(today.setDate(today.getDate() + 1));
  const production = process.env.PRODUCTION === "true" ? true : false;
  let url;
  if (production) {
    url = `http://localhost:3000/reset-password?token=${PasswordToken}`;
  } else {
    url = `https://navalrift.vercel.app/reset-password?token=${PasswordToken}`;
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: PasswordToken,
      resetPasswordTokenExpires: expire,
    },
  });
  resend.emails.send({
    from: "NavalRift <do-not-reply@noesourdes.fr>",
    to: email,
    subject: "Reniitialiser votre mot de passe",
    react: ResetPasswordEmail({
      userFirstname: user.name ? user.name : "navalRift",
      resetPasswordLink: url,
    }),
  });
  return (
    "Un email de réinitialisation de mot de passe a été envoyé à votre adresse email : " +
    email +
    " ."
  );
};
