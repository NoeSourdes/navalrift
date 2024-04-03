import { useAppContext } from "@/context";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { RotateCcw, RotateCw } from "lucide-react";
import { useState } from "react";
import { Grid } from "../../components/bataille/Grid";

interface ChooseShipProps {
  shipHistory: any[];
  currentShipIndex: number;
  goBack: () => void;
  goForward: () => void;
  regenerateGrid: () => void;
  setStep: (step: number) => void;
  setLapTime: (time: number) => void;
  setPlayerTime: (time: number) => void;
  setHowStart: (start: string) => void;
  setShipPlayer: (ship: any) => void;
  setShipAi: (ship: any) => void;
  shipAi: any;
}

export const ChooseShip = ({
  shipHistory,
  currentShipIndex,
  goBack,
  goForward,
  regenerateGrid,
  setStep,
  setLapTime,
  setPlayerTime,
  setHowStart,
  setShipPlayer,
  setShipAi,
  shipAi,
}: ChooseShipProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setIsPlayingMusic, setIsPlayingMusicBattle } = useAppContext();
  const TimeForLap = [
    { label: "10 secondes", value: "10" },
    { label: "15 secondes", value: "15" },
    { label: "30 secondes", value: "30" },
    { label: "40 secondes", value: "40" },
  ];
  const TimeForPlayer = [
    { label: "1 minutes", value: "60" },
    { label: "2 minutes", value: "120" },
    { label: "3 minutes", value: "180" },
    { label: "5 minutes", value: "300" },
  ];
  const WhoStart = [
    { label: "Aléatoire", value: "aleatoire" },
    { label: "Moi", value: "player" },
    { label: "IA", value: "ai" },
  ];

  const [touchAi, setTouchAi] = useState<Record<string, boolean>>({});
  const [numberShipTouchAi, setNumberShipTouchAi] = useState<number>(0);
  const [coordShipAroundAi, setCoordShipAroundAi] = useState<
    [number, number][]
  >([]);

  return (
    <>
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
              <Grid
                setCoordShipAround={setCoordShipAroundAi}
                ship={shipHistory[currentShipIndex]}
                touchedShip={touchAi}
                setNumberShipTouch={setNumberShipTouchAi}
              />
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
              <Button color="primary" size="lg" onPress={onOpen}>
                Affronter l&apos;IA
              </Button>
            </div>
          </div>
        </div>
      </div>
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
                <h2 className="text-2xl font-bold">
                  Préparez-vous pour la bataille
                </h2>
                <p className="text-sm text-[#666]">
                  Vous êtes prêt à affronter l&apos;IA. Bonne chance !
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-5">
                  <Select
                    items={TimeForLap}
                    label="Temps par tour"
                    defaultSelectedKeys={["40"]}
                    placeholder="Sélectionnez le temps par tour"
                    onChange={(value: any) =>
                      setLapTime(parseInt(value.target.value))
                    }
                  >
                    {(timeLap: any) => (
                      <SelectItem key={timeLap.value}>
                        {timeLap.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    items={TimeForPlayer}
                    label="Temps par joueur"
                    defaultSelectedKeys={["180"]}
                    placeholder="Sélectionnez le temps par joueur"
                    onChange={(value: any) =>
                      setPlayerTime(parseInt(value.target.value))
                    }
                  >
                    {(timePlayer: any) => (
                      <SelectItem key={timePlayer.value}>
                        {timePlayer.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    items={WhoStart}
                    label="Qui commence ?"
                    defaultSelectedKeys={["aleatoire"]}
                    placeholder="Sélectionnez qui commence"
                    onChange={(value: any) => setHowStart(value.target.value)}
                  >
                    {(whoStart: any) => (
                      <SelectItem key={whoStart.value}>
                        {whoStart.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setShipPlayer(shipHistory[currentShipIndex]);
                    setShipAi(shipAi);
                    setStep(1);
                    setIsPlayingMusic(false);
                    setIsPlayingMusicBattle(true);
                    onClose();
                  }}
                >
                  Jouer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
