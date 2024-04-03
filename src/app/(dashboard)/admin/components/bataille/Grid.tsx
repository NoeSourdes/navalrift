import Image from "next/image";
import { useEffect, useState } from "react";

interface Ship {
  size: number;
  direction: string;
  position: [number, number];
}

interface PropsGrid {
  ship: Ship[];
  touchedShip: Record<string, boolean>;
  setNumberShipTouch: (number: number) => void;
  setCoordShipAround: (coord: [number, number][]) => void;
}

export const Grid = ({
  ship,
  touchedShip: touchedAi,
  setNumberShipTouch,
  setCoordShipAround,
}: PropsGrid) => {
  const rows = new Array(10).fill(null);
  const cols = new Array(10).fill(null);
  const [coordShipTouch, setCoordShipTouch] = useState<
    { coords: string[]; size: number }[]
  >([]);

  useEffect(() => {
    ship.forEach((ship: Ship) => {
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

        if (!(coord in touchedAi) || !touchedAi[coord]) {
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
        setNumberShipTouch(coordShipTouch.length);
      }
    });
  }, [touchedAi, ship, setNumberShipTouch, coordShipTouch]);

  function arraysAreEqual(a: any[], b: any[]) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
  }

  const isShipPosition = (rowIndex: number, colIndex: number) => {
    for (let s = 0; s < ship.length; s++) {
      for (let i = 0; i < ship[s].size; i++) {
        if (ship[s].direction === "horizontal") {
          if (
            rowIndex === ship[s].position[0] &&
            colIndex === ship[s].position[1] + i
          ) {
            return ship[s].size;
          }
        } else {
          if (
            rowIndex === ship[s].position[0] + i &&
            colIndex === ship[s].position[1]
          ) {
            return ship[s].size;
          }
        }
      }
    }
    return false;
  };

  const getColorClass = (coord: string) => {
    if (touchedAi && coord in touchedAi) {
      return touchedAi[coord] ? "bg-primary" : "bg-error";
    }
    return "bg-border";
  };

  return (
    <div>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {cols.map((_, colIndex) => (
            <div
              key={colIndex}
              className={`w-[38.4px] h-[38.4px] flex items-center justify-center max-sm:w-8 max-sm:h-8 rounded-[9px] ${
                isShipPosition(rowIndex, colIndex) === 5
                  ? "bg-warning"
                  : isShipPosition(rowIndex, colIndex) === 4
                  ? "bg-success"
                  : isShipPosition(rowIndex, colIndex) === 3
                  ? "bg-secondary"
                  : isShipPosition(rowIndex, colIndex) === 2
                  ? "bg-primary"
                  : ""
              }`}
            >
              {isShipPosition(rowIndex, colIndex) ? (
                <span
                  className={`w-full h-full rounded-full flex justify-center items-end`}
                >
                  {touchedAi &&
                    `${rowIndex},${colIndex}` in touchedAi &&
                    (coordShipTouch.find((ship) =>
                      ship.coords.includes(`${rowIndex},${colIndex}`)
                    ) ? (
                      <div className="h-full w-full flex justify-center items-center">
                        <Image
                          src="/img/skull_cut.png"
                          alt="skull cut"
                          width={25}
                          height={25}
                          className="relative object-scale-down"
                        />
                      </div>
                    ) : (
                      <Image
                        src="https://i.postimg.cc/CxqvSr40/VhdL.gif"
                        alt="Mon Gif"
                        width={50}
                        height={50}
                        className="relative object-scale-down"
                      />
                    ))}
                </span>
              ) : (
                <span
                  className={`w-2 h-2 rounded-full ${getColorClass(
                    `${rowIndex},${colIndex}`
                  )}`}
                ></span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
