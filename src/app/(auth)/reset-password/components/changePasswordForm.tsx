import Image from "next/image";
import Link from "next/link";
import { InputsComponentsResetPassword } from "./inputs";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

export const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  return (
    <div className="relative px-5 py-5">
      <div className="block max-sm:hidden absolute -rotate-12 w-full max-sm:max-w-[200px] max-w-[400px] h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 z-10 blur-[300px] max-sm:blur-[200px]"></div>

      <Link
        href="/"
        className="absolute sm:top-5 sm:left-5 top-0 left-2 flex items-center"
      >
        <Image
          src="/svg/logo-navalRift.svg"
          alt="NavalRift"
          width={70}
          height={70}
        />
        <p className="font-bold text-inherit text-2xl">
          Naval<span className="text-primary">Rift</span>
        </p>
      </Link>
      <div className="h-full w-full flex justify-center items-center">
        <div className="relative w-full sm:max-w-md max-w-sm space-y-5 sm:bg-background sm:rounded-[25px] sm:p-5 z-20 overflow-y-auto md:mt-24 mt-16">
          <div className="space-y-2">
            <h1 className="text-2xl">Changer le mot de passe</h1>
            <h4 className="text-gray-400">Entrez votre nouveau mot de passe</h4>
          </div>
          <div className=" overflow-hidden">
            <InputsComponentsResetPassword
              resetPasswordToken={resetPasswordToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
