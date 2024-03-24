"use client";

import { useState } from "react";

export const GridAi = () => {
  const rows = new Array(10).fill(null);
  const cols = new Array(10).fill(null);
  const initialHoverState = Array.from({ length: 10 }, () =>
    Array(10).fill(false)
  );
  const [hover, setHover] = useState<boolean[][]>(initialHoverState);

  return (
    <div>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {cols.map((_, colIndex) => (
            <div
              onMouseEnter={() => {
                const newHover = [...hover];
                newHover[rowIndex][colIndex] = true;
                setHover(newHover);
              }}
              onMouseLeave={() => {
                const newHover = [...hover];
                newHover[rowIndex][colIndex] = false;
                setHover(newHover);
              }}
              key={colIndex}
              className={`w-[38.4px] h-[38.4px] flex items-center justify-center max-sm:w-8 max-sm:h-8 bg-blue-800/75 p-1 ${
                hover[rowIndex][colIndex] ? "hovered" : ""
              }`}
            >
              {hover[rowIndex][colIndex] ? (
                <span className="relative w-full h-full bg-white flex items-center rounded-full justify-center">
                  <span className="w-6 h-6 rounded-full bg-blue-800 cursor-pointer flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </span>
                  <span className="absolute w-3 h-1 bg-white rounded-xl top-[13.5px] -left-1"></span>
                  <span className="absolute w-3 h-1 bg-white rounded-xl top-[13.5px] -right-1"></span>
                  <span className="absolute w-1 h-3 bg-white rounded-xl -top-1 right-[13.5px]"></span>
                  <span className="absolute w-1 h-3 bg-white rounded-xl -bottom-1 right-[13.5px]"></span>
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-border cursor-pointer"></span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
