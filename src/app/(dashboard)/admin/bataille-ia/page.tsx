"use client";

import { Button } from "@nextui-org/react";
import { Grid } from "../components/bataille/DropZone";

export default function BatailleIa() {
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
      <div className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-y-auto p-2 max-md:pt-28">
        <div className="absolute pointer-events-none inset-0 -bottom-10 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative flex flex-col items-center justify-center gap-10 z-20">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold max-md:text-3xl">
              Bataile contre <span className="text-primary">l&apos;IA</span>
            </h1>
            <h3 className="text-2xl font-bold max-md:text-xl">
              Choisissez comment vous voulez placez vos{" "}
              <span className="text-primary">bateaux</span> dans la grille
            </h3>
          </div>
          <div className="flex items-center gap-5 flex-col">
            <div className="w-96 h-96 border-border bg-blue-800/75 rounded-xl overflow-hidden">
              <Grid />
            </div>
            <Button color="primary" variant="faded">
              Regénérer la grille
            </Button>
          </div>
          <Button color="primary" size="lg">
            Affronter l&apos;IA
          </Button>
        </div>
      </div>
    </div>
  );
}