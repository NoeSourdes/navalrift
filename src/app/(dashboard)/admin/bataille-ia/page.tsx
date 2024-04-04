"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { generateShips } from "../function/CreateGrid";
import { ChooseShip } from "./pages/ChooseShip";
import { Combat } from "./pages/Combat";
import { useAppContext } from "@/context";

export default function BatailleIa() {
  const { setVolume } = useAppContext();
  const [shipHistory, setShipHistory] = useState([generateShips()]);
  const [shipPlayer, setShipPlayer] = useState(() => {
    const savedShip = localStorage.getItem("shipPlayer");
    return savedShip !== null ? JSON.parse(savedShip) : [];
  });
  const [shipAi, setShipAi] = useState(() => {
    const savedShip = localStorage.getItem("shipAi");
    return savedShip !== null ? JSON.parse(savedShip) : [];
  });
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("step");
    return savedStep !== null ? Number(savedStep) : 0;
  });
  const [howStart, setHowStart] = useState(
    localStorage.getItem("howStart") || "aleatoire"
  );
  const [timeLapse, setTimeLapse] = useState(
    Number(localStorage.getItem("timeLapse")) || 40
  );
  const [timePlayer, setTimePlayer] = useState(
    Number(localStorage.getItem("timePlayer")) || 180
  );
  const [numbershipTouchPlayer, setNumberShipTouchPlayer] = useState<number>(
    Number(localStorage.getItem("touchShipPlayer")) || 0
  );

  const [numbershipTouchAi, setNumberShipTouchAi] = useState<number>(
    Number(localStorage.getItem("touchShipAi")) || 0
  );

  const [touchShipPlayer, setTouchShipPlayer] = useState<
    Record<string, boolean>
  >(JSON.parse(localStorage.getItem("touchShipPlayer") || "{}"));
  const [touchShipAi, setTouchShipAi] = useState<Record<string, boolean>>(
    JSON.parse(localStorage.getItem("touchShipAi") || "{}")
  );
  const [winner, setWinner] = useState("");

  useEffect(() => {
    localStorage.setItem("step", step.toString());
    localStorage.setItem("shipPlayer", JSON.stringify(shipPlayer));
    localStorage.setItem("shipAi", JSON.stringify(shipAi));
    localStorage.setItem("touchShipPlayer", numbershipTouchPlayer.toString());
    localStorage.setItem("touchShipAi", numbershipTouchAi.toString());
    localStorage.setItem(
      "numberShipTouchPlayer",
      numbershipTouchPlayer.toString()
    );
    localStorage.setItem("numberShipTouchAi", numbershipTouchAi.toString());
    localStorage.setItem("touchShipPlayer", JSON.stringify(touchShipPlayer));
    localStorage.setItem("touchShipAi", JSON.stringify(touchShipAi));
  }, [
    step,
    shipAi,
    shipPlayer,
    numbershipTouchPlayer,
    numbershipTouchAi,
    touchShipAi,
    touchShipPlayer,
  ]);

  useEffect(() => {
    localStorage.setItem("timeLapse", timeLapse.toString());
  }, [timeLapse]);

  useEffect(() => {
    localStorage.setItem("timePlayer", timePlayer.toString());
  }, [timePlayer]);

  useEffect(() => {
    localStorage.setItem("howStart", howStart);
  }, [howStart]);

  useEffect(() => {
    if (numbershipTouchPlayer === shipPlayer.length) {
      setWinner("player");
    }
  }, [numbershipTouchPlayer, shipPlayer]);

  useEffect(() => {
    if (numbershipTouchAi === shipAi.length) {
      setWinner("ai");
    }
  }, [numbershipTouchAi, shipAi]);

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
            shipAi={shipAiGenerate}
            setShipPlayer={setShipPlayer}
            setShipAi={setShipAi}
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
            onPress={onOpen}
          >
            Abandonner
          </Button>
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                },
              },
            }}
          >
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Abandonner la partie</h1>
                  </ModalHeader>
                  <ModalBody>
                    <p>Êtes-vous sûr de vouloir abandonner la partie ?</p>
                    <p>Vous allez perdre la partie en cours.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Annuler
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        setStep(0);
                        onClose();
                        localStorage.removeItem("howStart");
                        localStorage.removeItem("timeLapse");
                        localStorage.removeItem("timePlayer");
                        localStorage.removeItem("touchShipPlayer");
                        localStorage.removeItem("touchShipAi");
                        localStorage.removeItem("shipAi");
                        localStorage.removeItem("shipPlayer");
                        localStorage.removeItem("numberShipTouchPlayer");
                        localStorage.removeItem("numberShipTouchAi");
                        setHowStart("aleatoire");
                        setTimeLapse(40);
                        setTimePlayer(180);
                        setNumberShipTouchPlayer(0);
                        setNumberShipTouchAi(0);
                        setTouchShipPlayer({});
                        setTouchShipAi({});
                        setVolume(0.5);
                      }}
                    >
                      Abandonner
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Combat
            setHowStart={setHowStart}
            setTimeLapse={setTimeLapse}
            setTimePlayer={setTimePlayer}
            setWinner={setWinner}
            winner={winner}
            touchShipPlayer={touchShipPlayer}
            setTouchShipPlayer={setTouchShipPlayer}
            touchShipAi={touchShipAi}
            setTouchShipAi={setTouchShipAi}
            numberShipTouchAi={numbershipTouchAi}
            numberShipTouchPlayer={numbershipTouchPlayer}
            setNumberShipTouchPlayer={setNumberShipTouchPlayer}
            setNumberShipTouchAi={setNumberShipTouchAi}
            timeLapse={timeLapse}
            timePlayer={timePlayer}
            howStart={howStart}
            shipAi={shipAi}
            shipPlayer={shipPlayer}
            setStep={setStep}
          />
        </div>
      );
  }
}
