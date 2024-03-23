import React, { ReactElement, useState } from "react";

const Grid: React.FC = (): ReactElement => {
  const rows = 10;
  const cols = 10;
  const hauteur_cellule = 1;
  const largeur_cellule = 4;

  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const createGrid = (): ReactElement[] => {
    let grid: ReactElement[] = [];
    for (let i = 0; i < rows; i++) {
      let colsArray: ReactElement[] = [];
      for (let j = 0; j < cols; j++) {
        const isHovered =
          hoveredCell !== null &&
          j >= hoveredCell.col &&
          j < hoveredCell.col + hauteur_cellule &&
          i >= hoveredCell.row &&
          i < hoveredCell.row + largeur_cellule;
        const isEndHoveredHeight =
          isHovered && hoveredCell.col > cols - hauteur_cellule;

        const isEndHoveredWidth =
          isHovered && hoveredCell.row > rows - largeur_cellule;

        colsArray.push(
          <div
            className={`grid-cell flex justify-center items-center transition-all ${
              isEndHoveredWidth || isEndHoveredHeight
                ? "bg-error"
                : isHovered
                ? "bg-success"
                : ""
            }`}
            key={`col-${j}`}
            style={{
              width: "2.40rem",
              height: "2.40rem",
            }}
            onMouseEnter={() => setHoveredCell({ row: i, col: j })}
            onMouseLeave={() => setHoveredCell(null)}
          >
            <span className="w-2 h-2 rounded-full bg-border"></span>
          </div>
        );
      }
      grid.push(
        <div className="grid-row" key={`row-${i}`}>
          {colsArray}
        </div>
      );
    }
    return grid;
  };

  return <div className="grid">{createGrid()}</div>;
};

export default Grid;
