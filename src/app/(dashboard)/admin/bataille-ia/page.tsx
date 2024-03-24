"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { ChooseShip } from "./pages/ChooseShip";
import { Combat } from "./pages/Combat";
const generateShips = () => {
  const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const ships = [];
  const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));

  for (let size of shipSizes) {
    let direction, x, y;

    while (true) {
      direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      x = Math.floor(
        Math.random() * (direction === "horizontal" ? 10 : 10 - size + 1)
      );
      y = Math.floor(
        Math.random() * (direction === "vertical" ? 10 : 10 - size + 1)
      );

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
  const [step, setStep] = useState(0);
  const shipAiGenerate = generateShips();

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
  const [timeLapse, setTimeLapse] = useState(40);
  const [timePlayer, setTimePlayer] = useState(3);
  const [howStart, setHowStart] = useState("aleatoire");
  switch (step) {
    case 0:
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
          <ChooseShip
            setHowStart={setHowStart}
            setPlayerTime={setTimePlayer}
            setLapTime={setTimeLapse}
            setStep={setStep}
            shipHistory={shipHistory}
            currentShipIndex={currentShipIndex}
            goBack={goBack}
            goForward={goForward}
            regenerateGrid={regenerateGrid}
          />
        </div>
      );
    case 1:
      return (
        <div className="relative w-full h-full bg-blue-800/75 rounded-xl lg:p-6 p-3">
          <Button
            variant="faded"
            color="primary"
            className="absolute top-10 left-10 z-30"
            onClick={() => {
              setStep(0);
            }}
          >
            Abandonner
          </Button>
          <Combat
            setHowStart={setHowStart}
            setPlayerTime={setTimePlayer}
            setLapTime={setTimeLapse}
            setStep={setStep}
            shipHistory={shipHistory}
            currentShipIndex={currentShipIndex}
            shipAiGenerated={shipAiGenerate}
          />
        </div>
      );
  }
}
