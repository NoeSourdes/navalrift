"use client";

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
}: CombatProps) => {
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

  useEffect(() => {
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
  }, [currentPlayer]);

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
  }, [howStart]);

  useEffect(() => {
    playTurn();
  }, [coordonnees, currentPlayer]);

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
        setTouchShipPlayer({ ...touchShipPlayer, [coordonnees]: true });
        setCurrentPlayer("player");
        return;
      } else {
        setTouchShipPlayer({ ...touchShipPlayer, [coordonnees]: false });
      }
      setCoordonnees("");
      setCurrentPlayer("ai");
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
          setTouchShipAi({ ...touchShipAi, [`${x},${y}`]: true });
          if (!checkShipAlreadyTouch(x, y + 1))
            coordShipAroundAi.push([x, y + 1]);
          if (!checkShipAlreadyTouch(x - 1, y))
            coordShipAroundAi.push([x - 1, y]);
          if (!checkShipAlreadyTouch(x + 1, y))
            coordShipAroundAi.push([x + 1, y]);
          if (!checkShipAlreadyTouch(x, y - 1))
            coordShipAroundAi.push([x, y - 1]);
          setCurrentPlayer("ai");
          return;
        } else {
          setTouchShipAi({ ...touchShipAi, [`${x},${y}`]: false });
        }
        setCurrentPlayer("player");
      }, 1000);
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
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState((timePlayer + 1.5) * 1000);

  const onTimerUpdate = ({
    time,
    duration,
  }: {
    time: number;
    duration: number;
  }) => {
    setTime(time);
    setDuration(duration);
  };

  return (
    <div className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex justify-center rounded-lg overflow-hidden p-2 max-md:pt-16">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div
        className="absolute top-96"
        style={{
          transform: loader ? "scale(1)" : "scale(0)",
        }}
      >
        <RotateCw size={50} className="animate-spin" />
      </div>
      <div
        className={`relative flex flex-col items-center gap-8 z-20 overflow-y-auto py-8 transition-all ${
          loader ? "scale-0" : "scale-1"
        }`}
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold max-md:text-3xl">
            Bataile contre <span className="text-primary">l&apos;IA</span>
          </h1>
        </div>
        <div className="relative w-96 h-24 rounded-xl bg-blue-800/75 flex items-center justify-between overflow-hidden">
          {/* <div
            className="absolute bg-error/35 mx-2 py-1 rounded-lg h-full w-full z-5 animate-ping"
            style={{
              visibility: time < 30000 ? "hidden" : "visible",
            }}
          ></div> */}
          <div className=" relative grow flex items-center justify-center gap-5 z-10">
            <div className="relative space-y-2 pb-1 text-center z-10">
              <h4 className="font-bold">
                {session?.user?.name?.split(" ")[0]}
              </h4>
              <Timer active duration={duration} onTimeUpdate={onTimerUpdate} />
              <div className="w-16 py-1 border-2 rounded-md">
                <Timecode className="" time={duration - time} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="p-3 rounded-full flex items-center justify-center bg-primary">
                <Image
                  src={session?.user?.image ? session?.user?.image : ""}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="h-[80%] w-1 rounded-xl bg-border"></div>
          <div className="grow flex items-center justify-center gap-5">
            <div>
              <div className=" p-3 rounded-full flex items-center justify-center bg-primary">
                <Image
                  src="/img/ai-avatar.jpg"
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="space-y-2 pb-1 text-center">
              <h4 className="font-bold">AI</h4>
              <Timer active duration={duration} onTimeUpdate={onTimerUpdate} />
              <div className="w-16 py-1 border-2 rounded-md">
                <Timecode className="" time={duration - time} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10 ">
          <div className="flex flex-col gap-3">
            <div className="w-96 h-10 rounded-xl bg-blue-800/75 flex items-center justify-center">
              <span className="font-bold text-xl">Vos navires</span>
            </div>
            <div className="w-96 h-96 border-border bg-blue-800/75 rounded-xl overflow-hidden max-sm:w-80 max-sm:h-80">
              <Grid
                numberShipTouchAi={numberShipTouchAi}
                setCoordShipAroundAi={setCoordShipAroundAi}
                ship={shipPlayer}
                touchedAi={touchShipAi}
                setNumberShipTouchAi={setNumberShipTouchAi}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-96 h-10 rounded-xl bg-blue-800/75 flex items-center justify-center">
              <span className="font-bold text-xl">
                Attaquer votre adversaire
              </span>
            </div>
            <div className="w-96 h-96 border-border rounded-xl overflow-hidden max-sm:w-80 max-sm:h-80">
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
    </div>
  );
};
