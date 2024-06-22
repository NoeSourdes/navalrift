import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { AnimatedShinyTextDemo } from "../components/AnimatedShinyText";
import { Spotlight } from "../components/Spotlight";
import GridPattern from "../components/grid-pattern";

export const CallToAction = () => {
  return (
    <div className="relative w-full flex justify-center items-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg  pt-20 ">
        <div className=" space-y-10 z-20">
          <div>
            <AnimatedShinyTextDemo />
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl leading-none font-medium text-center max-w-5xl m-auto">
              La plateforme de commandement ultime pour{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700">
                les amiraux modernes
              </span>
            </h2>
          </div>
          <div>
            <h5 className="text-center m-auto max-w-2x animate-fade-in text-balance text-lg tracking-tight text-gray-400 md:text-xl">
              Perfectionnez votre tactique navale avec notre plateforme
              tout-en-un dédiée aux passionnés de bataille navale. Plongez dans
              l&apos;action dès maintenant!
            </h5>
          </div>
          <div className="w-full flex justify-center items-center">
            <Link href="/sign-in">
              <Button size="lg" className=" bg-primary text-white shadow-lg">
                Rejoindre NavalRift
              </Button>
            </Link>
          </div>
        </div>
        <GridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[175%] skew-y-12"
          )}
        />
      </div>
    </div>
  );
};
