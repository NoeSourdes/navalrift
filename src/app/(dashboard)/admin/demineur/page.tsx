"use client";

import { Button } from "@nextui-org/react";
import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import Grid from "./components/grid";

export default function Page() {
  const [isIconOnly, setIsIconOnly] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsIconOnly(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="h-full w-full flex flex-col lg:gap-6 gap-3">
      <Button
        variant="faded"
        isIconOnly={isIconOnly}
        color="primary"
        className="absolute md:top-10 top-8 sm:left-10 left-5 z-40"
        onClick={() => {
          window.history.back();
        }}
      >
        <span className="max-sm:hidden">Retour</span>
        <span className="sm:hidden">
          <Undo2 />
        </span>
      </Button>
      <div className="relative h-full w-full bg-blue-800/75 rounded-xl flex max-md:flex-col items-center lg:justify-center lg:gap-6 gap-3 lg:p-6 p-3 overflow-hidden">
        <div className="h-full w-full bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col rounded-lg overflow-hidden">
          <div className="absolute pointer-events-none -inset-16 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
          <div className="h-full w-full">
            <div className="relative h-full w-full">
              <div className="absolute h-full w-full flex justify-center items-center backdrop-blur-sm rounded-xl z-30">
                <div className="w-96 max-sm:w-80 max-sm:h-52 h-60 bg-[#27272A] rounded-xl p-5 flex flex-col justify-center items-center space-y-5 border-2 border-[#3F3F46]">
                  <h1 className="text-center text-2xl font-bold">
                    Commencer une partie de démineur
                  </h1>
                  <Button color="primary" className="w-full">
                    Commencer
                  </Button>
                </div>
              </div>
              <div className="relative h-full w-full flex flex-col space-y-5 max-sm:space-y-3 justify-center items-center z-20">
                <div className="w-[500px] max-sm:w-80 max-sm:h-16 h-32 rounded-xl bg-blue-800/75"></div>
                <div className="h-[400px] max-sm:w-80 max-sm:h-[350px] w-[400px] rounded-xl overflow-hidden bg-blue-800/75">
                  <Grid />
                </div>
                <div className="w-[500px] max-sm:w-80 max-sm:h-16 h-32 rounded-xl bg-blue-800/75"></div>
              </div>
            </div>
            <div className="w-full flex justify-center hidden">
              <Button
                variant="faded"
                color="primary"
                className="sm:absolute sm:top-5 sm:left-5 max-sm:mb-5 z-40"
                onClick={() => {
                  window.history.back();
                }}
              >
                Abandonner
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
