import { Button, Chip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";

export const Price = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Chip color="primary" variant="dot" className="mb-3">
        Tarifs
      </Chip>

      <div className="flex flex-col justify-center items-center space-y-10">
        <div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-6xl m-auto">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
              Tarification
            </span>{" "}
            simple et transparente
          </h2>
        </div>
        <div>
          <h5 className="text-center text-xl m-auto max-w-2xl text-gray-500">
            Explorez notre unique plan tarifaire exclusif dans l&apos;univers
            captivant de NavalRift.
          </h5>
        </div>
        <div className="relative bg-background border border-primary rounded-xl w-full max-w-sm">
          <div className="absolute -rotate-12 w-full max-sm:max-w-[200px] max-w-[400px] h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-800 z-10 blur-[300px] max-sm:blur-[200px]"></div>
          <div className="relative space-y-5 bg-background p-7 z-20 rounded-xl">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">NavalRift</h1>
              <p className="text-gray-400">
                Pour les fans de bataille navale en quête de stratégie ultime.
              </p>
            </div>
            <div className="flex items-end">
              <h4 className="text-4xl font-bold">5€</h4>
              <span className="text-gray-400 text-sm">/offre à vie</span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-400 flex items-center gap-5">
                <span className="text-success text-xl">
                  <FaCheck />
                </span>
                Mode multijoueur
              </p>
              <p className="text-gray-400 flex items-center gap-5">
                <span className="text-success text-xl">
                  <FaCheck />
                </span>
                Mode solo
              </p>
              <p className="text-gray-400 flex items-center gap-5">
                <span className="text-success text-xl">
                  <FaCheck />
                </span>
                Grille moderne
              </p>
              <p className="text-gray-400 flex items-center gap-5">
                <span className="text-success text-xl">
                  <FaCheck />
                </span>
                Sons, vibrations et animations
              </p>
            </div>
            <div>
              <Button className="w-full bg-primary text-white py-3 rounded-lg">
                Acheter maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
