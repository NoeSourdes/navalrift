import { Chip } from "@nextui-org/react";

export function Features() {
  return (
    <div className="w-full">
      <div className="relative z-20 flex flex-col items-center">
        <Chip color="primary" variant="dot" className="mb-3">
          Fonctionnalités
        </Chip>
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-center max-w-6xl m-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
                Explorez nos fonctionnalités
              </span>{" "}
              étonnantes
            </h2>
          </div>
          <div>
            <h5 className="text-center m-auto max-w-2x animate-fade-in text-balance text-lg tracking-tight text-gray-400 md:text-x">
              Plongez dans des parties en ligne avec vos amis ou défiez
              l&apos;ordinateur, profitez d&apos;une grille moderne, et
              intensifiez l&apos;expérience avec des sons, des vibrations et des
              animations captivantes pour une immersion totale.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
