import { prisma } from "@/lib/prisma";
import { ChangePasswordForm } from "./components/changePasswordForm";
import { FormResetPassowrd } from "./components/formPasswordComponent";

interface resetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function resetPasswordPage({
  searchParams,
}: resetPasswordPageProps) {
  if (searchParams.token) {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: searchParams.token as string,
      },
    });
    if (!user) {
      return <div>Le token est invalide</div>;
    }
    return (
      <ChangePasswordForm
        resetPasswordToken={
          user.resetPasswordToken ? user.resetPasswordToken : "1234567890"
        }
      />
    );
  } else {
    return <FormResetPassowrd />;
  }
}
