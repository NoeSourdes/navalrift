import { useEffect, useState } from "react";

export default function Grid() {
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
    setGrid(generateGrid());
  }, [bombs]);

  return (
    <div className="grid grid-cols-10 grid-rows-10">
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-10 h-10 flex justify-center items-center rounded hover:bg-primary/50 transition-all cursor-pointer`}
          >
            <span className="w-2 h-2 rounded-full bg-[#3F3F46]"></span>
          </div>
        ))
      )}
    </div>
  );
}
