"use client";

import { Cobe } from "@/app/library/createGlobe";
import { SpotlightCard } from "../../../app/components/ui/SpotlightCard";

import { Chip } from "@nextui-org/react";
import createGlobe from "cobe";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
export const Features = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;

    if (canvasRef.current !== null) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 600 * 2,
        height: 600 * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.006], size: 0.1 },
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        },
      });

      return () => {
        globe.destroy();
      };
    }
  }, []);

  const [play] = useSound("/sound/boom.mp3", { volume: 0.5 });

  const [vibrate, setVibrate] = useState(false);
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    setVibrate(true);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }
    setTimeout(() => setVibrate(false), 1000);
  };

  const handleClickAnimation = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000);
  };

  return (
    <div className="relative mt-20">
      <div className="absolute -rotate-12 w-full max-sm:max-w-[200px] max-w-[400px] h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 z-10 blur-[300px] max-sm:blur-[200px]"></div>
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
                intensifiez l&apos;expérience avec des sons, des vibrations et
                des animations captivantes pour une immersion totale.
              </h5>
            </div>
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center max-lg:flex-col gap-5">
                  <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative mx-auto w-full h-[460px] max-w-2xl rounded-[--radius] bg-white/10 p-0.5 [--radius:theme(borderRadius.2xl)]"
                  >
                    <div className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                      <div className="relative w-full h-[320px] max-h-[320px]  overflow-hidden">
                        <Cobe />
                      </div>

                      <h3 className="text-xl font-bold mb-4">
                        Mode multijoueur
                      </h3>
                      <p className="text-gray-500">
                        Jouez en ligne avec vos amis ou des joueurs du monde
                        entier.
                      </p>
                    </div>
                  </SpotlightCard>
                  <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative mx-auto w-full h-[460px] max-w-2xl rounded-[--radius] bg-white/10 p-0.5 [--radius:theme(borderRadius.2xl)]"
                  >
                    <div className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden flex flex-col justify-between">
                      <div className="relative w-full min-h-80">
                        <Image
                          src="/svg/computer.svg"
                          layout="fill"
                          alt="computer"
                          objectFit="contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-4">Mode solo</h3>
                        <p className="text-gray-500">
                          Jouez contre l&apos;ordinateur et améliorez vos
                          compétences.
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                  <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative mx-auto h-[460px] w-full max-w-2xl rounded-[--radius] bg-white/10 p-0.5 [--radius:theme(borderRadius.2xl)]"
                  >
                    <div className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden flex flex-col justify-between">
                      <div className="relative w-full min-h-80">
                        <Image
                          src="/svg/grille.svg"
                          layout="fill"
                          alt="grille"
                          objectFit="contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">
                          Grille moderne
                        </h3>
                        <p className="text-gray-500">
                          Profitez d&apos;une grille moderne et d&apos;une
                          interface utilisateur intuitive.
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
                <div className="flex items-center max-lg:flex-col gap-5">
                  <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative mx-auto  w-full max-w-2xl rounded-[--radius] bg-white/10 p-0.5 [--radius:theme(borderRadius.2xl)]"
                  >
                    <div
                      onClick={play}
                      className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden cursor-pointer"
                    >
                      <h3 className="text-xl font-bold mb-4">Effets sonores</h3>
                      <p className="text-gray-500">
                        Intensifiez l&apos;expérience avec des sons captivants.
                      </p>
                    </div>
                  </SpotlightCard>
                  <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative mx-auto w-full max-w-2xl rounded-[--radius] bg-white/10 p-0.5 [--radius:theme(borderRadius.2xl)]"
                  >
                    <div
                      className={`relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden cursor-pointer ${
                        vibrate ? "vibrate" : ""
                      }`}
                      onClick={handleClick}
                    >
                      <h3 className="text-xl font-bold mb-4">Vibrations</h3>
                      <p className="text-gray-500">
                        Ressentez chaque mouvement avec des vibrations
                        réalistes.
                      </p>
                    </div>
                  </SpotlightCard>
                  <SpotlightCard
                    from="#1cd1c6"
                    via="#407cff"
                    size={300}
                    className="relative mx-auto w-full max-w-2xl rounded-[--radius] bg-white/10 p-0.5 [--radius:theme(borderRadius.2xl)]"
                  >
                    <div
                      className={`relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden cursor-pointer ${
                        rotate ? "rotate" : ""
                      }`}
                      onClick={handleClickAnimation}
                    >
                      <h3 className="text-xl font-bold mb-4">Animations</h3>
                      <p className="text-gray-500">
                        Intensifiez l&apos;expérience avec des animations
                        captivantes.
                      </p>
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
