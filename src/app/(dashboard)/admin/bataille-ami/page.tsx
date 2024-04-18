"use client";

import { deleteGame, getGame } from "@/app/actions/game_ami/game";
import { useAppContext } from "@/context";
import { Button, Tooltip } from "@nextui-org/react";
import { Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type GameType = { token: string; players: string[]; dateExpire: Date } | null;

export default function BatailleAmi() {
  const [hover, setHover] = useState(false);
  const [lien, setLien] = useState("");
  const [game, setGame] = useState<GameType>(null);
  const [step, setStep] = useState(0);
  const { sockets } = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setLien(window.location.href);
    }, 100);
  }, []);

  const { data: session } = useSession();
  const token = new URLSearchParams(window.location.search).get("token");
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;

    if (token) {
      const get = getGame(token);
      get.then((res) => {
        if (!isCancelled) {
          setGame(res);
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [token]);

  const handleJoinGame = async (id_game: string) => {
    if (id_game) {
      sockets.emit("join_game", id_game);
    }
  };

  useEffect(() => {
    if (game) {
      handleJoinGame(game.token);
    }
  }, [game]);

  switch (step) {
    case 0:
      if (!token || !game) {
        return (
          <div className="relative w-full h-full bg-blue-800/75 rounded-xl lg:p-6 p-3">
            <Button
              variant="faded"
              color="primary"
              className="absolute top-10 left-10 z-30"
              onClick={async () => {
                if (token) await deleteGame(token);
                router.push("/admin");
              }}
            >
              Retour
            </Button>
            <div className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden p-2 ">
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center gap-3 cursor-pointer">
                <h1 className="relative z-10 text-3xl md:text-6xl bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
                  Aucune partie trouvée, revenir à l&apos;accueil
                </h1>
                <Button
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  Accueil
                </Button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="relative w-full h-full bg-blue-800/75 rounded-xl lg:p-6 p-3">
            <Button
              variant="faded"
              color="primary"
              className="absolute top-10 left-10 z-30"
              onClick={async () => {
                if (token) await deleteGame(token);
                router.push("/admin");
              }}
            >
              Retour
            </Button>
            <div className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden p-2 ">
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center gap-3 cursor-pointer">
                <h1 className="relative z-10 text-3xl md:text-6xl bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
                  Partagez ce lien avec <br />{" "}
                  <span className="text-primary">un ami</span>
                </h1>
                <p></p>
                <Tooltip content="Copier le lien">
                  <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => {
                      navigator.clipboard.writeText(lien);
                      toast("Lien copié dans le presse-papier");
                    }}
                    className="px-3 py-2 bg-black/35 rounded-xl hover:bg-success/35 transition-all gap-2 flex items-center text-center mx-2 max-sm:max-w-56"
                  >
                    <span className="max-sm:hidden">{lien}</span>
                    <span className="sm:hidden">Copier le lien</span>
                    <div
                      style={{
                        display: hover ? "block" : "none",
                      }}
                    >
                      <Copy />
                    </div>
                  </div>
                </Tooltip>

                <QRCode
                  value={lien}
                  size={150}
                  className="mt-3 rounded-xl shadow-xl"
                />
              </div>
            </div>
            <div></div>
          </div>
        );
      }
    case 1:
      return <div>choose ship</div>;
  }
}
