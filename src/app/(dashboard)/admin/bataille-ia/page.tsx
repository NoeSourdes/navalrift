"use client";

import { Button } from "@nextui-org/react";
import { RotateCcw, RotateCw } from "lucide-react";
import { useState } from "react";
import { Grid } from "../components/bataille/Grid";
const generateShips = () => {
  const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const ships = [];
  const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));

  for (let size of shipSizes) {
    let direction, x, y;

    while (true) {
      direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);

      let isOverlap = false;

      for (let i = -1; i <= size; i++) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            if (direction === "horizontal") {
              if (
                y + i + j < 0 ||
                y + i + j >= 10 ||
                x + k < 0 ||
                x + k >= 10
              ) {
                continue;
              }
              if (grid[x + k][y + i + j] === 1) {
                isOverlap = true;
                break;
              }
            } else {
              if (
                x + i + k < 0 ||
                x + i + k >= 10 ||
                y + j < 0 ||
                y + j >= 10
              ) {
                continue;
              }
              if (grid[x + i + k][y + j] === 1) {
                isOverlap = true;
                break;
              }
            }
          }
          if (isOverlap) {
            break;
          }
        }
        if (isOverlap) {
          break;
        }
      }

      if (!isOverlap) {
        break;
      }
    }

    for (let i = 0; i < size; i++) {
      if (direction === "horizontal") {
        if (y + i < 10) {
          grid[x][y + i] = 1;
        }
      } else {
        if (x + i < 10) {
          grid[x + i][y] = 1;
        }
      }
    }

    ships.push({
      size,
      direction,
      position: [x, y],
    });
  }

  return ships;
};

export default function BatailleIa() {
  const [shipHistory, setShipHistory] = useState([generateShips()]);
  const [currentShipIndex, setCurrentShipIndex] = useState(0);

  const goBack = () => {
    if (currentShipIndex > 0) {
      setCurrentShipIndex(currentShipIndex - 1);
    }
  };

  const goForward = () => {
    if (currentShipIndex < shipHistory.length - 1) {
      setCurrentShipIndex(currentShipIndex + 1);
    }
  };

  const regenerateGrid = () => {
    const newShips = generateShips();
    setShipHistory([...shipHistory.slice(0, currentShipIndex + 1), newShips]);
    setCurrentShipIndex(currentShipIndex + 1);
  };
  return (
    <div className="relative w-full h-full bg-blue-800/75 rounded-xl lg:p-6 p-3">
      <Button
        variant="faded"
        color="primary"
        className="absolute top-10 left-10 z-30"
        onClick={() => {
          window.history.back();
        }}
      >
        Retour
      </Button>
      <div className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex justify-center md:items-center rounded-lg overflow-hidden p-2 max-md:pt-16">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative flex flex-col gap-8 z-20 overflow-y-auto py-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold max-md:text-3xl">
              Bataile contre <span className="text-primary">l&apos;IA</span>
            </h1>
            <h3 className="text-2xl font-bold max-md:text-xl">
              Les <span className="text-primary">bateaux</span> sont placés
              automatiquement. Regénérez la grille si nécessaire.
            </h3>
          </div>
          <div className="flex items-center gap-6 flex-col">
            <div className="w-96 h-96 border-border bg-blue-800/75 rounded-xl overflow-hidden max-sm:w-80 max-sm:h-80">
              <Grid ship={shipHistory[currentShipIndex]} />
            </div>
            <div className="flex flex-col space-y-8">
              <div className="flex gap-5">
                <Button
                  isIconOnly
                  color="primary"
                  variant="faded"
                  onClick={goBack}
                >
                  <RotateCcw />
                </Button>
                <Button
                  color="primary"
                  variant="faded"
                  onClick={regenerateGrid}
                >
                  Regénérer la grille
                </Button>
                <Button
                  isIconOnly
                  color="primary"
                  variant="faded"
                  onClick={goForward}
                >
                  <RotateCw />
                </Button>
              </div>
              <Button color="primary" size="lg">
                Affronter l&apos;IA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
