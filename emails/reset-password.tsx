import { Img } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface DropboxResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
              primary: "#2F6EE7",
              foreground: "#EBECEE",
            },
          },
        },
      }}
    >
      <div className="relative bg-black p-10 text-foreground font-sans">
        {" "}
        <div className="relative bg-black p-8 rounded-xl z-20">
          <div className="">
            <Img
              src={`https://i.postimg.cc/N07PWtrW/logo-naval-Rift.png`}
              width="40"
              height="40"
              alt="logo-NavalRift"
            />
            <p className="font-bold text-2xl">
              Naval<span className="text-primary">Rift</span>
            </p>
          </div>
          <section className="mt-4">
            <p className="text-lg font-semibold">Salut {userFirstname},</p>
            <p className="">
              Quelqu&apos;un a récemment demandé un changement de mot de passe
              pour votre compte NavalRift. Si c&apos;était vous, vous pouvez
              définir un nouveau mot de passe ici :
            </p>
            <a
              href={resetPasswordLink}
              className="bg-primary text-white px-4 py-2 inline-block rounded no-underline"
            >
              Réinitialiser le mot de passe
            </a>
            <p className="mt-4">
              Si vous ne souhaitez pas changer votre mot de passe ou si vous
              n&apos;avez pas demandé cela, ignorez simplement et supprimez ce
              message.
            </p>
            <p className="">
              Pour garder votre compte sécurisé, veuillez ne pas transférer cet
              email à quiconque.
            </p>
          </section>
        </div>
      </div>
    </Tailwind>
  );
};

ResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
} as DropboxResetPasswordEmailProps;

export default ResetPasswordEmail;
