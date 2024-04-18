"use client";

// Imports
import { addPlayer, deleteGame, getGame } from "@/app/actions/game_ami/game";
import { useAppContext } from "@/context";
import { Button, Tooltip } from "@nextui-org/react";
import { Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Définition du type de jeu
type GameType = {
  token: string;
  players: string[];
  dateExpire: Date;
  creator: string;
} | null;

// Composant principal
export default function BatailleAmi() {
  // States
  const [hover, setHover] = useState(false);
  const [lien, setLien] = useState("");
  const [game, setGame] = useState<GameType>(null);
  const [step, setStep] = useState(0);
  const { sockets } = useAppContext();

  // states gestion des joueurs de la partie
  const [player, setPlayer] = useState<number>(); // soit 1 soit 2
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [shipPlayer1, setShipPlayer1] = useState([]);
  const [shipPlayer2, setShipPlayer2] = useState([]);

  console.log(player1, player2);
  console.log(player);

  // Effet pour obtenir le lien de la page
  useEffect(() => {
    setTimeout(() => {
      setLien(window.location.href);
    }, 100);
  }, []);

  // Hooks NextAuth
  const { data: session } = useSession();
  const token = new URLSearchParams(window.location.search).get("token");
  const router = useRouter();

  // Effet pour obtenir les détails du jeu
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

  // Effet pour déterminer si les joueurs sont prêts
  useEffect(() => {
    if (player1 && player2) {
      setStep(1);
    }
  }, [player1, player2]);

  // Effet pour gérer l'arrivée du deuxième joueur
  useEffect(() => {
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
  }, [sockets]);

  // fuction pour savoir quelle joueur est le joueur 1

  const handlePlayer = (player: string) => {
    if (game?.creator === player) {
      setPlayer(1);
    } else setPlayer(2);
  };

  // Fonction pour rejoindre le jeu
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

  // Effet pour rejoindre automatiquement le jeu
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
      return;
  }
}
