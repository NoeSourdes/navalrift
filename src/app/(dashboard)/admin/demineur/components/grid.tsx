import Image from "next/image";
import { useEffect, useState } from "react";

interface gridProps {
  clickCell: string[];
  setClickCell: React.Dispatch<React.SetStateAction<string[]>>;
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  revealCell: (x: number, y: number) => void;
  revealedCells: string[];
  caseFlag: string[];
  setCaseFlag: React.Dispatch<React.SetStateAction<string[]>>;
  selectTools: string;
}

export default function Grid({
  clickCell,
  setClickCell,
  board,
  setBoard,
  revealCell,
  revealedCells,
  caseFlag,
  setCaseFlag,
  selectTools,
}: gridProps) {
  const x = 10;
  const y = 10;

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

  const generateGrid = () => {
    let grid = Array.from({ length: x }, () =>
      Array.from({ length: y }, () => "0")
    );

    bombs.forEach((bomb) => {
      grid[bomb.x][bomb.y] = "B";
      for (
        let i = Math.max(bomb.x - 1, 0);
        i <= Math.min(bomb.x + 1, x - 1);
        i++
      ) {
        for (
          let j = Math.max(bomb.y - 1, 0);
          j <= Math.min(bomb.y + 1, y - 1);
          j++
        ) {
          if (grid[i][j] !== "B") {
            grid[i][j] = String(Number(grid[i][j]) + 1);
          }
        }
      }
    });

    return grid;
  };

  const [grid, setGrid] = useState(generateGrid());

  useEffect(() => {
    setBoard(grid);
  }, [grid]);

  useEffect(() => {
    setGrid(generateGrid());
  }, [bombs]);

  return (
    <div className="h-[400px] max-sm:w-80 max-sm:h-[350px] w-[400px] grid grid-cols-10 relative">
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            onClick={() => {
              if (selectTools === "flag") {
                if (caseFlag.length === 10) {
                  alert("Vous avez déjà placé 10 drapeaux");
                  return;
                }
                if (caseFlag.includes(`${i},${j}`)) {
                  alert("Vous avez déjà placé un drapeau ici");
                }
                setCaseFlag([...caseFlag, `${i},${j}`]);
              } else {
                if (!clickCell.includes(`${i},${j}`)) {
                  if (cell === "B") {
                    console.log("Perdu");
                  }
                  revealCell(i, j);
                  setClickCell([...clickCell, `${i},${j}`]);
                } else console.log("Déjà cliqué");
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              if (selectTools === "flag") {
                setCaseFlag(caseFlag.filter((flag) => flag !== `${i},${j}`));
              }
            }}
            key={`${i}-${j}`}
            className={`sm:h-10 sm:w-10 w-[32px] h-[35px] flex justify-center items-center rounded hover:bg-primary/50 transition-all cursor-pointer relative`}
          >
            {caseFlag.includes(`${i},${j}`) ? (
              <Image
                src="/img/flag.png"
                width={30}
                height={30}
                alt="flag"
                className="absolute"
              />
            ) : (
              <span className="absolute w-2 h-2 rounded-full bg-[#3F3F46]"></span>
            )}
            <span
              className={`absolute w-full h-full flex justify-center items-center ${
                (i + j) % 2 === 0 ? "bg-[#053B48]" : "bg-[#09AACD]"
              } ${revealedCells.includes(`${i},${j}`) ? "" : "hidden"}`}
            >
              <span
                className={`font-bold ${
                  cell === "1"
                    ? "text-primary"
                    : cell === "2"
                    ? "text-success"
                    : cell === "3"
                    ? "text-error"
                    : cell === "4"
                    ? "text-warning"
                    : cell === "5"
                    ? "text-info"
                    : cell === "6"
                    ? "text-primary"
                    : cell === "7"
                    ? "text-success"
                    : cell === "8"
                    ? "text-error"
                    : ""
                }`}
              >
                {cell === "B" ? (
                  <Image
                    src="/img/bomb.png"
                    width={30}
                    height={30}
                    alt="bomb"
                  />
                ) : cell === "0" ? (
                  ""
                ) : (
                  cell
                )}
              </span>
            </span>
          </div>
        ))
      )}
    </div>
  );
}
