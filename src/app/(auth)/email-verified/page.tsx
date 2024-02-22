import { prisma } from "@/lib/prisma";
import { EmailAlreadyVerified } from "./components/emailAlreadyVerified";
import { EmailVerified } from "./components/emailVerified";
interface resetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function resetPasswordPage({
  searchParams,
}: resetPasswordPageProps) {
  if (searchParams.token) {
    const user = await prisma.user.findFirst({
      where: {
        emailVerifiedToken: searchParams.token as string,
      },
    });
    if (!user) {
      return <EmailAlreadyVerified />;
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerifiedToken: null,
        emailVerified: true,
      },
    });
    return <EmailVerified />;
  } else {
    return <EmailAlreadyVerified />;
  }
}
