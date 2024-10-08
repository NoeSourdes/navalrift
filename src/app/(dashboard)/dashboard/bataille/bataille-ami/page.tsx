"use client";

import { addPlayer, deleteGame, getGame } from "@/app/actions/game_ami/game";
import { useAppContext } from "@/context";
import { Button, Tooltip } from "@nextui-org/react";
import { Copy, Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type GameType = {
  token: string;
  players: string[];
  dateExpire: Date;
  creator: string;
} | null;

export default function BatailleAmi() {
  const [hover, setHover] = useState(false);
  const [lien, setLien] = useState("");
  const [game, setGame] = useState<GameType>(null);
  const [step, setStep] = useState(0);
  const { sockets } = useAppContext();

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player, setPlayer] = useState<number>();
  const [shipPlayer1, setShipPlayer1] = useState([]);
  const [shipPlayer2, setShipPlayer2] = useState([]);

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

  useEffect(() => {
    console.log(player1, player2);
    if (player1 && player2) {
      setStep(1);
    }
  }, [player1, player2]);

  useEffect(() => {
    console.log(player1, player2);
    sockets.on(
      "game_can_start",
      ({ player1, player2 }: { player1: string; player2: string }) => {
        setPlayer1(player1);
        setPlayer2(player2);
        setStep(1);
      }
    );

    return () => {
      sockets.off("game_can_start");
    };
  }, []); // Empty dependency array
  const handlePlayer = async (player: string) => {
    if (game?.creator === player) {
      setPlayer(1);
    } else setPlayer(2);
  };

  const handleJoinGame = async (id_game: string) => {
    if (game?.players.length === 2) {
      if (id_game) {
        sockets.emit("join_game", id_game);
        setPlayer1(game.players[0]);
        setPlayer2(game.players[1]);
        handlePlayer(session?.user?.id as string);
      }
    } else {
      if (session) {
        if (!game?.players.includes(session.user?.id as string))
          await addPlayer(id_game, session.user?.id as string);
        if (game)
          if (id_game) {
            sockets.emit("join_game", id_game);
            setPlayer1(game.players[0]);
            setPlayer2(game.players[1]);
            handlePlayer(session?.user?.id as string);
          }
      }
    }
  };

  useEffect(() => {
    if (game) {
      handleJoinGame(game.token);
    }
  }, [game]);

  const [isIconOnly, setIsIconOnly] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsIconOnly(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  switch (step) {
    case 0:
      if (!token || !game) {
        return (
          <div className="relative w-full h-full bg-blue-800/75 rounded-xl lg:p-6 p-3">
            <Button
              variant="faded"
              color="primary"
              isIconOnly={isIconOnly}
              className="absolute top-10 left-10 z-30"
              onClick={async () => {
                if (token) await deleteGame(token);
                router.push("/dashboard");
              }}
            >
              <span className="max-sm:hidden">Retour</span>
              <span className="sm:hidden">
                <Undo2 />
              </span>
            </Button>
            <div className="h-full w-full  bg-blue-900  bg-dot-[#0070EF] relative flex items-center justify-center rounded-lg overflow-hidden p-2 ">
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center gap-3 cursor-pointer">
                <h1 className="relative z-10 text-3xl md:text-6xl bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
                  Aucune partie trouvée, revenir à l&apos;accueil
                </h1>
                <Button
                  onClick={() => {
                    router.push("/dashboard");
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
                router.push("/dashboard");
              }}
            >
              Retour
            </Button>
            <div className="h-full w-full  bg-blue-900  bg-dot-[#0070EF] relative flex items-center justify-center rounded-lg overflow-hidden p-2 ">
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
      return;
  }
}
