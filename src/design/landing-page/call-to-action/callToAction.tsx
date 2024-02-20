import { Button } from "@nextui-org/react";
import Image from "next/image";

export const CallToAction = () => {
  return (
    <div className="relative mt-20">
      <Image
        src="/svg/test.svg"
        alt="tes"
        width={1024}
        height={600}
        className="absolute -rotate-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      ></Image>{" "}
      <div className="relative space-y-10 z-20">
        <div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-6xl m-auto">
            La plateforme de commandement ultime pour{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
              les amiraux modernes
            </span>
          </h2>
        </div>
        <div>
          <h5 className="text-center text-xl m-auto max-w-2xl text-gray-500">
            Perfectionnez votre tactique navale avec notre plateforme tout-en-un
            dédiée aux passionnés de bataille navale. Plongez dans l&apos;action
            dès maintenant!
          </h5>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-tr from-blue-500 to-blue-800 text-white shadow-lg"
          >
            Commencer maintenant
          </Button>
        </div>
      </div>
    </div>
  );
};
