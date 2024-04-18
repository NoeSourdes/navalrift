/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { useAppContext } from "@/context";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { RotateCw } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import { Grid } from "../../components/bataille/Grid";
import { GridPlayer } from "../../components/bataille/GridPlayer";
import { touchShip } from "../../function/touchShip";

interface CombatProps {
  setStep: (step: number) => void;
  timeLapse: number;
  timePlayer: number;
  howStart: string;
  shipPlayer: any;
  shipAi: any;
  setNumberShipTouchPlayer: (number: number) => void;
  numberShipTouchPlayer: number;
  setNumberShipTouchAi: (number: number) => void;
  numberShipTouchAi: number;
  touchShipPlayer: Record<string, boolean>;
  setTouchShipPlayer: (touch: Record<string, boolean>) => void;
  touchShipAi: Record<string, boolean>;
  setTouchShipAi: (touch: Record<string, boolean>) => void;
  setWinner: (winner: string) => void;
  winner: string;
  setHowStart: (howStart: string) => void;
  setTimeLapse: (timeLapse: number) => void;
  setTimePlayer: (timePlayer: number) => void;
}

export const Combat = ({
  setStep,
  shipPlayer,
  shipAi,
  timeLapse,
  timePlayer,
  howStart,
  setNumberShipTouchPlayer,
  setNumberShipTouchAi,
  numberShipTouchPlayer,
  numberShipTouchAi,
  touchShipPlayer,
  setTouchShipPlayer,
  touchShipAi,
  setTouchShipAi,
  setWinner,
  setTimeLapse,
  setTimePlayer,
  setHowStart,
  winner,
}: CombatProps) => {
  const { setVolume } = useAppContext();
  const { play, playHover, explosion, goutte_1, goutte_2, start } =
    useButtonSounds();
  const { data: session } = useSession();
  const [loader, setLoader] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const localData = localStorage.getItem("currentPlayer");
    return localData ? JSON.parse(localData) : "";
  });
  const [coordonnees, setCoordonnees] = useState("");
  const [coordShipTouchAi, setCoordShipTouchAi] = useState<string[]>([]);

  const [coordShipAroundAi, setCoordShipAroundAi] = useState<
    [number, number][]
  >([]);

  const [aiTouchShip, setAiTouchShip] = useState<number>(0);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [playerToPlay, setPlayerToPlay] = useState(() => {
    const localData = localStorage.getItem("currentPlayer");
    return localData ? JSON.parse(localData) : "";
  });
  useEffect(() => {
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
    localStorage.setItem("currentPlayer", JSON.stringify(playerToPlay));
  }, [currentPlayer, playerToPlay]);

  useEffect(() => {
    setCoordShipAroundAi([]);
  }, [numberShipTouchAi]);

  useEffect(() => {
    if (howStart === "aleatoire" && !currentPlayer) {
      const random = Math.floor(Math.random() * 2);
      if (random === 0) {
        setCurrentPlayer("player");
      } else {
        setCurrentPlayer("ai");
      }
    } else {
      setCurrentPlayer(currentPlayer ? currentPlayer : howStart);
    }
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    playTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [howStart]);

  useEffect(() => {
    playTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordonnees, currentPlayer]);

  useEffect(() => {
    playTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiTouchShip]);

  const playTurn = () => {
    if (currentPlayer === "player") {
      if (coordonnees === "") {
        return;
      }
      if (coordonnees in touchShipPlayer) {
        alert("Vous avez déjà touché cette case, RECOMMNCEZ!");
        setCoordonnees("");
        return;
      }
      const [x, y] = coordonnees.split(",").map((el) => parseInt(el));
      const touched = touchShip(x, y, shipAi);
      if (touched) {
        explosion();
        setTouchShipPlayer({ ...touchShipPlayer, [coordonnees]: true });
        setPlayerToPlay("player");
        setTimeout(() => {
          setCurrentPlayer("player");
        }, 1000);
        return;
      } else {
        Math.floor(Math.random() * 2) + 1 === 1 ? goutte_1() : goutte_2();
        setTouchShipPlayer({ ...touchShipPlayer, [coordonnees]: false });
      }
      setCoordonnees("");
      setPlayerToPlay("ai");
      setTimeout(() => {
        setCurrentPlayer("ai");
      }, 1000);
    }
    if (currentPlayer === "ai") {
      setTimeout(() => {
        let x: number, y: number;
        let newCoord;
        if (coordShipAroundAi.length > 0) {
          do {
            [x, y] = coordShipAroundAi.pop()!;
            newCoord = `${x},${y}`;
          } while (coordShipTouchAi.includes(newCoord));
        } else {
          do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            newCoord = `${x},${y}`;
          } while (coordShipTouchAi.includes(newCoord));
        }

        setCoordShipTouchAi([...coordShipTouchAi, newCoord]);
        const touched = touchShip(x, y, shipPlayer);
        if (touched) {
          explosion();
          setTouchShipAi({ ...touchShipAi, [`${x},${y}`]: true });
          if (!checkShipAlreadyTouch(x, y + 1))
            coordShipAroundAi.push([x, y + 1]);
          if (!checkShipAlreadyTouch(x - 1, y))
            coordShipAroundAi.push([x - 1, y]);
          if (!checkShipAlreadyTouch(x + 1, y))
            coordShipAroundAi.push([x + 1, y]);
          if (!checkShipAlreadyTouch(x, y - 1))
            coordShipAroundAi.push([x, y - 1]);
          setAiTouchShip(aiTouchShip + 1);
          return;
        } else {
          Math.floor(Math.random() * 2) + 1 === 1 ? goutte_1() : goutte_2();
          setTouchShipAi({ ...touchShipAi, [`${x},${y}`]: false });
          setPlayerToPlay("player");
          setTimeout(() => {
            setCurrentPlayer("player");
          }, 1000);
        }
      }, 2000);
    } else {
      return;
    }
  };

  const checkShipAlreadyTouch = (x: number, y: number) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return true;
    }
    return coordShipTouchAi.includes(`${x},${y}`);
  };

  // Gestion du timer:
  const [durationPlayer, setDurationPlayer] = useState(timePlayer * 1000);
  const [durationAi, setDurationAi] = useState(timePlayer * 1000);
  const [playerTime, setPlayerTime] = useState(0);
  const [timeAi, setTimeAi] = useState(0);

  const [isActivePlayer, setIsActivePlayer] = useState(true);
  const [isActiveAi, setIsActiveAi] = useState(false);

  const onTimerUpdate = ({
    time,
    duration,
  }: {
    time: number;
    duration: number;
  }) => {
    if (currentPlayer === "player" && isActivePlayer) {
      setPlayerTime(time);
      setDurationPlayer(duration);
    }
  };

  const onTimerUpdateAi = ({
    time,
    duration,
  }: {
    time: number;
    duration: number;
  }) => {
    if (currentPlayer === "ai" && isActiveAi) {
      setTimeAi(time);
      setDurationAi(duration);
    }
  };

  useEffect(() => {
    if (currentPlayer === "player") {
      setIsActivePlayer(true);
      setIsActiveAi(false);
    } else {
      setIsActivePlayer(false);
      setIsActiveAi(true);
    }
  }, [currentPlayer]);

  const [lapse, setLapse] = useState(0);
  useEffect(() => {
    setLapse(0);
    if (currentPlayer === "player") {
      const intervalId = setInterval(() => {
        setLapse((prevLapse) => (prevLapse < 100 ? prevLapse + 1 : 100));
      }, (timeLapse / 100) * 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentPlayer, timeLapse]);

  useEffect(() => {
    if (lapse === 100) {
      setWinner("ai");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lapse]);

  useEffect(() => {
    if (durationPlayer - playerTime === 0) {
      setWinner("ai");
    }
    if (durationAi - timeAi === 0) {
      setWinner("player");
    }
  }, [durationAi, durationPlayer, playerTime, timeAi]);

  return (
    <div className="h-full w-full bg-blue-900 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex justify-center rounded-lg overflow-hidden p-2">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: loader ? "scale(1)" : "scale(0)",
        }}
      >
        <RotateCw size={50} className="animate-spin" />
      </div>
      <div
        className={`relative flex flex-col items-center md:gap-8 gap-8 z-20 overflow-y-auto md:py-8 py-4 transition-all ${
          loader ? "scale-0" : "scale-1"
        }`}
      >
        <div className="text-center space-y-2 max-sm:hidden">
          <h1 className="text-4xl font-bold max-md:text-3xl">
            Bataile contre <span className="text-primary">l&apos;IA</span>
          </h1>
        </div>
        <div className="relative md:w-96 w-80  md:min-h-24 min-h-20 rounded-xl bg-blue-800/75 flex items-center justify-between overflow-hidden">
          <div
            className="absolute bg-error/35 mx-2 py-1 rounded-lg h-full w-full z-5 animate-ping"
            style={{
              visibility:
                playerTime < timePlayer * 1000 - 10000 ? "hidden" : "visible",
            }}
          ></div>
          <div className=" relative grow flex items-center justify-center gap-5 z-10">
            <div className="relative space-y-2 pb-1 text-center z-10">
              <h4 className="font-bold">
                {session?.user?.name?.split(" ")[0]}
              </h4>
              <Timer
                active={isActivePlayer}
                duration={durationPlayer}
                onTimeUpdate={onTimerUpdate}
              />
              <div className="w-16 py-1 border-2 rounded-md">
                <Timecode className="" time={durationPlayer - playerTime} />
              </div>
            </div>
            <div className="relative z-10">
              <div
                className="md:p-3 p-2 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor:
                    currentPlayer === "player" ? "#0070EF" : "transparent",
                }}
              >
                <Image
                  src={session?.user?.image ? session?.user?.image : ""}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="md:w-12 md:h-12 w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="h-[80%] w-1 rounded-xl bg-border"></div>
          <div className="grow flex items-center justify-center gap-5">
            <div>
              <div
                className="md:p-3 p-2 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor:
                    currentPlayer === "ai" ? "#0070EF" : "transparent",
                }}
              >
                <Image
                  src="/img/ai-avatar.jpg"
                  alt="avatar"
                  width={50}
                  height={50}
                  className="md:w-12 md:h-12 w-10 h-10 rounded-full"
                />
              </div>
            </div>
            <div className="space-y-2 pb-1 text-center">
              <h4 className="font-bold">AI</h4>
              <Timer
                active={isActiveAi}
                duration={durationAi}
                onTimeUpdate={onTimerUpdateAi}
              />
              <div className="w-16 py-1 border-2 rounded-md">
                <Timecode className="" time={durationAi - timeAi} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10 ">
          <div
            className={`flex flex-col gap-3 ${
              currentPlayer === "player" && "max-lg:hidden"
            }`}
          >
            <div
              className={`relative md:w-96 w-80 h-10 rounded-xl flex items-center justify-center transition-all overflow-hidden bg-blue-800/75`}
            >
              <span className="font-bold text-xl">Vos navires</span>
            </div>
            <div className="w-96 h-96 border-border bg-blue-800/75 rounded-xl overflow-hidden max-sm:w-80 max-sm:h-80">
              <Grid
                setCoordShipAround={setCoordShipAroundAi}
                ship={shipPlayer}
                touchedShip={touchShipAi}
                setNumberShipTouch={setNumberShipTouchAi}
              />
            </div>
          </div>
          <div
            className={`flex flex-col gap-3 ${
              currentPlayer === "ai" && "max-lg:hidden"
            }`}
          >
            <div
              className={`relative md:w-96 w-80 h-10 rounded-xl flex items-center justify-center transition-all overflow-hidden bg-blue-800/75`}
            >
              <div
                className="absolute inset-0 bg-primary z-10"
                style={{
                  opacity: currentPlayer === "player" && winner === "" ? 1 : 0,
                  transform: `translateX(-${lapse}%)`,
                  transition: "transform 1s ease",
                }}
              ></div>
              <span className="relative font-bold text-xl transition-all z-20">
                {currentPlayer === "player" && "Attaquer votre adversaire"}
                {currentPlayer === "ai" && "A l'IA de jouer"}
              </span>
            </div>
            <div className="w-96 h-96 border-border bg-blue-800/75 rounded-xl overflow-hidden max-sm:w-80 max-sm:h-80 relative">
              <div
                className="absolute inset-0 bg-black/35"
                style={{
                  opacity: currentPlayer === "player" ? 0 : 1,
                  zIndex: currentPlayer === "player" ? 10 : 20,
                  transition: "opacity 0.5s ease-in-out",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  opacity: playerToPlay === "player" ? 0 : 1,
                  zIndex: playerToPlay === "player" ? 10 : 20,
                  transition: "opacity",
                }}
              ></div>
              <div
                className="relative"
                style={{
                  zIndex: playerToPlay === "player" ? 20 : 10,
                }}
              >
                <GridPlayer
                  numberShipTouchPlayer={numberShipTouchPlayer}
                  setNumberShipTouchPlayer={setNumberShipTouchPlayer}
                  ship={shipAi}
                  setCoordonnees={setCoordonnees}
                  touchPlayer={touchShipPlayer}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-10">
          <Button variant="faded" color="primary" className="" onPress={onOpen}>
            Abandonner
          </Button>
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                },
              },
            }}
          >
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Abandonner la partie</h1>
                  </ModalHeader>
                  <ModalBody>
                    <p>Êtes-vous sûr de vouloir abandonner la partie ?</p>
                    <p>Vous allez perdre la partie en cours.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Annuler
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        setStep(0);
                        onClose();
                        localStorage.removeItem("howStart");
                        localStorage.removeItem("timeLapse");
                        localStorage.removeItem("timePlayer");
                        localStorage.removeItem("touchShipPlayer");
                        localStorage.removeItem("touchShipAi");
                        localStorage.removeItem("shipAi");
                        localStorage.removeItem("shipPlayer");
                        localStorage.removeItem("numberShipTouchPlayer");
                        localStorage.removeItem("numberShipTouchAi");
                        setHowStart("aleatoire");
                        setTimeLapse(40);
                        setTimePlayer(180);
                        setNumberShipTouchPlayer(0);
                        setNumberShipTouchAi(0);
                        setTouchShipPlayer({});
                        setTouchShipAi({});
                        setVolume(0.5);
                      }}
                    >
                      Abandonner
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};
