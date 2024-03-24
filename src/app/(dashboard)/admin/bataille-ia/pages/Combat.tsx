"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Grid } from "../../components/bataille/Grid";
import { GridAi } from "../../components/bataille/GridAi";

interface CombatProps {
  setStep: (step: number) => void;
  setLapTime: (time: number) => void;
  setPlayerTime: (time: number) => void;
  setHowStart: (start: string) => void;
  shipHistory: any[];
  currentShipIndex: number;
  shipAiGenerated: any[];
}

export const Combat = ({
  setStep,
  setLapTime,
  setPlayerTime,
  setHowStart,
  shipHistory,
  currentShipIndex,
  shipAiGenerated,
}: CombatProps) => {
  const { data: session } = useSession();
  return (
    <div className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex justify-center rounded-lg overflow-hidden p-2 max-md:pt-16">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative flex flex-col items-center gap-8 z-20 overflow-y-auto py-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold max-md:text-3xl">
            Bataile contre <span className="text-primary">l&apos;IA</span>
          </h1>
        </div>
        <div className="w-96 h-24 rounded-xl bg-blue-800/75 flex items-center justify-between">
          <div className="grow flex items-center justify-center">
            {" "}
            <Image
              src={session?.user?.image ? session?.user?.image : ""}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="h-[80%] w-2 rounded-xl bg-border"></div>
          <div className="grow flex items-center justify-center">
            <Image
              src="/img/ai-avatar.jpg"
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-10 ">
          <div className="flex flex-col gap-3">
            <div className="w-96 h-10 rounded-xl bg-blue-800/75 flex items-center justify-center">
              <span className="font-bold text-xl">Vos navires</span>
            </div>
            <div className="w-96 h-96 border-border bg-blue-800/75 rounded-xl overflow-hidden max-sm:w-80 max-sm:h-80">
              <Grid ship={shipHistory[currentShipIndex]} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-96 h-10 rounded-xl bg-blue-800/75 flex items-center justify-center">
              <span className="font-bold text-xl">
                Attaquer votre adversaire
              </span>
            </div>
            <div className="w-96 h-96 border-border bg-blue-800/75 rounded-xl overflow-hidden max-sm:w-80 max-sm:h-80">
              <GridAi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
