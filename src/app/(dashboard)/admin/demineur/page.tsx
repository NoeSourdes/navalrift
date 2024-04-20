"use client";

import { Button } from "@nextui-org/react";

export default function page() {
  return (
    <div className="h-full w-full flex flex-col lg:gap-6 gap-3">
      <div className="relative h-full w-full bg-blue-800/75 rounded-xl flex max-md:flex-col items-center lg:justify-center lg:gap-6 gap-3 lg:p-6 p-3 overflow-y-scroll">
        <Button
          variant="faded"
          color="primary"
          className="absolute md:top-10 top-5 left-10 z-30"
          onClick={() => {
            window.history.back();
          }}
        >
          Retour
        </Button>{" "}
        <div className="h-full w-full bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex justify-center lg:pt-10 rounded-lg overflow-hidden p-2 overflow-x-hidden">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
          <div className="relative">
            <h1>Démineur</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
