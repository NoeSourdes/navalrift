import Image from "next/image";
import { useEffect, useState } from "react";

interface PropsGrid {
  ship: any;
  touchedAi: Record<string, boolean>;
  setNumberShipTouchAi: (number: number) => void;
}

export const Grid = ({ ship, touchedAi, setNumberShipTouchAi }: PropsGrid) => {
  const rows = new Array(10).fill(null);
  const cols = new Array(10).fill(null);
  const [shipTouchFull, setShipTouchFull] = useState<{ [key: number]: number }>(
    {}
  );
  const [coordShipTouch, setCoordShipTouch] = useState<
    { coords: string[]; size: number }[]
  >([]);
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
    if (touchedAi)
      if (coord in touchedAi) {
        if (touchedAi[coord]) {
          return "bg-primary";
        } else {
          return "bg-error";
        }
      }
    return "bg-border";
  };

  const getColorClassShip = (coord: string) => {
    if (touchedAi)
      if (coord in touchedAi) {
        if (touchedAi[coord]) {
          return "bg-primary";
        } else {
          return "bg-error";
        }
      }
    return "";
  };

  interface Ship {
    size: number;
    direction: string;
    position: [number, number];
    id: number;
  }
  const isShipFullyTouched = (ship: Ship) => {
    for (let i = 0; i < ship.size; i++) {
      let coord =
        ship.direction === "horizontal"
          ? `${ship.position[0]},${ship.position[1] + i}`
          : `${ship.position[0] + i},${ship.position[1]}`;

      if (!(coord in touchedAi && touchedAi[coord])) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const newCoordShipTouch: { coords: string[]; size: number }[] = [];
    ship.forEach((s: Ship) => {
      if (isShipFullyTouched(s)) {
        setShipTouchFull((prevState) => {
          const newState = { ...prevState };
          if (!newState[s.id]) {
            newState[s.id] = s.size;
          }
          return newState;
        });
        const shipCoords = [];
        for (let i = 0; i < s.size; i++) {
          let coord =
            s.direction === "horizontal"
              ? `${s.position[0]},${s.position[1] + i}`
              : `${s.position[0] + i},${s.position[1]}`;
          shipCoords.push(coord);
        }
        newCoordShipTouch.push({ coords: shipCoords, size: s.size });
      }
    });

    setCoordShipTouch(newCoordShipTouch);

    setNumberShipTouchAi(Object.keys(shipTouchFull).length);
  }, [touchedAi]);

  return (
    <div>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {cols.map((_, colIndex) => (
            <div
              key={colIndex}
              className={`w-[38.4px] h-[38.4px] flex items-center justify-center max-sm:w-8 max-sm:h-8 ${
                isShipPosition(rowIndex, colIndex) === 5
                  ? "bg-warning rounded-[7px]"
                  : isShipPosition(rowIndex, colIndex) === 4
                  ? "bg-success rounded-[7px]"
                  : isShipPosition(rowIndex, colIndex) === 3
                  ? "bg-secondary rounded-[7px]"
                  : isShipPosition(rowIndex, colIndex) === 2
                  ? "bg-primary rounded-[7px]"
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
                        src="/img/Vhdl.gif"
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
