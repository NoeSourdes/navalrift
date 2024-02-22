import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { hash } from "bcrypt";
import crypto from "crypto";
import { NextResponse } from "next/server";
import EmailVerified from "../../../../../emails/email-verified";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // check is email is already used
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      return NextResponse.json(
        { user: null, message: "L'email est déjà utilisé" },
        { status: 400 }
      );
    }

    // create user
    const hashedPassword = await hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        image: "https://i.postimg.cc/kGHdNjjj/7309681.jpg",
      },
    });
    const { password: newPassword, ...rest } = createUser;

    const emailVerifiedToken = crypto.randomBytes(32).toString("base64url");
    const production = process.env.PRODUCTION === "true" ? true : false;
    let url;
    if (production) {
      url = `http://localhost:3000/email-verified?token=${emailVerifiedToken}`;
    } else {
      url = `https://navalrift.vercel.app/email-verified?token=${emailVerifiedToken}`;
    }

    await prisma.user.update({
      where: {
        id: createUser.id,
      },
      data: {
        emailVerifiedToken: emailVerifiedToken,
      },
    });
    resend.emails.send({
      from: "NavalRift <do-not-reply@noesourdes.fr>",
      to: email,
      subject: "Vérification de l'adresse e-mail",
      react: EmailVerified({
        userFirstname: createUser.name,
        verifyEmailLink: url,
      }),
    });

    return NextResponse.json(
      {
        user: rest,
        message:
          "Merci de consulter votre boîte de réception afin de confirmer votre adresse e-mail.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Quelque chose a mal tourné !",
          error: { message: error.message, stack: error.stack },
        },
        { status: 500 }
      );
    }
  }
}
