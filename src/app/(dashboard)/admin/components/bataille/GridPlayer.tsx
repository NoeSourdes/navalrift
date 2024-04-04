"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GridAiProps {
  ship: any;
  touchPlayer: Record<string, boolean>;
  setCoordonnees: (coord: string) => void;
  setNumberShipTouchPlayer: (number: number) => void;
  numberShipTouchPlayer: number;
}

export const GridPlayer = ({
  setCoordonnees,
  touchPlayer,
  ship: shipAi,
  setNumberShipTouchPlayer,
}: GridAiProps) => {
  const rows = new Array(10).fill(null);
  const cols = new Array(10).fill(null);
  const { play, playHover } = useButtonSounds();
  const getColorClass = (coord: string) => {
    if (coord in touchPlayer) {
      if (touchPlayer[coord]) {
        return "touch";
      } else {
        return "bg-primary";
      }
    }
    return "bg-border";
  };

  interface Ship {
    size: number;
    direction: string;
    position: [number, number];
  }

  const [coordShipTouch, setCoordShipTouch] = useState<
    { coords: string[]; size: number }[]
  >([]);

  useEffect(() => {
    shipAi.forEach((ship: Ship) => {
      let allHit = true;
      const { size, direction, position } = ship;
      const [startRow, startCol] = position;
      let currentShipCoords: string[] = [];

      for (let i = 0; i < size; i++) {
        const coord =
          direction === "horizontal"
            ? `${startRow},${startCol + i}`
            : `${startRow + i},${startCol}`;

        currentShipCoords.push(coord);

        if (!(coord in touchPlayer) || !touchPlayer[coord]) {
          allHit = false;
          break;
        }
      }

      if (allHit) {
        setCoordShipTouch((prevState) => {
          const doesExist = prevState.some((item) =>
            arraysAreEqual(item.coords, currentShipCoords)
          );
          if (!doesExist) {
            return [...prevState, { coords: currentShipCoords, size: size }];
          }
          return prevState;
        });
        setNumberShipTouchPlayer(coordShipTouch.length);
      }
    });
  }, [touchPlayer, shipAi, coordShipTouch, setNumberShipTouchPlayer]);

  function arraysAreEqual(a: any[], b: any[]) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
  }

  function getBgColor(size: number): string {
    switch (size) {
      case 5:
        return "bg-warning";
      case 4:
        return "bg-success";
      case 3:
        return "bg-secondary";
      case 2:
        return "bg-primary";
      default:
        return "bg-error";
    }
  }

  function getBoatSize(coord: string): number {
    const ship = coordShipTouch.find((ship) => ship.coords.includes(coord));
    return ship ? ship.size : 0;
  }

  return (
    <div>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {cols.map((_, colIndex) => (
            <div
              onClick={() => {
                setCoordonnees(`${rowIndex},${colIndex}`);
              }}
              key={colIndex}
              className={`relative w-[38.4px] h-[38.4px] flex items-center justify-center max-sm:w-8 max-sm:h-8`}
            >
              <div
                className="absolute h-full w-full cursor-pointer hover:opacity-100 opacity-0"
                // onMouseEnter={() => {
                //   playHover();
                // }}
              >
                {getColorClass(`${rowIndex},${colIndex}`) !== "touch" &&
                  getColorClass(`${rowIndex},${colIndex}`) !== "bg-error" && (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white flex items-center rounded-full justify-center">
                      <span className="h-5 w-5 bg-blue-800 rounded-full flex justify-center items-center">
                        <span className="h-2 w-2 rounded-full bg-white"></span>
                        <span className="absolute w-3 h-1 bg-white rounded-xl top-3 -left-1"></span>
                        <span className="absolute w-3 h-1 bg-white rounded-xl top-3 -right-1"></span>
                        <span className="absolute w-1 h-3 bg-white rounded-xl -top-1 right-3"></span>
                        <span className="absolute w-1 h-3 bg-white rounded-xl -bottom-1 right-3"></span>
                      </span>
                    </span>
                  )}
              </div>
              <div className={`h-full w-full`}>
                {getColorClass(`${rowIndex},${colIndex}`) === "touch" ? (
                  coordShipTouch.find((ship) =>
                    ship.coords.includes(`${rowIndex},${colIndex}`)
                  ) ? (
                    <div
                      className={`h-full w-full rounded-[9px] flex items-center justify-center ${getBgColor(
                        getBoatSize(`${rowIndex},${colIndex}`)
                      )}`}
                    >
                      <Image
                        src="/img/skull_cut.png"
                        alt="skull cut"
                        width={25}
                        height={25}
                        className="relative object-scale-down"
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full flex justify-center items-end">
                      <Image
                        src="https://i.postimg.cc/CxqvSr40/VhdL.gif"
                        alt="Mon Gif"
                        width={50}
                        height={50}
                        className="relative object-scale-down"
                      />
                    </div>
                  )
                ) : (
                  <div className="h-full w-full flex justify-center items-center">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        getColorClass(`${rowIndex},${colIndex}`) === "touch"
                          ? ""
                          : getColorClass(`${rowIndex},${colIndex}`)
                      }`}
                    ></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
