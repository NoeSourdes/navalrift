"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { Button } from "@nextui-org/react";
import { Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { stockGame } from "./actions/stockGame";
import Grid from "./components/grid";

export default function Page() {
  const [start, setStart] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [isIconOnly, setIsIconOnly] = useState(window.innerWidth <= 640);
  const [clickCell, setClickCell] = useState<string[]>([]);
  const [selectTools, setSelectTools] = useState("shovel");
  const [revealedCells, setRevealedCells] = useState<string[]>([]);
  const [board, setBoard] = useState<string[][]>([[]]);
  const [caseFlag, setCaseFlag] = useState<string[]>([]);
  const { explosion } = useButtonSounds();
  const [win, setWin] = useState<string>("start");
  const router = useRouter();
  const [nbClick, setNbClick] = useState(0);
  const [tot, setTot] = useState(0);
  const { data: session } = useSession();

  const generateBombs = () => {
    const bombPositions = new Set();
    const bombs = [];

    while (bombs.length < 10) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const position = `${x},${y}`;

      if (!bombPositions.has(position)) {
        bombPositions.add(position);
        bombs.push({ x, y });
      }
    }

    return bombs;
  };

  const [bombs, setBombs] = useState(generateBombs());

  const revealCell = (x: number, y: number, revealed: string[] = []) => {
    if (bombs.some((bomb) => bomb.x === x && bomb.y === y)) {
      revealBomb(x, y);
      return;
    }
    const cellKey = `${x},${y}`;
    if (revealedCells.includes(cellKey) || revealed.includes(cellKey)) return;
    revealed.push(cellKey);
    setRevealedCells((prev) => [...prev, cellKey]);
    setTot((prev) => prev + 1);
    const cellValue = board[x][y];
    if (cellValue === "0") {
      const adjacentCells = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ];
      for (const [adjX, adjY] of adjacentCells) {
        if (
          adjX >= 0 &&
          adjX < board.length &&
          adjY >= 0 &&
          adjY < board[0].length
        ) {
          revealCell(adjX, adjY, revealed);
        }
      }
    }
  };

  useEffect(() => {
    if (tot === 90) {
      setWin("win");
      const name = session?.user?.name ? session?.user?.name : "Anonyme";
      const time = formatTime() as string;
      const click = nbClick.toString();
      const date = new Date();
      const day = date.getDate().toString();
      const month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();
      const formattedDate = `${day}/${month}/${year}`;
      (async () => {
        const win = "Gagné";
        const avatar = session?.user?.image ? session?.user?.image : "";
        const email = session?.user?.email ? session?.user?.email : "";
        const data = {
          name,
          time,
          click,
          formattedDate,
          win,
          avatar,
          email,
        };
        await stockGame(data);
        setStart(false);
        setStartTime(false);
      })();
    }
  }, [tot]);

  const revealBomb = (x: number, y: number) => {
    setStartTime(false);
    const cellKey = `${x},${y}`;
    setRevealedCells((prev) => [...prev, cellKey]);
    const popElement = { x: x, y: y };
    const newBombs = bombs.filter(
      (item) => !(item.x === popElement.x && item.y === popElement.y)
    );
    const time = bombs.length * 600;
    setTimeout(() => {
      newBombs.forEach((bomb, index) => {
        setTimeout(() => {
          const cellKey = `${bomb.x},${bomb.y}`;
          setRevealedCells((prev) => [...prev, cellKey]);
          explosion();
        }, index * 600);
      });
    }, 600);
    setTimeout(() => {
      setStart(false);
      setWin("lose");
      const name = session?.user?.name ? session?.user?.name : "Anonyme";
      const time = formatTime() as string;
      const click = nbClick.toString();
      const date = new Date();
      const day = date.getDate().toString();
      const month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();
      const formattedDate = `${day}/${month}/${year}`;
      (async () => {
        const win = "Perdu";
        const avatar = session?.user?.image ? session?.user?.image : "";
        const email = session?.user?.email ? session?.user?.email : "";
        const data = {
          name,
          time,
          click,
          formattedDate,
          win,
          avatar,
          email,
        };
        await stockGame(data);
        setStart(false);
        setStartTime(false);
      })();
    }, time);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsIconOnly(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //gestion du chronomètre
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  return (
    <div className="h-full w-full flex flex-col lg:gap-6 gap-3">
      <Button
        variant="faded"
        isIconOnly={isIconOnly}
        color="primary"
        className="absolute max-sm:top-8 top-16 max-lg:top-10 sm:left-10 left-5 z-40"
        onClick={() => {
          window.history.back();
        }}
      >
        <span className="max-sm:hidden">Retour</span>
        <span className="sm:hidden">
          <Undo2 />
        </span>
      </Button>
      <div className="relative h-full w-full bg-blue-800/75 rounded-xl flex max-md:flex-col items-center lg:justify-center lg:gap-6 gap-3 lg:p-6 p-3 overflow-hidden">
        <div className="h-full w-full bg-blue-900  bg-dot-[#0070EF] relative flex flex-col rounded-lg overflow-hidden">
          <div className="absolute pointer-events-none -inset-16 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
          <div className="h-full w-full">
            <div className="relative h-full w-full">
              <div
                className="absolute h-full w-full flex justify-center items-center backdrop-blur-sm rounded-xl z-30"
                style={{
                  display: start ? "none" : "flex",
                }}
              >
                {win === "start" ? (
                  <div className="w-96 max-sm:w-80 max-sm:h-52 h-60 bg-[#27272A] rounded-xl p-5 flex flex-col justify-center items-center space-y-5 border-2 border-[#3F3F46]">
                    <h1 className="text-center text-2xl font-bold">
                      Commencer une partie de démineur
                    </h1>
                    <Button
                      color="primary"
                      className="w-full"
                      onClick={() => {
                        setStart(true);
                        setStartTime(true);
                      }}
                    >
                      Commencer
                    </Button>
                    <Button
                      onClick={() => {
                        router.push("/admin");
                      }}
                    >
                      Retour a la page d&apos;accueil
                    </Button>
                  </div>
                ) : win === "lose" ? (
                  <div className="w-96 max-sm:w-80  bg-[#27272A] rounded-xl p-5 flex flex-col justify-center items-center space-y-5 border-2 border-[#3F3F46]">
                    <h1 className="text-center text-2xl font-bold text-danger">
                      Vous avez perdu
                    </h1>
                    <div className="flex flex-col text-center space-y-1 ">
                      <span>
                        Nombre de coups :{" "}
                        <span className="font-bold">{nbClick}</span>
                      </span>
                      <span>
                        Temps écoulé :{" "}
                        <span className="font-bold">{formatTime()}</span>
                      </span>
                    </div>
                    <Button
                      color="primary"
                      className="w-full"
                      onClick={() => {
                        setTot(0);
                        setStart(true);
                        setStartTime(true);
                        setWin("start");
                        setClickCell([]);
                        setRevealedCells([]);
                        setCaseFlag([]);
                        setTime(0);
                        setNbClick(0);
                        setBombs(generateBombs());
                      }}
                    >
                      Recommencer
                    </Button>
                    <Button
                      onClick={() => {
                        router.push("/admin");
                      }}
                    >
                      Retour a la page d&apos;accueil
                    </Button>
                  </div>
                ) : win === "win" ? (
                  <div className="w-96 max-sm:w-80 max-sm:h-52 h-60 bg-[#27272A] rounded-xl p-5 flex flex-col justify-center items-center space-y-5 border-2 border-[#3F3F46]">
                    <h1 className="text-center text-2xl font-bold">
                      Vous avez gagné
                    </h1>
                    <Button
                      color="primary"
                      className="w-full"
                      onClick={() => {
                        setTot(0);
                        setNbClick(0);
                        setStart(true);
                        setStartTime(true);
                        setWin("start");
                        setRevealedCells([]);
                        setCaseFlag([]);
                        setTime(0);
                        setBombs(generateBombs());
                      }}
                    >
                      Recommencer
                    </Button>
                    <Button
                      onClick={() => {
                        router.push("/admin");
                      }}
                    >
                      Retour a la page d&apos;accueil
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative h-full w-full flex flex-col space-y-5 max-sm:space-y-3 justify-center items-center z-20">
                <div className="w-[500px] flex max-sm:w-80 max-sm:h-16 h-32 rounded-xl bg-blue-800/75">
                  <div className="w-full h-full flex justify-start pl-5 items-center">
                    <Image
                      src="/img/stopwatch.png"
                      className="relative z-20"
                      width={isIconOnly ? 50 : 80}
                      height={isIconOnly ? 50 : 80}
                      alt="stopwatch"
                    />

                    <span className="sm:text-2xl text-xl font-bold">
                      {formatTime()}
                    </span>
                  </div>
                  <div className=" h-full flex justify-end items-center gap-3 pr-5">
                    <span className="font-bold sm:text-2xl text-xl">10</span>
                    <Image
                      src="/img/bomb.png"
                      className="relative z-20"
                      width={isIconOnly ? 50 : 80}
                      height={isIconOnly ? 50 : 80}
                      alt="bomb"
                    />
                  </div>
                </div>
                <div className="h-[400px] max-sm:w-80 max-sm:h-[350px] w-[400px] rounded-xl overflow-hidden bg-blue-800/75">
                  <Grid
                    setNbClick={setNbClick}
                    bombs={bombs}
                    revealCell={revealCell}
                    clickCell={clickCell}
                    setClickCell={setClickCell}
                    board={board}
                    setBoard={setBoard}
                    revealedCells={revealedCells}
                    caseFlag={caseFlag}
                    setCaseFlag={setCaseFlag}
                    selectTools={selectTools}
                  />
                </div>
                <div className="w-[500px] max-sm:w-80 max-sm:h-16 h-32 rounded-xl bg-blue-800/75 flex p-3 gap-3">
                  <div
                    className="grow h-full w-full rounded-md bg-blue-900 bg-dot-[#0070EF] relative overflow-hidden flex justify-center items-center hover:scale-105 transition-all cursor-pointer"
                    style={{
                      border:
                        selectTools === "shovel" ? "3px solid #0070EF" : "none",
                    }}
                    onClick={() => setSelectTools("shovel")}
                  >
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
                    <Image
                      src="/img/shovel.png"
                      className="relative z-20"
                      width={isIconOnly ? 30 : 60}
                      height={isIconOnly ? 30 : 60}
                      alt="shovel"
                    />
                  </div>
                  <div
                    className="grow h-full w-full rounded-md bg-[#100404] bg-dot-[#F31260] relative overflow-hidden flex justify-center items-center hover:scale-105 transition-all cursor-pointer"
                    style={{
                      border:
                        selectTools === "flag" ? "3px solid #F31260" : "none",
                    }}
                    onClick={() => setSelectTools("flag")}
                  >
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#1c0808] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>
                    <div className="relative z-20 flex sm:flex-col justify-center items-center w-full h-full">
                      <Image
                        src="/img/flag.png"
                        className="relative z-20"
                        width={isIconOnly ? 30 : 60}
                        height={isIconOnly ? 30 : 60}
                        alt="flag"
                      />
                      <span className="text-error sm:text-xl text-lg font-bold">
                        {10 - caseFlag.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full justify-center hidden">
              <Button
                variant="faded"
                color="primary"
                className="sm:absolute sm:top-5 sm:left-5 max-sm:mb-5 z-40"
                onClick={() => {
                  window.history.back();
                }}
              >
                Abandonner
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
